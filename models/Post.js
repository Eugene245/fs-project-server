const mongoose = require('mongoose')

const { Schema } = mongoose

const PostSchema = new Schema({
  _id: {
    type: Object,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  postImg: {
    type: String,
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: [
    {
    author: {
      type: String,
    },
    commentText: {
      type: String,
    },
    creation_date: {
      type: Date,
    },
    }
  ],
  creation_date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Post = mongoose.model('post', PostSchema)
