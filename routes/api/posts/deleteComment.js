const express = require('express')
const jwt = require('jsonwebtoken')
const { ObjectID } = require('mongodb')
const config = require('config')
const mongoose = require('mongoose')

const router = express.Router()

const Post = require('../../../models/Post')

router.post('/:id', (req, res) => {
  const { token, commentId } = req.body
  const { id } = req.params
  const decoded = jwt.verify(token, config.get('jwtSecret'))
  User.findOne({ _id: mongoose.Types.ObjectId(decoded.id) })
    .then(user => {
      Post.findOne({ _id: mongoose.Types.ObjectId(id) })
        .then(post => {
          if(user.name == post.comments.find(obj => obj.author === user.name).author){
            Post.updateOne(
              { _id: mongoose.Types.ObjectId(id) },
              { $pull: { comments: { _id: ObjectID(commentId) } } }
            )
              .then(() => {
                Post.findOne({ _id: mongoose.Types.ObjectId(id) })
                  .then(post => {
                    res.json({
                      id: post.id,
                      comments: post.comments,
                    })
                  })
              })
          }else{
            res.send("No permission")
          }
        })
    })
})

module.exports = router
