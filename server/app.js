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

const handlePlayerReady = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  playerReady(socket);
  pushPlayerlistToClients(roomId);

  let playerReadyStatus = [];
  roomData.players.forEach((player) => {
    playerReadyStatus.push(player.readyToStartGame);
  });
  if (playerReadyStatus.every((item) => item)) {
    populateScoreboard(roomId);
    handleStartGame(roomId);
  }
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


const handleWebChat =  (socket, message) => {
  const roomId = getRoomIdFromSocket(socket)
  const chatMessage = `${socket.data.username}: ${message}`
  gameScrollEmit(roomId, chatMessage)
}


const handleLeaveRoom = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  socket.leave(roomId);
  removePlayerFromRoom(roomId, socket.id);
  deleteEmptyRoom(roomId);
};


module.exports = {
  newSession,
  handleTestAttempt,
  handlePlayerReady,
  handleWebChat,
  handleLeaveRoom,
};
