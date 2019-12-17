const express = require('express')
const router = express.Router()
const User = require('../../../models/User')

router.get('/:query', (req, res) => {
  const { query } = req.params
  let queryRegexp = new RegExp(query, 'i')

  User.find({ name: queryRegexp })
    .then(list => {
      res.send(list.map( user => user.name))
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