const express = require('express')
const router = express.Router()

const User = require('../../../models/User')

router.post('/follow', (req, res) => {
  const { userName, followToUser } = req.body

  User.updateOne(
    { name: userName },
    { $push: { following: followToUser } }
  )
    .then(() => {
      User.findOne({ name: userName })
        .then(user => {
          res.json({
              following: user.following,
          })
        })   
    })  
})


router.post('/unfollow', (req, res) => {
  const { userName, unfollowToUser } = req.body

  User.updateOne(
    { name: userName },
    { $pull: { following: unfollowToUser } }
  )
    .then(() => {
      User.findOne({ name: userName })
        .then(user => {
          res.json({
              following: user.following,
          })
        })   
    })  
})

module.exports = router