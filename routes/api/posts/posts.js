const express = require('express')
const router = express.Router()
const { ObjectID } = require('mongodb')

const Post = require('../../../models/Post')

router.get('/', (req, res) => {
  try {
    const { query } = req
    const offset = +query.offset
    const limit = +query.limit
    Post.find({})
      .then(collection => {
        res.json({
          posts: collection.slice(offset, offset + limit),
          pagination: { offset, limit },
        })
      })
      .catch(error => {
        res.status(400).json({ error })
      })
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
