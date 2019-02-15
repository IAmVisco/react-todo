const todoModel = require('../models/todos')
const userModel = require('../models/users')

module.exports = {
  getCards: function (userId) {
    return userModel.findById(userId).populate({
      path: 'cards',
      options: {
        sort: {
          'createdAt': -1
        }
      }
    }).exec()
  },
  createCard: function (card) {
    if (card && card.name) {
      return todoModel.create({
        name: card.name,
        description: card.description,
        status: card.status,
        color: card.color,
        dueTo: card.dueTo
      }).then((newCard) => {
        return userModel.findById(card.userId).exec().then((user) => {
          user.cards.push(newCard)
          return user.save()
        })
      })
    } else {
      return Promise.reject()
    }
  },
  updateCard: function (id, newStatus) {
    if (id && newStatus) {
      return todoModel.findByIdAndUpdate(id, {status: newStatus}).exec()
    } else {
      return Promise.reject()
    }
  },
  removeCard: function (id, userId) {
    if (id && userId) {
      return userModel.findById(userId).exec().then((user) => {
        user.cards.pull(id)
        user.save().then(() => {
          return todoModel.findByIdAndDelete(id)
        })
      })
    } else {
      return Promise.reject()
    }
  }
}
