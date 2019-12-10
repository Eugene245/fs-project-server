const express = require('express')
const router = express.Router()

const User = require('../../../models/User')
const Post = require('../../../models/Post')

router.get('/:name', (req, res) => {
  User.findOne({ name: req.params.name })
    .then(user =>
      Post.find({ userId: user._id })
        .then(collection => {
          res.json({
            user: { name: user.name, avatar_url: user.avatar_url, description: user.description },
            posts: collection,
          })
        })
      .catch(error => res.json({ error }))
    )
    .catch(error => res.json({ error }))
})

module.exports = router
