const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const {
  roomsMap,
  createNewRoom,
  joinMultiPlayerRoom,
} = require("./gameFunctions.js");

const app = express(); // initialize express

const server = http.createServer(app);

// set port to value received from environment variable or 8080 if null
const port = process.env.PORT || 8080;

// upgrade http server to websocket server
const io = new Server(server, {
  cors: "*", // allow connection from any origin
});

const rooms = new Map(); /////rooms map

// io.on('connection');
io.on("connection", (socket) => {
  socket.on("username", (username) => {
    console.log(socket.id, "=", username);
    socket.data.username = username;
  });

  socket.on("createSinglePlayerRoom", async (callback) => {
    const roomId = `sp${socket.id}`;
    await socket.join(roomId);
    createNewRoom(socket, roomId);
    callback(roomsMap.get(roomId));
  });
  socket.on("createMultiPlayerRoom", async (callback) => {
    const roomId = `mp${socket.id}`;
    await socket.join(roomId);
    createNewRoom(socket, roomId);
    callback(roomsMap.get(roomId));
  });

  socket.on("joinMultiPlayerRoom", async (roomId, callback) => {
    const response = joinMultiPlayerRoom(socket, roomId);

    if (response.error) {
      callback(response);
      return;
    }

    await socket.join(roomId);

    socket.to(roomId).emit("playerJoined", roomUpdate.players);

    callback(response);
  });

  socket.on("startTimerRequest", () => {
    let roomId;
    socket.rooms.forEach((socketRoom) => {
      if (rooms.has(socketRoom)) roomId = socketRoom;
    });
    io.in(roomId).emit("startTimer");
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
