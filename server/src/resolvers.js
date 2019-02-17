const {getCards, createCard, removeCard} = require('./controllers/todos')

const resolvers = {
  Query: {getCards},
  Mutation: {createCard, removeCard}
}

export default resolvers
