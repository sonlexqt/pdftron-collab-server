import express from 'express'
import logger from 'morgan'
import http from 'http'
import SocketIO from 'socket.io'

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
    socket.broadcast.emit('annotationUpdated', data)
  })
})

app.get('/', (req, res) => res.send('ws-server'))
