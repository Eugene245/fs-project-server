const express = require('express')
const router = express.Router()
const { ObjectID } = require('mongodb')

const Post = require('../../../models/Post')

router.post('/', (req, res) => {
  try {
    const { users } = req.body
    const { query } = req
    const offset = +query.offset
    const limit = +query.limit
    if(users.length === 0) {
      Post.find({})
      .then(collection => {
        res.json({
          posts: collection.slice(offset, offset + limit),
          pagination: { offset, limit, rowCount: collection.length },
        })
      })
      .catch(error => {
        res.status(400).json({ error })
      })
    }else {
      Post.find({ userName: { $in: users } })
      .then(collection => {
        res.json({
          posts: collection.slice(offset, offset + limit),
          pagination: { offset, limit, rowCount: collection.length },
        })
      })
      .catch(error => {
        res.status(400).json({ error })
      })
    }
  } catch (error) {
    res.send(error)
  }
})

router.get('/:id', (req, res) => {
    Post.findById(ObjectID(req.params.id))
      .then(post => {
        if (!post) throw new Error('Bad post id')
        else res.json(post)
      })
      .catch(e => {
        const error = {
          name: 'Request error',
          message: e.message,
        }

        res.status(400).json({ error })
      })

})

module.exports = router
