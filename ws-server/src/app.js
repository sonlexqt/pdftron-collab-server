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
// io.on('connection', (socket) => {
//   console.log(`${socket.id} connected`)
//   socket.on('disconnect', () => {
//     console.log(`user ${socket.id} disconnected`)
//   })
//   socket.on('annotationChanged', (data) => {
//     console.log(`${socket.id} annotationChanged`)
//     // send request to api-server
//     axios.post('http://api-server:3000/api/annotations', data)
//     socket.broadcast.emit('annotationUpdated', data)
//   })
// })

io.sockets.on('connection',  (socket) => {
	
	socket.on('userJoinRoom', (user)=>{
		socket.username = user.userName;
		socket.room = user.room;
		socket.join(socket.room);
		// socket.emit('updateInfo', 'SERVER', 'you have connected to ' + socket.room);
		// socket.broadcast.to(socket.room).emit('updateInfo', 'SERVER', socket.username + ' has connected to this room');
		console.log(  'SERVER', socket.username + ' has connected to room ' + socket.room );
  });
  
  socket.on('annotationChanged', (data) => {
        console.log(`${socket.id} annotationChanged`)
        // send request to api-server
        axios.post('http://api-server:3000/api/annotations', data)
        io.sockets.in(socket.room).emit('annotationUpdated', data);
      })
	

	socket.on('disconnect', ()=>{
		console.log( socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});


app.get('/', (req, res) => res.send('ws-server'))
