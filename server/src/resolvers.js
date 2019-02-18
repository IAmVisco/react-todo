const {getCards, createCard, updateCard, removeCard} = require('./controllers/todos')

const resolvers = {
  Query: {getCards},
  Mutation: {createCard, updateCard, removeCard}
}

export default resolvers
