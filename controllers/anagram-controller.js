const roomsMap = require("../roomsDatabase");
const { anagramTime, getRoomIdFromSocket } = require("../utils");
const io = require("../server");

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
    socket.emit("correctAttempt");
    io.ioObject
      .in(roomId)
      .emit(
        "gameScroll",
        "system",
        `${socket.data.username} got ${score} points!`
      );
    return score;
  } else {
    socket.emit("incorrectAttempt");
    io.ioObject
      .in(roomId)
      .emit(
        "gameScroll",
        "system",
        `${socket.data.username} guessed incorrectly`
      );
  }
};

const testAllPlayersGuessedCorrectly = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);
  if (roomData) {
    return roomData.players.every((player) => player.correct || player.skipped);
  }
};

const increaseRoomCurrentWord = (roomId) => {
  const roomData = roomsMap.get(roomId);
  roomData.currentWord++;
  if (roomData.currentWord % 3 === 0 && roomData.currentWord !== 0) {
    roomData.round.round++;
    roomData.round.anagram = 1;
  } else {
    roomData.round.anagram++;
  }
  roomsMap.set(roomData.roomId, roomData);
  return roomData.round;
};

const calculateScore = (time, hints) => {
  const timeUsed = anagramTime - time;
  const score = 1000 - timeUsed * (1000 / anagramTime) - hints * 100;
  if (score && score > 0) {
    return Math.floor(score);
  } else {
    return 0;
  }
};

const setAnagrams = (roomId, anagrams) => {
  const roomData = roomsMap.get(roomId);
  roomData.anagrams = anagrams;
  roomsMap.set(roomData.roomId, roomData);
};

module.exports = {
  testAttempt,
  testAllPlayersGuessedCorrectly,
  increaseRoomCurrentWord,
  calculateScore,
  setAnagrams,
};
