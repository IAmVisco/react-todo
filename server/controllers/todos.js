const fs = require('fs')
const moment = require('moment')
const nanoid = require('nanoid')

let data = require('../data.json')

function writeDataToFile(data) {
  fs.writeFile('./data.json', JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
}

module.exports = {
  getAllCards: function (req, res) {
    res.status(200).send(data)
  },
  createCard: function (req, res) {
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
  },
  updateCard: function (req, res) {
    let cardIndex = data.findIndex(el => el.id === req.body.id)
    if (cardIndex >= 0) {
      data[cardIndex].status = req.body.newStatus
      writeDataToFile(data)
      res.status(200).send(data)
    } else {
      res.status(404).send({})
    }
  },
  removeCard: function (req, res) {
    let cardIndex = data.findIndex(el => el.id === req.body.id)
    if (cardIndex >= 0) {
      data.splice(cardIndex, 1)
      writeDataToFile(data)
      res.status(200).send(data)
    } else {
      res.status(404).send({})
    }
  }
}
