const express = require('express')
const router = express.Router()
const { ObjectID } = require('mongodb')
const User = require('../../../models/User')
const Post = require('../../../models/Post')

router.post('/like', (req, res) => {
  const { userName, postId } = req.body

  User.updateOne(
    { name: userName },
    { $push: { liked_posts: postId } }
  )
  .then(() => {
    User.findOne({ name: userName })
      .then(user => {
        Post.updateOne(
          { _id: ObjectID(postId) },
          { $inc: { likes: 1 } }
        )
          .then(() => {
            Post.findOne({ _id: ObjectID(postId) })
              .then(post => {
                res.json({
                  liked_posts: user.liked_posts,
                  postId: postId,
                  likes: post.likes,
                })
              })
          })
      })   
  })     
})


router.post('/unlike', (req, res) => {
  const { userName, postId } = req.body

  User.updateOne(
    { name: userName },
    { $pull: { liked_posts: postId } }
  )
  .then(() => {
    User.findOne({ name: userName })
      .then(user => {
        Post.updateOne(
          { _id: ObjectID(postId) },
          { $inc: { likes: -1 } }
        )
          .then(() => {
            Post.findOne({ _id: ObjectID(postId) })
              .then(post => {
                res.json({
                  liked_posts: user.liked_posts,
                  postId: postId,
                  likes: post.likes,
                })
              })
          })
      })   
  })     
})

module.exports = router