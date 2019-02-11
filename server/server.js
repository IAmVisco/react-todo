const express = require('express')
const cors = require('cors')
const mongoose = require('./config/database')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const users = require('./routes/users')
const todos = require('./routes/todos')

const PORT = process.env.PORT || 3001
const app = express()
const router = express.Router()

app.set('secretKey', 'todoapp')

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

app.use('/api', validateUser, todos)
app.use('/users', users)

app.use((req, res) => {
  res.status(404).send({})
})

app.listen(PORT, () => console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`))
