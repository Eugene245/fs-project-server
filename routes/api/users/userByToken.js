const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const { ObjectID } = require('mongodb')

const router = express.Router()

const User = require('../../../models/User')

router.post('/', (req, res) => {
  const { token } = req.body
  const decoded = jwt.verify(token, config.get('jwtSecret'))
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
    .catch(error => res.send(error))
})

module.exports = router
