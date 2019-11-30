const express = require('express')

const router = express.Router()
const { ObjectID } = require('mongodb')

const User = require('../../../models/User')

router.get('/:id', (req, res) => {
  User.findById(ObjectID(req.params.id))
    .then(user =>
      res.json({
        id: user.id,
        avatar_url: user.avatar_url,
        name: user.name,
        ticket_id: user.ticket_id,
      }),
    )
    .catch(error => res.json({ error }))
})

module.exports = router
