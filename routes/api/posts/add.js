const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Post = require('../../../models/Post')

router.post('/', (req, res) => {
  const { userName, userIdString, avatar_url, title, postText } = req.body
  const post_id = mongoose.Types.ObjectId()
  const likes = 0
  const dislikes = 0
  const comments = [{}]
  const userId = mongoose.Types.ObjectId(userIdString)

    const newPost = new Post({
      _id: post_id,
      userName,
      userId,
      title,
      postText,
      avatar_url,
      likes,
      dislikes,
      comments,
    })

    newPost.save()
      .then(post => {
        res.json({
          post: {
            _id: post_id,
            userName: post.userName,
            userId: post.userId,
            avatar_url: post.avatar_url,
            title: post.title,
            postText: post.postText,
            likes: post.likes,
            dislikes: post.dislikes,
            comments: post.comments,
          },
        })
      })

  })

module.exports = router