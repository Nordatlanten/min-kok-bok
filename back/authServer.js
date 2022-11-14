require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const { OPEN_READWRITE } = require('sqlite3')

const port = 4000

const https = require('https')
const options = {
  hostname: '0.0.0.0',
  port: 3000,
  path: '/users/logincheck',
  method: 'GET'
}



app.use(express.json())

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const request = https.request(options, response => {
    console.log('statusCode: ' + response.statusCode)

    response.on('data', d => {
      
        console.log(d)

    // const user = { name: d.username}
    // const accessToken = generateAccessToken(user)
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    // refreshTokens.push(refreshToken)
    // console.log(refreshTokens)
    // response.json({ accessToken: accessToken, refreshToken: refreshToken })
     })
    
})
    

    request.on('error', error => {
        console.error(error)
    })

    request.end()

})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
}

app.listen(port, () => {
    console.log('Listening to ' + port + '.......')
})
