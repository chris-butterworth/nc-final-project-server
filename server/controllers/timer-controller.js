const roomsMap = require("../roomsDatabase");
const io = require("../server.js");

const {
  serverTimer,
  nextWord,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
  numOfWords,
} = require("../utils/gameUtils");

const startGame = (roomId) => {
  io.ioObject.in(roomId).emit("betweenWordsCountdown", timeBetweenWords);
  io.ioObject
    .in(roomId)
    .emit("gameScroll", "Game starting. First word coming up...");
  serverTimer(timeBetweenWords, roomId, anagramTimer, nextWord);
};

const anagramTimer = (roomId) => {
  const roomData = roomsMap.get(roomId);

  io.ioObject
    .in(roomId)
    .emit(
      "anagram",
      anagramTime,
      roomData.anagrams[roomData.currentWord].anagram,
      roomData.anagrams[roomData.currentWord].answer,
      roomData.round
    );

  serverTimer(
    anagramTime,
    roomId,
    roomData.currentWord <= 1
      ? betweenWordTimer
      : (roomData.currentWord + 1) % 3 === 0
      ? betweenRoundTimer
      : betweenWordTimer
  );
};

const betweenWordTimer = (roomId, message = "Next word coming up...") => {
  const roomData = roomsMap.get(roomId);

  if (roomData.currentWord >= numOfWords) {
    endGame();
    return;
  }

  io.ioObject.in(roomId).emit("betweenWordsCountdown", timeBetweenWords);
  io.ioObject.in(roomId).emit("fullScreenCustomDialog", message);

  serverTimer(timeBetweenWords, roomId, anagramTimer, nextWord);
};

const betweenRoundTimer = () => {
  const roomData = roomsMap.get(roomId);

  if (roomData.currentWord >= numOfWords) {
    endGame();
    return;
  }

  io.ioObject.in(roomId).emit("betweenRoundsCountdown", timeBetweenRounds);
  io.ioObject
    .in(roomId)
    .emit(
      "gameScroll",
      "Take a little break, here are the scores from the last 3 words"
    );
  serverTimer(timeBetweenRounds, roomId, anagramTimer, nextWord);
};

module.exports = {
  startGame,
  anagramTimer,
  betweenWordTimer,
  betweenRoundTimer,
};
