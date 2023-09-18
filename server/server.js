const express = require('express')
const { Server } = require('socket.io')
const http = require('http')

const app = express() // initialize express

const server = http.createServer(app)

// set port to value received from environment variable or 8080 if null
const port = process.env.PORT || 8080

// upgrade http server to websocket server
const io = new Server(server, {
	cors: '*', // allow connection from any origin
})

const rooms = new Map() /////rooms map

// io.on('connection');
io.on('connection', (socket) => {
	console.log(socket.id, 'connected')
})

server.listen(port, () => {
	console.log(`listening on *:${port}`)
})
