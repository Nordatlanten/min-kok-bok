const express = require('express')
const router = express.Router()
const DB = require('better-sqlite3-helper')

const authenticateToken = require('./middleware')

router.get('/', (req, res) => {
    let data = DB().query('SELECT * FROM recipes')
    res.send(data)
})

router.post('/', authenticateToken, (req, res) => {
    console.log(req.body)
    let keys = Object.entries(req.body)
    DB().insert('recipes', {
        title: req.body.title,
        oventemp: req.body.oventemp,
        baketime: req.body.baketime,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
    })
    res.send('inserted data: ' + keys)
})

module.exports = router
