const express = require('express')

const router = express.Router()
const bcrypt = require('bcryptjs')
const { ObjectID } = require('mongodb')

const User = require('../../../models/User')

router.post('/', (req, res) => {
  const { id, avatar_url, name, email, password } = req.body

  User.findById(ObjectID(id))
    .then(user => {
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            if (avatar_url) {
              User.updateOne(
                { _id: ObjectID(id) },
                { $set: { avatar_url } },
                err => {
                  if (err) console.log(err)
                },
              )
            }
            if (name) {
              User.updateOne({ _id: ObjectID(id) }, { $set: { name } }, err => {
                if (err) console.log(err)
              })
            }
            if (email) {
              User.updateOne(
                { _id: ObjectID(id) },
                { $set: { email } },
                err => {
                  if (err) console.log(err)
                },
              )
            }
            res.json({
              status: 'success',
            })
          }
        })
        .catch(() =>
          res.json({
            status: 'failed',
            error: 'password incorrect',
          }),
        )
    })
    .catch(() =>
      res.json({
        status: 'failed',
        error: 'user not found',
      }),
    )
})

module.exports = router
