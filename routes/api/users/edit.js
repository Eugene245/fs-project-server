const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = express.Router()
const { ObjectID } = require('mongodb')

const User = require('../../../models/User')

router.post('/', (req, res) => {
  const { avatar_url, email, description, token } = req.body
  const decoded = jwt.verify(token, config.get('jwtSecret'))
  
  User.findOne({ _id: ObjectID(decoded.id) })
    .then(() => {
      if (avatar_url) {
        User.updateOne(
          { _id: ObjectID(decoded.id) },
          { $set: { avatar_url } },
          err => {
            if (err) console.log(err)
          },
        )
      }
      if (email) {
        User.updateOne(
          { _id: ObjectID(decoded.id) },
          { $set: { email } },
          err => {
            if (err) console.log(err)
          }
        )
      }
      if (description) {
        User.updateOne(
          { _id: ObjectID(decoded.id) }, 
          { $set: { description } }, 
          err => {
            if (err) console.log(err)
          }
        )
      }
    })
    .then(() => {
      User.findOne({ _id: ObjectID(decoded.id) })
        .then(user => {
          res.json({
            user: {
              id: user.id,
              avatar_url: user.avatar_url,
              name: user.name,
              email: user.email,
              description: user.description,
              liked_posts: user.liked_posts,
              following: user.following,
            },
          })
        })
    })
    .catch(() =>
      res.json({
        status: 'failed',
        error: 'user not found',
      }),
    )
})

module.exports = router
