const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltRounds = 10

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  cards: [
    { type: Schema.Types.ObjectId, ref: 'Todo' }
  ]
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.password = bcrypt.hashSync(this.password, saltRounds)
  }
  next()
})

module.exports = (mongoose.models && mongoose.models.User ? mongoose.models.User : mongoose.model('User', UserSchema))
