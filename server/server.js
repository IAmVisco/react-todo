const express = require('express')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001
const app = express()
const router = express.Router()

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200).send({success: true})
})

app.post('/', (req, res) => {
  res.status(200).send({success: true, method: 'post'})
})

app.listen(PORT, () => console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`))
