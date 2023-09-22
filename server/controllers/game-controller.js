const roomsMap = require("../roomsDatabase");
const { startGame } = require("../controllers/timer-controller");
const { getRoomIdFromSocket, updateRoomsMap } = require("../utils/gameUtils");
const { betweenWordTimer } = require("./timer-controller");
const io = require("../server.js");

const playerReady = (socket) => {
  const roomId = getRoomIdFromSocket(socket);

  const room = roomsMap.get(roomId);

  room.players.forEach((player) => {
    if (player.id === socket.id) {
      player.readyToStartRound = true;
    }
  });

  io.ioObject
    .in(getRoomIdFromSocket(socket))
    .emit("updatePlayers", room.players);

  let playerReadyStatus = [];
  room.players.forEach((player) => {
    playerReadyStatus.push(player.readyToStartRound);
  });

  if (playerReadyStatus.every((item) => item)) startGame(roomId);
};

const testAttempt = (socket, attempt) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  const attemptString = attempt
    .map((word) => {
      return word.join("");
    })
    .join(" ");

  if (
    attemptString.toLowerCase() ===
    roomData.anagrams[roomData.currentWord - 1].answer.toLowerCase()
  ) {
    roomData.anagrams[roomData.currentWord - 1].scores.push(
      socket.data.username
    );
    updateRoomsMap(roomData);
    socket.emit("correctAttempt");
    io.ioObject
      .in(roomId)
      .emit("gameScroll", `${socket.data.username} guessed correctly`);
  } else {
    console.log("HERE");
    socket.emit("incorrectAttempt");
    io.ioObject
      .in(roomId)
      .emit("gameScroll", `${socket.data.username} guessed incorrectly`);
  }
  testAllPlayersGuessedCorrectly(socket);
};

const testAllPlayersGuessedCorrectly = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  if (
    roomData.anagrams[roomData.currentWord - 1].scores.length ===
    roomData.players.length
  ) {
    betweenWordTimer(roomId, "All players guessed correctly");
  }
};
module.exports = { playerReady, testAttempt, testAllPlayersGuessedCorrectly };
