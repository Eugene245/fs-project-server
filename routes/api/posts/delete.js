const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')

const router = express.Router()

const Post = require('../../../models/Post')

router.post('/:id', (req, res) => {
  const { token } = req.body
  const { id } = req.params
  const decoded = jwt.verify(token, config.get('jwtSecret'))
  Post.findOne({ _id: mongoose.Types.ObjectId(req.params.id) })
    .then(post => {
      if(decoded.id == post.userId){
        Post.deleteOne({ "_id": mongoose.Types.ObjectId(req.params.id) })
          .then(() => {
            res.json({
              deletedPostId: id
            })
          })
      }else{
        res.send("No permission")
      }
    })
})

module.exports = router
