const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  create: (req, res, next) => {
    userModel.create({ // TODO: make unique only
      username: req.body.username,
      email: req.body.email,
      password: req.body.password}, (err, result) => {
      console.log(err, result)
      if (err) {
        next(err)
      } else {
        res.status(200).send({status: 'success', msg: 'User added successfully'})
      }
    })
  },
  authenticate: (req, res, next) => {
    userModel.findOne({email: req.body.email}, (err, userInfo) => {
      if (err) {
        next(err)
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '24h'})
          res.status(200).send({status: 'success', msg: 'User found', token: token})
        } else {
          res.status(400).send({status: 'error', msg: 'Invalid email/password.'})
        }
      }
    })
  }
}
