const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  _id: {
    type: Object,
    required: true,
  },
  avatar_url: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = User = mongoose.model('user', UserSchema)
