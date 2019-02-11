const express = require('express')
const cors = require('cors')
// const mongoose = require('./config/database')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const users = require('./routes/users')
const todos = require('./routes/todos')

const PORT = process.env.PORT || 3001
const app = express()
const router = express.Router()

app.set('secretKey', 'todoapp')

// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', todos)
app.use('/users', users)

app.use((req, res) => {
  res.status(404).send({})
})

app.listen(PORT, () => console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`))
