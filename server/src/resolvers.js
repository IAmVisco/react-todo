const getCards = require('./controllers/todos').getCards

const resolvers = {
  Query: {getCards}
}

export default resolvers
