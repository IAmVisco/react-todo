const express = require('express')
const cors = require('cors')
const moment = require('moment')
const fs = require('fs')
const nanoid = require('nanoid')

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
  let card = req.body
  if (card && card.name && card.description) {
    card.createdAt = moment().format('YYYY-MM-DD')
    card.id = nanoid(8)
    data.unshift(card)
    fs.writeFile('./data.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            throw err
        }
    })
    res.status(200).send(data)
  }
  else {
    res.status(400).send({})
  }
})

app.use("/api", router)

app.listen(PORT, () => console.log(`Express server is running on http://localhost:${PORT} in ${app.get('env')} mode.`))
