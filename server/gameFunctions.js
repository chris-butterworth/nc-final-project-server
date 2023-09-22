const roomsMap = require('./roomsDatabase')
const {templateAnagrams, templatePlayerObject} = require('./testData')

const createNewRoom = (socket, roomId) => {
  roomsMap.set(roomId, {
    roomId,
    timer: 0,
    anagrams: templateAnagrams,
    currentWord: 0,
    round: { round: 1, anagram: 1 },
    players: [
      {
        ...templatePlayerObject,
        id: socket.id,
        username: socket.data?.username,
      },
    ],
  });
};

const numOfWords = 9;
const timeBetweenWords = 3;
const timeBetweenRounds = 10;
const anagramTime = 120;

const updateRoomsMap = (roomData) => {
  roomsMap.set(roomData.roomId, roomData);
};

const joinMultiPlayerRoom = (socket, roomId) => {
  const room = roomsMap.get(roomId);

  let error, message;
  if (!room) {
    error = true;
    message = "room does not exist";
  } else if (room.length <= 0) {
    error = true;
    message = "room is empty";
  } else if (room.length >= 10) {
    error = true;
    message = "room is full";
  }

  if (error) {
    return { error, message };
  } else {
    const roomUpdate = {
      ...room,
      players: [
        ...room.players,
        {
          ...templatePlayerObject,
          id: socket.id,
          username: socket.data?.username,
        },
      ],
    };
    roomsMap.set(roomId, roomUpdate);
    return roomUpdate;
  }
};

const getRoomIdFromSocket = (socket) => {
  let roomId;
  socket.rooms.forEach((socketRoom) => {
    if (roomsMap.has(socketRoom)) roomId = socketRoom;
  });
  return roomId;
};

const playerReady = (socket, callback) => {
  const roomId = getRoomIdFromSocket(socket);
  const room = roomsMap.get(roomId);
  room.players.forEach((player) => {
    if (player.id === socket.id) {
      player.readyToStartRound = true;
    }
  });

  let playerReadyStatus = [];
  room.players.forEach((player) => {
    playerReadyStatus.push(player.readyToStartRound);
  });

  if (playerReadyStatus.every((item) => item)) {
    callback(roomId);
  }
  return room.players;
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
    return true;
  } else {
    return false;
  }
};

const testAllPlayersGuessedCorrectly = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  if (roomData.anagrams[0].scores.length === roomData.players.length) {
    betweenWordTimer(roomId, "All players guessed correctly");
  }
};

module.exports = {
  roomsMap,
  createNewRoom,
  joinMultiPlayerRoom,
  getRoomIdFromSocket,
  playerReady,
  serverTimer,
  updateRoomsMap,
  nextWord,
  numOfWords,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
  testAttempt,
  testAllPlayersGuessedCorrectly,
};
