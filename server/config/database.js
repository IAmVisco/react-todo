const mongoose = require('mongoose')
const mongoDB = ''
mongoose.connect(mongoDB, {useNewUrlParser: true})
// mongoose.Promise = global.Promise

module.exports = mongoose
