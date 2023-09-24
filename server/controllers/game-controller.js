const roomsMap = require("../roomsDatabase");
const { startGame, endGame } = require("../controllers/timer-controller");
const {
  getRoomIdFromSocket,
  calculateScore,
  updatePlayerScore,
  killTimer,
} = require("../utils/gameUtils");
const { betweenWordTimer } = require("./timer-controller");
const io = require("../server.js");

const playerReady = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const room = roomsMap.get(roomId);

  room.players.forEach((player) => {
    if (player.id === socket.id) {
      player.readyToStartGame = true;
    }
  });

  
  io.ioObject
    .in(getRoomIdFromSocket(socket))
    .emit("newGame");
  io.ioObject
    .in(getRoomIdFromSocket(socket))
    .emit("updatePlayers", room.players);

  let playerReadyStatus = [];
  room.players.forEach((player) => {
    playerReadyStatus.push(player.readyToStartGame);
  });

  if (playerReadyStatus.every((item) => item)) startGame(roomId);
};

const testAttempt = (socket, attempt, time, hintCount) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  const attemptString = attempt
    .map((word) => {
      return word.join("");
    })
    .join(" ");

  if (
    attemptString.toLowerCase() ===
    roomData.anagrams[roomData.currentWord].answer.toLowerCase()
  ) {
    const score = calculateScore(time, hintCount);
    updatePlayerScore(roomId, socket.data.username, score);
    pushPlayerlistToClients(roomId);

    socket.emit("correctAttempt");
    io.ioObject
      .in(roomId)
      .emit(
        "gameScroll",
        `${socket.data.username} guessed correctly for ${score} points!`
      );
    testAllPlayersGuessedCorrectly(socket, score);
  } else {
    socket.emit("incorrectAttempt");
    io.ioObject
      .in(roomId)
      .emit("gameScroll", `${socket.data.username} guessed incorrectly`);
    testAllPlayersGuessedCorrectly(socket);
  }
};

const pushPlayerlistToClients = (roomId) => {
  const roomData = roomsMap.get(roomId);
  io.ioObject.in(roomId).emit("updatePlayers", roomData.players);
};

const testAllPlayersGuessedCorrectly = (socket, score = "") => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);

  if (
    roomData.anagrams[roomData.currentWord].scores.every(
      (player) => player.isSolved
    )
  ) {
    killTimer(roomId);
    roomData.currentWord === 8
      ? endGame(roomId)
      : betweenWordTimer(
          roomId,
          `All players guessed correctly, you got ${score} points`
        );
  }
};
module.exports = { playerReady, testAttempt, testAllPlayersGuessedCorrectly };
