const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

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
  console.log(socket.id, "connected");

  socket.on("username", (username) => {
    console.log(username);
    socket.data.username = username;
    console.log(socket.data);
  });

  socket.on("createSinglePlayerRoom", async (callback) => {
    const roomId = `sp${socket.id}`;
    await socket.join(roomId);
    rooms.set(roomId, {
      roomId,
      players: [{ id: socket.id, username: socket.data?.username }],
    });
    callback(roomId);
  });
  socket.on("createMultiPlayerRoom", async (callback) => {
    const roomId = `mp${socket.id}`;
    await socket.join(roomId);
    rooms.set(roomId, {
      roomId,
      players: [{ id: socket.id, username: socket.data?.username }],
    });
    callback(roomId);
  });

  socket.on("joinMultiPlayerRoom", async (roomId, callback) => {
    const room = rooms.get(roomId);
    let error, message;
    if (!room) {
      error = true;
      message = "room does not exist";
    } else if (room.length <= 0) {
      error = true;
      message = "room is empty";
    } else if (room.length >= 10) {
      error = true;
      message = "room is full";
    }

    if (error) {
      callback({ error, message });
      return;
    }

    await socket.join(roomId);

    const roomUpdate = {
      ...room,
      players: [
        ...room.players,
        { id: socket.id, username: socket.data?.username },
      ],
    };

    rooms.set(roomId, roomUpdate);
    callback(roomUpdate);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
