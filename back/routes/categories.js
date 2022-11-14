const express = require('express')
const router = express.Router()
const DB = require('better-sqlite3-helper')

const authenticateToken = require('./middleware')

router.get('/', (req, res) => {
    let data = DB().query('SELECT * FROM categories')
    res.send(data)
})

router.post('/', authenticateToken, (req, res) => {
    console.log(req.body)
    let keys = Object.entries(req.body)
    DB().insert('categories', {
        name: req.body.name,
    })
    res.send('inserted data: ' + keys)
})

module.exports = router
