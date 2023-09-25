const roomsMap = require("./roomsDatabase");

const {
  setAnagrams,
  testAllPlayersGuessedCorrectly,
  testAttempt,
  increaseRoomCurrentWord,
} = require("./controllers/anagram-controller");
const {
  startGameEmit,
  betweenWordStageEmit,
  anagramStageEmit,
  betweenRoundStageEmit,
  endGameEmit,
} = require("./controllers/game-controller");
const {
  updatePlayerScore,
  playerReady,
  pushPlayerlistToClients,
  removePlayerFromRoom,
} = require("./controllers/player-controller");
const {
  createNewRoom,
  resetReadyStateAndCurrentWord,
  populateScoreboard,
  deleteEmptyRoom,
  joinMultiPlayerRoom,
} = require("./controllers/room-controller");
const { killTimer, startTimer } = require("./controllers/timer-controller");
const { getAnagrams } = require("./models/anagram-model");
const {
  getRoomIdFromSocket,
  anagramTime,
  timeBetweenRounds,
  timeBetweenWords,
  numOfWords,
} = require("./utils");
const { gameScrollEmit } = require("./controllers/im-controller");

const newSession = (socket, callback) => {
  const roomId = createNewRoom(socket, callback);
  socket.data.roomId = roomId;
  getAnagrams().then((anagrams) => {
    setAnagrams(roomId, anagrams);
  });
};

const resetSession = (roomId) => {
  endGameEmit(roomId);
  resetReadyStateAndCurrentWord(roomId);
  getAnagrams().then((anagrams) => {
    setAnagrams(roomId, anagrams);
  });
};

const handleJoinMultiPlayerRoom = (socket, roomId, callback) => {
  const roomData = roomsMap.get(roomId);
  console.log(roomId, "<<<<< room id");
  if (!roomData) {
    callback({ error: true, message: "Room ID not found" });
    return;
  } else if (testEveryPlayerReady(roomId)) {
    callback({ error: true, message: "Game in progress, cannot join" });
    return;
  }
  joinMultiPlayerRoom(socket, roomId, callback);
  const playerJoinedMessage = `${socket.data.username} joined the game`;
  gameScrollEmit(roomId, playerJoinedMessage);
};

const handlePlayerReady = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  playerReady(socket);
  pushPlayerlistToClients(roomId);

  if (testEveryPlayerReady(roomId)) {
    populateScoreboard(roomId);
    handleStartGame(roomId);
  }
};

const testEveryPlayerReady = (roomId) => {
  const roomData = roomsMap.get(roomId);
  let playerReadyStatus = [];
  roomData.players.forEach((player) => {
    playerReadyStatus.push(player.readyToStartGame);
  });
  return playerReadyStatus.every((item) => item);
};

const handleStartGame = async (roomId) => {
  startGameEmit(roomId);
  await startTimer(timeBetweenWords, roomId);
  anagramStageEmit(roomId);
  await startTimer(anagramTime, roomId);
  nextWord(roomId);
};

const nextWord = async (roomId) => {
  const roomData = roomsMap.get(roomId);
  if (!roomData) {
    return;
  }
  if (roomData.currentWord < 2 && (roomData.currentWord + 1) % 3 === 0) {
    betweenRoundStageEmit(roomId);
    await startTimer(timeBetweenRounds, roomId);
  } else {
    betweenWordStageEmit(roomId);
    await startTimer(timeBetweenWords, roomId);
  }
  increaseRoomCurrentWord(roomId);
  anagramStageEmit(roomId);
  await startTimer(anagramTime, roomId);

  if (roomData.currentWord === numOfWords - 1) {
    resetSession(roomId);
    return;
  } else {
    nextWord(roomId);
  }
};

const handleTestAttempt = (socket, attempt, time, hintCount) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  const result = testAttempt(socket, attempt, time, hintCount);
  if (result) {
    updatePlayerScore(roomId, socket.data.username, result);
    pushPlayerlistToClients(roomId);
    const allPlayersCorrect = testAllPlayersGuessedCorrectly(socket);
    if (allPlayersCorrect && roomData.currentWord === 8) {
      killTimer(roomId);
      resetSession(roomId);
    } else if (allPlayersCorrect) {
      roomData.timer = 2;
      roomsMap.set(roomId, roomData);
      gameScrollEmit(
        roomId,
        `All players guessed correctly. Ending round early`
      );
    }
  }
};

const handleWebChat = (socket, message) => {
  const roomId = getRoomIdFromSocket(socket);
  const chatMessage = `${socket.data.username}: ${message}`;
  gameScrollEmit(roomId, chatMessage);
};

const handleLeaveRoom = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  socket.leave(roomId);
  socket.data.roomId = undefined;
  removePlayerFromRoom(roomId, socket.id);
  deleteEmptyRoom(roomId);
  pushPlayerlistToClients(roomId);
};

const handleDisconnect = (socket) => {
  const roomId = socket.data.roomId;
  const disconnectMessage = `${socket.data.username} left the game`;
  gameScrollEmit(roomId, disconnectMessage);
  removePlayerFromRoom(roomId, socket.id);
  deleteEmptyRoom(roomId);
  pushPlayerlistToClients(roomId);
};

const handleSkip = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  roomData.anagrams[roomData.currentWord].scores.forEach((player) => {
    if (player.username === socket.data.username) {
      player.isSolved = true;
    }
  });
  const skipMessage = `${socket.data.username} skipped`;
  gameScrollEmit(roomId, skipMessage);
  roomsMap.set(roomId, roomData);

  const allPlayersCorrect = testAllPlayersGuessedCorrectly(socket);
  if (allPlayersCorrect && roomData.currentWord === 8) {
    killTimer(roomId);
    resetSession(roomId);
  } else if (allPlayersCorrect) {
    roomData.timer = 2;
    roomsMap.set(roomId, roomData);
    gameScrollEmit(roomId, `All players guessed or skipped`);
  }
};

module.exports = {
  newSession,
  handleJoinMultiPlayerRoom,
  handleTestAttempt,
  handlePlayerReady,
  handleWebChat,
  handleLeaveRoom,
  handleSkip,
  handleDisconnect,
};
