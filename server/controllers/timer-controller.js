const roomsMap = require("../roomsDatabase");
const io = require("../server.js");

const {
  startTimer,
  killTimer,
  nextWord,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
  numOfWords,
  populateScoreboard,
  resetGame,
} = require("../utils/gameUtils");

const startGame = (roomId) => {
  const roomData = roomsMap.get(roomId);

  populateScoreboard(roomId);
  io.ioObject.in(roomId).emit("betweenWordsCountdown", timeBetweenWords);
  io.ioObject
    .in(roomId)
    .emit("fullScreenCustomDialog", "Game starting. First word coming up...");
  startTimer(timeBetweenWords, roomId, anagramTimer);
};
const endGame = (roomId) => {
  const roomData = roomsMap.get(roomId);
  io.ioObject.in(roomId).emit("endGame", roomData.anagrams);
  resetGame(roomId);
  // io.ioObject.in(roomId).emit("fullScreenCustomDialog", "Game Over!");
};

const anagramTimer = (roomId) => {
  const roomData = roomsMap.get(roomId);

  io.ioObject
    .in(roomId)
    .emit(
      "anagram",
      anagramTime,
      roomData.anagrams[roomData.currentWord].question,
      roomData.anagrams[roomData.currentWord].answer,
      roomData.round
    );

  startTimer(
    anagramTime,
    roomId,
    roomData.currentWord <= 1
      ? betweenWordTimer
      : (roomData.currentWord + 1) % 3 === 0
      ? betweenRoundTimer
      : betweenWordTimer
  );
};

const betweenWordTimer = (
  roomId,
  message = "Next word coming up..........."
) => {
  const roomData = roomsMap.get(roomId);
  const lastWordAnswer = roomData.anagrams[roomData.currentWord].answer;

  if (roomData.currentWord === numOfWords - 1) {
    endGame(roomId);
    return;
  }

  io.ioObject.in(roomId).emit("betweenWordsCountdown", timeBetweenWords);
  io.ioObject
    .in(roomId)
    .emit("fullScreenCustomDialog", message, `Last Answer: ${lastWordAnswer}`);

  startTimer(timeBetweenWords, roomId, anagramTimer, nextWord);
};

const betweenRoundTimer = (roomId) => {
  const roomData = roomsMap.get(roomId);
  const lastWordAnswer = roomData.anagrams[roomData.currentWord].answer;
  if (roomData.currentWord === numOfWords - 1) {
    endGame(roomId);
    return;
  }

  const lastRoundAnswers = roomData.anagrams.filter((anagram, index) => {
    if (index <= roomData.currentWord && index > roomData.currentWord - 3)
      return anagram;
  });

  io.ioObject.in(roomId).emit("betweenRoundsCountdown", timeBetweenRounds);

  io.ioObject
    .in(roomId)
    .emit(
      "fullScreenCustomDialog",
      "Take a little break, here are the scores from the last 3 words",
      `Last Answer: ${lastWordAnswer}`,
      lastRoundAnswers
    );
  startTimer(timeBetweenRounds, roomId, anagramTimer, nextWord);
};

module.exports = {
  startGame,
  endGame,
  anagramTimer,
  betweenWordTimer,
  betweenRoundTimer,
};