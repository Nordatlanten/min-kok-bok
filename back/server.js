const DB = require('better-sqlite3-helper')
const express = require('express')
const port = 3000

const app = express()
app.use(express.json())
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

const users = require('./routes/users.js')
const books = require('./routes/books.js')
const categories = require('./routes/categories.js')
const recipes = require('./routes/recipes.js')
const auth = require('./routes/authentication.js')

DB({
    path: './data/sqlite3.db',
    readonly: false,
    fileMustExist: false,
    WAL: true,
    migrate: {
        force: false,
        table: 'migration',
        migrationsPath: './migrations',
    },
})

app.use('/users', users)
app.use('/books', books)
app.use('/categories', categories)
app.use('/recipes', recipes)
app.use('/auth', auth)

app.listen(port, () => {
    console.log('Listening to ' + port + '.......')
})
