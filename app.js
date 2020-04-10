if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const routes = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandling')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandler)


app.listen(process.env.PORT, _ => console.log(`Now Listening: I love you ${process.env.PORT}`))