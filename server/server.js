const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const {
  roomsMap,
  createNewRoom,
  joinMultiPlayerRoom,
  getRoomIdFromSocket,
  playerReady,
  serverTimer,
  updateRoomsMap,
  nextWord,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
  numOfWords,
} = require("./gameFunctions.js");

const {
  startGameTimer,
  anagramTimer,
  betweenWordTimer,
  betweenRoundTimer,
} = require("./gameServer.js");

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
    const roomPlayers = playerReady(socket, startGameTimer);
    io.in(getRoomIdFromSocket(socket)).emit("updatePlayers", roomPlayers);
  });

  socket.on("anagramAttempt", (attempt) => {
    const attemptString = attempt
      .map((word) => {
        return word.join("");
      })
      .join(" ");

    const roomId = getRoomIdFromSocket(socket);
    const roomData = roomsMap.get(roomId);
    if (
      attemptString.toLowerCase() ===
      roomData.anagrams[roomData.currentWord - 1].answer.toLowerCase()
    ) {
      socket.emit("correctAttempt");
      roomData.anagrams[roomData.currentWord - 1].scores.push(
        socket.data.username
      );
      updateRoomsMap(roomData);
      io.in(roomId).emit(
        "gameScroll",
        `${socket.data.username} guessed correctly`
      );

      if (roomData.anagrams[0].scores.length === roomData.players.length) {
        betweenWordTimer(roomId, "All players guessed correctly");
      }
    } else {
      socket.emit("incorrectAttempt");
      io.in(roomId).emit(
        "gameScroll",
        `${socket.data.username} guessed incorrectly`
      );
    }
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;