const fs = require('fs')
const todoModel = require('../models/todos')
const userModel = require('../models/users')

let data = require('../data.json')

function writeDataToFile(data) {
  fs.writeFile('./data.json', JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      throw err
    }
  })
}

getAllCards = () => {
  console.log('get all cards')
}

module.exports = {
  getCards: function (req, res) {
    userModel.findById(req.body.userId)
      .populate('cards').exec((err, user) => {
        if (err) {
          res.status(500).send(err)
        }
        res.status(200).send(user.cards)
      })
  },
  createCard: function (req, res) {
    let card = req.body
    if (card && (card.name || card.description)) {
      todoModel.create({
        name: card.name,
        description: card.description,
        status: card.status,
        color: card.color,
        dueTo: card.dueTo
      }).then((card) => {
        userModel.findById(req.body.userId, (err, user) => {
          user.cards.unshift(card)
          user.save().then(getAllCards) //TODO: finish this
        })
      })
      res.status(200).send(data)
    } else {
      res.status(400).send([])
    }
  },
  updateCard: function (req, res) {
    let cardIndex = data.findIndex(el => el.id === req.body.id)
    if (cardIndex >= 0) {
      data[cardIndex].status = req.body.newStatus
      writeDataToFile(data)
      res.status(200).send(data)
    } else {
      res.status(404).send([])
    }
  },
  removeCard: function (req, res) {
    let cardIndex = data.findIndex(el => el.id === req.body.id)
    if (cardIndex >= 0) {
      data.splice(cardIndex, 1)
      writeDataToFile(data)
      res.status(200).send(data)
    } else {
      res.status(404).send([])
    }
  }
}
