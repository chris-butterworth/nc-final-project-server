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

const serverTimer = (time, roomId, callback1, callback2) => {
  let timer = time;
  const updatedRoom = roomsMap.get(roomId);

  updatedRoom.timer = timer;
  roomsMap.set(roomId, updatedRoom);

  const secondEvent = () => {
    const updatedRoom = roomsMap.get(roomId);
    updatedRoom.timer = --timer;
    roomsMap.set(roomId, updatedRoom);

    if (timer === 0) {
      clearInterval(id);
      callback1(roomId);
      if (callback2) callback2(roomId);
    }
  };
  const id = setInterval(secondEvent, 1000);
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

    if ((user.username === username)) {
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

  const blankScoreBoard = room.players.map((user) => {
    return { username: user.username, score: 0, isSolved: false };
  });
  room.anagrams.forEach((anagram) => {
    anagram.scores = blankScoreBoard;
  });

  updateRoomsMap(room);
};

module.exports = {
  getRoomIdFromSocket,
  serverTimer,
  updateRoomsMap,
  nextWord,
  calculateScore,
  populateScoreboard,
  updatePlayerScore,
  numOfWords,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
};
