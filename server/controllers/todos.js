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

module.exports = {
  getCards: function (req, res) {
    userModel.findById(req.body.userId).populate('cards').sort({createdAt: 'desc'}).exec((err, user) => {
      if (err) {
        res.status(500).send(err)
      }
      res.status(200).send(user.cards)
    })
  },
  createCard: function (req, res) {
    let card = req.body
    console.log(card)
    if (card && card.name) {
      todoModel.create({
        name: card.name,
        description: card.description,
        status: card.status,
        color: card.color,
        dueTo: card.dueTo
      }).then((newCard) => {
        userModel.findById(card.userId, (err, user) => {
          user.cards.push(newCard)
          user.save().then((user) => {
            todoModel.find({_id: {$in: user.cards}}).sort({createdAt: 'desc'}).exec((err, cards) => {
              if (err) {
                res.status(500).send(err)
              }
              res.status(200).send(cards)
            })
          })
        })
      })
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
