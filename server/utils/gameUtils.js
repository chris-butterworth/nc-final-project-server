const { getAnagrams } = require("../models/game-model");
const roomsMap = require("../roomsDatabase");

const numOfWords = 9;
const timeBetweenWords = 3;
const timeBetweenRounds = 10;
const anagramTime = 60;

const updateRoomsMap = (roomData) => {
  roomsMap.set(roomData.roomId, roomData);
};

const getRoomIdFromSocket = (socket) => {
  let roomId;
  socket.rooms.forEach((socketRoom) => {
    if (roomsMap.has(socketRoom)) roomId = socketRoom;
  });
  return roomId;
};


const nextWord = (roomId) => {
  const room = roomsMap.get(roomId);
  room.currentWord++;
  if (room.currentWord % 3 === 0 && room.currentWord !== 0) {
    room.round.round++;
    room.round.anagram = 1;
  } else {
    room.round.anagram++;
  }
  updateRoomsMap(room);
  return room.round;
};

const startTimer = (time, roomId, callback1, nextWord) => {
  const secondEvent = () => {
    const roomData = roomsMap.get(roomId);
    roomData.timer = --roomData.timer;
    if (roomData.timer === 0) {
      clearInterval(roomData.timerInterval);
      if (nextWord) nextWord(roomId);
      callback1(roomId);
    }
    roomsMap.set(roomId, roomData);
  };
  const roomData = roomsMap.get(roomId);
  roomData.timer = time;
  roomData.timerInterval = setInterval(secondEvent, 1000);
  roomsMap.set(roomId, roomData);
};

const killTimer = (roomId) => {
  const roomData = roomsMap.get(roomId);
  clearInterval(roomData.timerInterval);
};

const calculateScore = (time, hints) => {
  const timeUsed = anagramTime - time;
  const score = 1000 - timeUsed * (1000 / anagramTime) - hints * 100;
  if (score > 0) {
    return Math.floor(score);
  }
};

const updatePlayerScore = (roomId, username, score) => {
  const roomData = roomsMap.get(roomId);
  roomData.anagrams[roomData.currentWord].scores.forEach((user) => {
    if (user.username === username) {
      user.score = score;
      user.isSolved = true;
    }
  });

  roomData.players.forEach((user) => {
    if (user.username === username) {
      user.score = score;
      user.totalScore += score;
    }
  });

  updateRoomsMap(roomData);
};

const populateScoreboard = (roomId) => {
  const room = roomsMap.get(roomId);

  room.anagrams.forEach((anagram) => {
    anagram.scores = room.players.map((user) => {
      return { username: user.username, score: 0, isSolved: false };
    });
  });
  updateRoomsMap(room);
};

const resetGame = (roomId) => {
  const roomData = roomsMap.get(roomId);
  return getAnagrams(roomId).then((anagrams) => {
    roomData.players.forEach((player) => {
      player.readyToStartGame = false;
    });
    roomData.currentWord = 0;
    roomData.round = { round: 1, anagram: 1 };
    roomData.anagrams = anagrams;
    updateRoomsMap(roomData);
  });
};

const setAnagrams = (roomId, anagrams) => {
  const room = roomsMap.get(roomId);
  room.anagrams = anagrams;
  updateRoomsMap(room);
};

module.exports = {
  getRoomIdFromSocket,
  updateRoomsMap,
  nextWord,
  calculateScore,
  populateScoreboard,
  updatePlayerScore,
  startTimer,
  killTimer,
  resetGame,
  setAnagrams,
  numOfWords,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
};
