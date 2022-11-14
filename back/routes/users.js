const express = require('express')
const router = express.Router()
const DB = require('better-sqlite3-helper')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    let data = DB().query('SELECT * FROM users')
    res.send(data)
})

router.get('/logincheck', (req, res) => {
    let {username, password} = DB().queryFirstRow('SELECT * FROM users WHERE username=? AND password=?', [req.body.username, req.body.password])
    if (username && password) res.json({username: username, password: password})
})

router.post('/register', async (req, res) => {

    let body = {
        username: req.body.username, 
        password: null, 
        email: req.body.email, 
        admin: req.body.admin
    }
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(req.body.password, salt)

    console.log(body)
    
    DB().insert('users', {
        username: body.username,
        password: body.password,
        admin: body.admin ? body.admin : 0,
        email: body.email,
    })
    res.status(201).send({username: body.username})
})

router.delete('/delete', (req, res) => {
    const username = req.body.username
    let data = DB().query(
        'SELECT username FROM users WHERE username=?',
        username
    )
    if (data[0].username === username){
        DB().delete('users', {username: username})
         res.sendStatus(200)
    }

    
})

module.exports = router
