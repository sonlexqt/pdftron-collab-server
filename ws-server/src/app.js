import express from 'express'
import logger from 'morgan'
import http from 'http'
import SocketIO from 'socket.io'
import axios from 'axios'

const app = express()

app.use(logger('dev'))
app.use(express.json())

const server = http.createServer(app)
const port = process.env.PORT || 4000
server.listen(port)
server.on('listening', () => {
  console.log(`WS-SERVER listening on port ${port}`)
})

const io = SocketIO(server)
io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`)
  })
  socket.on('annotationChanged', (data) => {
    console.log(`${socket.id} annotationChanged`)
    // send request to api-server
    axios.post('http://api-server:3000/api/annotations', data)
    socket.broadcast.emit('annotationUpdated', data)
  })
})

app.get('/', (req, res) => res.send('ws-server'))
