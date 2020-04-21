if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const routes = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandling')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandler)

io.on('connection', (socket) => {
    console.log('a user connected');
    // Tell client to fetch data
    socket.on('userAction', () => {
        console.log('A user did something to the database')
        io.emit('timeToFetch', () => {
            console.log('Clients are told to fetch')
        })
    })
});

http.listen(process.env.PORT, () => console.log(`Now Listening: I love you ${process.env.PORT}`))