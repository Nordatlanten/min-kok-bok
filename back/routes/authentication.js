require('dotenv').config()
const express = require('express')
const app = express()
const router = express.Router()
const DB = require('better-sqlite3-helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


let refreshTokens = []

router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
    res.sendStatus(204)
})

router.post('/login', async (req, res) => {

    const body = req.body
    const result = await DB().query('SELECT * FROM users WHERE username=?', body.username)
    const foundUser = result[0]

    console.log(foundUser)

    if(foundUser){
      const validPassword = await bcrypt.compare(body.password, foundUser.password)
      console.log(validPassword)
      if (validPassword){
        try {
          const user = { name: foundUser.username}
          const admin = {admin: foundUser.admin}
          const accessToken = await generateAccessToken(user)
          const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
          refreshTokens.push(refreshToken)
          console.log(refreshTokens)

          console.log(admin)

          res.status(200).json({admin: admin.admin, name: user.name, accessToken: accessToken, refreshToken: refreshToken})
        } catch (error) {
          console.error(error)
        }  
    
      } else{
        res.status(400).json({error: "Invalid password"})
      }
    } else {
      res.status(401).json({error: "User does not exist"})
    }
})
    

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}


module.exports = router