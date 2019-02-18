const todoModel = require('../models/todos')
const userModel = require('../models/users')

async function getCards(_, args) {
  let user = await userModel.findById(args.userId).populate({
    path: 'cards',
    options: {
      sort: {
        'createdAt': -1
      }
    }
  }).exec()
  return user.cards
}

async function createCard(_, args) {
  const { userId, ...card } = args.input
  const newCard = await todoModel.create(card)
  console.log(newCard)
  const user = await userModel.findById(userId).exec()
  user.cards.push(newCard)
  await user.save()
  return newCard
}

async function updateCard(_, args) {
  const { id, newStatus } = args
  await todoModel.findByIdAndUpdate(id, { status: newStatus }).exec()
}

async function removeCard(_, args) {
  const { id, userId } = args
  const user = await userModel.findById(userId).exec()
  user.cards.pull(id)
  await user.save()
  await todoModel.findByIdAndDelete(id)
}

module.exports = {
  getCards,
  createCard,
  updateCard,
  removeCard
}
// module.exports = {
//   // getCards: function (data, context) {
//   // console.log(data, context)
//   // return userModel.findById(userId).populate({
//   //   path: 'cards',
//   //   options: {
//   //     sort: {
//   //       'createdAt': -1
//   //     }
//   //   }
//   // }).exec()
//   // },
//   // createCard: function (card) {
//   //   if (card && card.name) {
//   //     return todoModel.create({
//   //       name: card.name,
//   //       description: card.description,
//   //       status: card.status,
//   //       color: card.color,
//   //       dueTo: card.dueTo
//   //     }).then((newCard) => {
//   //       return userModel.findById(card.userId).exec().then((user) => {
//   //         user.cards.push(newCard)
//   //         return user.save()
//   //       })
//   //     })
//   //   } else {
//   //     return Promise.reject()
//   //   }
//   // },
//   // updateCard: function (id, newStatus) {
//   //   if (id && newStatus) {
//   //     return todoModel.findByIdAndUpdate(id, {status: newStatus}).exec()
//   //   } else {
//   //     return Promise.reject()
//   //   }
//   // },
//   // removeCard: function (id, userId) {
//   //   if (id && userId) {
//   //     return userModel.findById(userId).exec().then((user) => {
//   //       user.cards.pull(id)
//   //       user.save().then(() => {
//   //         return todoModel.findByIdAndDelete(id)
//   //       })
//   //     })
//   //   } else {
//   //     return Promise.reject()
//   //   }
//   // }
// }
