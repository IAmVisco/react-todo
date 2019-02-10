const mongoose = require('mongoose')
const mongoDB = 'mongo_db_conn_string'
mongoose.connect(mongoDB, {useNewUrlParser: true})
// mongoose.Promise = global.Promise

module.exports = mongoose
