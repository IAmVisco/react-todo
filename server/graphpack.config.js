const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const users = require('./src/routes/users')
const mongoose = require('./src/config/database')

const app = express()
const PORT = process.env.PORT || 3001

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
app.set('secretKey', 'todoapp')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/users', users)

app.use((req, res, next) => {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.status(401).send({status: 'error', message: err.message})
    } else {
      req.body.userId = decoded.id
      next()
    }
  })
})

module.exports = {
  server: {
    applyMiddleware: {app},
    port: 3001
  }
}
