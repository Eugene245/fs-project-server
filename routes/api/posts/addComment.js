const express = require('express')
const { ObjectID } = require('mongodb')
const router = express.Router()
const mongoose = require('mongoose')

const Post = require('../../../models/Post')

router.post('/', (req, res) => {
  const { id, userName, commentText } = req.body

  if(!id || !userName || !commentText) {
    res.send("Enter all fields!")
  }else {
    Post.updateOne(
      { _id: ObjectID(id) },
      { $push: { comments: { author: userName, commentText: commentText, creation_date: Date.now() } } }
    )
      .then(() => {
        Post.findOne({ _id: ObjectID(id) })
          .then(post => {
            res.json({
              id: post.id,
              comments: post.comments.reverse(),
            })
          })   
      })  
  }
})

module.exports = router