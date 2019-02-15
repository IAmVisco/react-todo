const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('./config/database')
const bodyParser = require('body-parser')
const users = require('./routes/users')
const todos = require('./controllers/todos')

const PORT = process.env.PORT || 3001
const router = express.Router()

app.set('secretKey', 'todoapp')
io.origins('*:*')

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.status(401).send({status: 'error', message: err.message})
    } else {
      req.body.userId = decoded.id
      next()
    }
  })
}

app.use('/users', users)

io.use((socket, next) => {
  jwt.verify(socket.handshake.query.token, app.get('secretKey'), (err, decoded) => {
    if (err) {
      next(new Error('Authentication error'));
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
      console.log(card)
      client.emit('cards', [])
  })
})

app.use((req, res) => {
  res.status(404).send({})
})

server.listen(PORT)
console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`)
