const express = require('express')
const app = express()
const path = require('path')

const viewsPath = path.join(__dirname, '/views')
app.set('view engine', 'ejs')
app.set('views', viewsPath)

const methodOverride = require('method-override')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))

const mainRouter = require('./routes/main')
const moviesRouter = require('./routes/movies')
const genresRouter = require('./routes/genres')
const actorsRouter = require('./routes/actors')

app.use('/', mainRouter)
app.use('/movies', moviesRouter)
app.use('/genres', genresRouter)
app.use('/actors', actorsRouter)

const moviesApiRouter = require('./routes/api/movies')

app.use('/api/movies', moviesApiRouter)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => console.log(`Serving @ ${PORT}`))

module.exports = { app, server }
