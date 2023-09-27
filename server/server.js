const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const {
  newSession,
  handleTestAttempt,
  handlePlayerReady,
  handleWebChat,
  handleLeaveRoom,
  handleSkip,
  handleDisconnect,
  handleJoinMultiPlayerRoom,
} = require("./app.js");
const { testApi } = require("./api.js");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  testApi()
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
    handleJoinMultiPlayerRoom(socket, roomId, callback);
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
  });

  socket.on("leaveRoom", () => {
    handleLeaveRoom(socket);
  });

  socket.on("playerSkip", () => {
    handleSkip(socket);
  });

  socket.on("disconnect", (reason) => {
    console.log(socket.id, "disconnected due to:", reason);
    handleDisconnect(socket);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
