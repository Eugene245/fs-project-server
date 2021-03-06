const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()
const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../../../models/User')

router.post('/', (req, res) => {
  const { name, email, password } = req.body
  const user_id = mongoose.Types.ObjectId()
  const avatar_url = ""
  const description = ""
  const liked_posts = []
  const following = []

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  //  Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'This email is already in use' })

    User.findOne({ name }).then(user => {
      if (user) return res.status(400).json({ msg: 'This username is already in use' })

      const newUser = new User({
        _id: user_id,
        name,
        email,
        password,
        avatar_url,
        description,
        liked_posts,
        following,
      })

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save().then(user => {
            jwt.sign(
              // payload
              { id: user.id },
              config.get('jwtSecret'),
              { expiresIn: 1800 },
              (err, token) => {
                if (err) throw err
                res.json({
                  token,
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
              },
            )
          })
        })
      })
    })
  })
})

module.exports = router
