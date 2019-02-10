const express = require('express')
const moment = require('moment')
const nanoid = require('nanoid')
const fs = require('fs')

const router = express.Router()

let data = require('../data.json')

function writeDataToFile(data) {
  fs.writeFile('./data.json', JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
}

router.get('/cards', (req, res) => {
  res.status(200).send(data)
})

router.post('/card', (req, res) => {
  let card = req.body
  if (card && (card.name || card.description)) {
    card.createdAt = moment().format('YYYY-MM-DD')
    card.id = nanoid(8)
    data.unshift(card)
    writeDataToFile(data)
    res.status(200).send(data)
  } else {
    res.status(400).send({})
  }
})

router.patch('/card', (req, res) => {
  let cardIndex = data.findIndex(el => el.id === req.body.id)
  if (cardIndex >= 0) {
    data[cardIndex].status = req.body.newStatus
    writeDataToFile(data)
    res.status(200).send(data)
  } else {
    res.status(404).send({})
  }
})

router.delete('/card', (req, res) => {
  let cardIndex = data.findIndex(el => el.id === req.body.id)
  if (cardIndex >= 0) {
    data.splice(cardIndex, 1)
    writeDataToFile(data)
    res.status(200).send(data)
  } else {
    res.status(404).send({})
  }
})

module.exports = router
