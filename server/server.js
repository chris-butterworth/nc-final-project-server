const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const {
  createNewRoom,
  joinMultiPlayerRoom,
  getRoomIdFromSocket,
  playerReady,
  testAttempt,
  testAllPlayersGuessedCorrectly,
} = require("./gameFunctions.js");
const roomsMap = require("./roomsDatabase");

const { startGame } = require("./gameServer.js");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: "*",
});

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
    socket.to(roomId).emit("updatePlayers", response.players);
    callback(response);
  });

  socket.on("playerReady", () => {
    const roomPlayers = playerReady(socket, startGame);
    io.in(getRoomIdFromSocket(socket)).emit("updatePlayers", roomPlayers);
  });

  socket.on("anagramAttempt", (attempt) => {
    const isCorrect = testAttempt(socket, attempt);
    if (isCorrect) {
      socket.emit("correctAttempt");
      io.in(roomId).emit(
        "gameScroll",
        `${socket.data.username} guessed correctly`
      );
    } else {
      socket.emit("incorrectAttempt");
      io.in(roomId).emit(
        "gameScroll",
        `${socket.data.username} guessed incorrectly`
      );
    }
    testAllPlayersGuessedCorrectly(socket);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;
