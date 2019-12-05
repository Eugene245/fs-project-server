const express = require('express')
const { ObjectID } = require('mongodb')
const router = express.Router()
const mongoose = require('mongoose')

const Post = require('../../../models/Post')

router.post('/', (req, res) => {
  const { id, userName, commentText } = req.body

    Post.findOne({ _id: ObjectID(id) })
      .then(post => {
        Post.updateOne(
          { _id: ObjectID(id) },
          { $push: { comments: { author: userName, commentText: commentText, creation_date: Date.now() } } }
        ).then(() => {
          res.json(post)
        })  
      })
    
})

module.exports = router

// Post.updateOne(
//   { _id: ObjectID(id) },
//   { $push: { comments: { $each: [{ author: userName, commentText: commentText, creation_date: Date.now }] } } }
// )