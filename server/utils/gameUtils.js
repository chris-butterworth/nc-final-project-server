const roomsMap = require("../roomsDatabase");

const numOfWords = 9;
const timeBetweenWords = 3;
const timeBetweenRounds = 10;
const anagramTime = 10;

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

const startTimer = (time, roomId, callback1, callback2) => {
  const secondEvent = () => {
    const roomData = roomsMap.get(roomId);
    roomData.timer = --roomData.timer;
    if (roomData.timer === 0) {
      clearInterval(roomData.timerInterval);
      callback1(roomId);
      if (callback2) callback2(roomId);
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
  roomData.anagrams[roomData.currentWord - 1].scores.forEach((user) => {
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

module.exports = {
  getRoomIdFromSocket,
  updateRoomsMap,
  nextWord,
  calculateScore,
  populateScoreboard,
  updatePlayerScore,
  startTimer,
  killTimer,
  numOfWords,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
};
