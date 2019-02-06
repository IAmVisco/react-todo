const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT || 3001
let data = require('./data.json')
const app = express()
const router = express.Router()

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.get('/getAllCards', (req, res) => {
  res.status(200).send(data)
})

app.post('/', (req, res) => {
  res.status(200).send({success: true, method: 'post'})
})

app.listen(PORT, () => console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`))
