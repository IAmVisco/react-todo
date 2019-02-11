const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  create: (req, res, next) => {
    userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password}, (err, result) => {
      if (err) {
        res.status(500).send({status: 'error', msg: 'Failed to create user. Maybe email is taken already?'})
      } else {
        res.status(200).send({status: 'success', msg: 'User created successfully'})
      }
    })
  },
  authenticate: (req, res, next) => {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(403).send({status: 'error', msg: 'No valid email/password supplied'})
    } else {
      userModel.findOne({email: req.body.email}, (err, userInfo) => {
        if (err) {
          next(err)
        } else {
          if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '24h'})
            res.status(200).send({status: 'success', msg: 'User logged in', token: token})
          } else {
            res.status(403).send({status: 'error', msg: 'Invalid email/password'})
          }
        }
      })
    }
  }
}
