const todoModel = require('../models/todos')
const userModel = require('../models/users')

module.exports = {
  getCards: function (userId) {
    return userModel.findById(userId).populate('cards').sort({createdAt: 'desc'}).exec()
  },
  createCard: function (req, res) {
    let card = req.body
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
            todoModel.find({_id: {$in: user.cards}}).sort({createdAt: 'desc'})
              .exec((err, cards) => {
                if (err)
                  res.status(500).send(err)
                else
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
    if (req.body.id) {
      todoModel.findByIdAndUpdate(req.body.id, {status: req.body.newStatus}, (err, oldCard) => {
        if (err) {
          res.status(500).send(err)
        } else {
          userModel.findById(req.body.userId).populate('cards').sort({createdAt: 'desc'})
            .exec((err, user) => {
              if (err) {
                res.status(500).send(err)
              } else {
                res.status(200).send(user.cards)
              }
            })
        }
      })
    } else {
      res.status(404).send([])
    }
  },
  removeCard: function (req, res) {
    if (req.body.id && req.body.userId) {
      userModel.findById(req.body.userId, (err, user) => {
        user.cards.pull(req.body.id)
        user.save().then((user) => {
          todoModel.findByIdAndDelete(req.body.id, (err, deleted) => {
            if (err) {
              res.status(500).send(err)
            } else {
              userModel.findById(req.body.userId).populate('cards').sort({createdAt: 'desc'})
                .exec((err, user) => {
                  if (err) {
                    res.status(500).send(err)
                  } else {
                    res.status(200).send(user.cards)
                  }
                })
            }
          })
        })
      })
    } else {
      res.status(404).send([])
    }
  }
}
