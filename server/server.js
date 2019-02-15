const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const users = require('./routes/users')
const todos = require('./controllers/todos')
const mongoose = require('./config/database')

const PORT = process.env.PORT || 3001

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
app.set('secretKey', 'todoapp')
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/users', users)

io.use((socket, next) => {
  jwt.verify(socket.handshake.query.token, app.get('secretKey'), (err, decoded) => {
    if (err) {
      next(new Error('Authentication error'))
    } else {
      socket.handshake.query.userId = decoded.id // prolly not the best way
      next()
    }
  })
})

io.on('connection', (client) => {
  client.on('get cards', () => {
    todos.getCards(client.handshake.query.userId).then((user) => {
      client.emit('cards', user.cards || [])
    })
  })

  client.on('post card', (card) => {
    card.userId = client.handshake.query.userId
    todos.createCard(card).then(() => {
      todos.getCards(card.userId).then((user) => {
        client.emit('cards', user.cards || [])
      })
    })
  })

  client.on('update status', (args) => {
    todos.updateCard(args.id, args.newStatus).then(() => {
      todos.getCards(client.handshake.query.userId).then((user) => {
        client.emit('cards', user.cards || [])
      })
    })
  })

  client.on('delete card', (id) => {
    let userId = client.handshake.query.userId
    todos.removeCard(id, userId).then(() => {
      todos.getCards(userId).then((user) => {
        client.emit('cards', user.cards || [])
      })
    })
  })
})

app.use((req, res) => {
  res.status(404).send('Nope, nothing here')
})

server.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`)
})
