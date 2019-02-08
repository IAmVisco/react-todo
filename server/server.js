const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3001
let data = require('./data.json')
const app = express()
const router = express.Router()

app.use(express.json())

app.use(cors())

router.get('/cards', (req, res) => {
  res.status(200).send(data)
})

router.post('/card', (req, res) => {
  console.log(req.body)
  if (req.body && req.body.name && req.body.description) {
    res.status(200).send({success: true, method: 'post'})
  }
  else {
    res.status(400).send({})
  }
})

app.use("/api", router)

app.listen(PORT, () => console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`))
