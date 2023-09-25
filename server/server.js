const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const { joinMultiPlayerRoom } = require("./controllers/room-controller.js");

const {
  newSession,
  handleTestAttempt,
  handlePlayerReady,
  handleWebChat,
  handleLeaveRoom,
  handleSkip,
} = require("./app.js");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    console.log("socket", socket.id, "=", username); // Don't delete
    socket.data.username = username;
  });

  socket.on("avatar", (avatar) => {
    console.log("socket", socket.id, "=", socket.data.username, "=", avatar);
    socket.data.avatar = avatar;
  });

  socket.on("createSinglePlayerRoom", async (callback) => {
    newSession(socket, callback);
  });

  socket.on("createMultiPlayerRoom", async (callback) => {
    newSession(socket, callback);
  });

  socket.on("joinMultiPlayerRoom", async (roomId, callback) => {
    joinMultiPlayerRoom(socket, roomId, callback);
  });

  socket.on("playerReady", () => {
    socket.emit("newGame");
    handlePlayerReady(socket);
  });

  socket.on("anagramAttempt", (attempt, time, hintCount) => {
    handleTestAttempt(socket, attempt, time, hintCount);
  });

  socket.on("gameChat", (message) => {
    handleWebChat(socket, message);
  })

  socket.on("leaveRoom", () => {
    handleLeaveRoom(socket);
  });


socket.on("playerSkip", () => {
  handleSkip(socket);
});
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
