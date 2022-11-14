const express = require('express')
const router = express.Router()
const DB = require('better-sqlite3-helper')
const authenticateToken = require('./middleware')

router.get('/', (req, res) => {
    let data = DB().query('SELECT * FROM books')

    res.send(data)
})

router.post('/', authenticateToken, (req, res) => {
    console.log(req.body)
    let keys = Object.entries(req.body)
    DB().insert('books', {
        name: req.body.name,
        categories: req.body.categories,
    })
    res.send('inserted data: ' + keys)
})

module.exports = router
