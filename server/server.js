const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const {
  createNewRoom,
  joinMultiPlayerRoom,
} = require("./controllers/menu-controller.js");

const {
  playerReady,
  testAttempt,
} = require("./controllers/game-controller.js");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    console.log(socket.id, "=", username); // This is a good one
    socket.data.username = username;
  });

  socket.on("createSinglePlayerRoom", async (callback) => {
    createNewRoom(socket, callback);
  });

  socket.on("createMultiPlayerRoom", async (callback) => {
    createNewRoom(socket, callback);
  });

  socket.on("joinMultiPlayerRoom", async (roomId, callback) => {
    joinMultiPlayerRoom(socket, roomId, callback);
  });

  socket.on("playerReady", () => {
    playerReady(socket);
  });

  socket.on("anagramAttempt", (attempt) => {
    testAttempt(socket, attempt);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
