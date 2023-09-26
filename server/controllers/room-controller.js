const { v4: uuidv4 } = require("uuid");
const roomsMap = require("../roomsDatabase");
const { templateAnagrams, templatePlayerObject } = require("../testData");
const { pushPlayerlistToClients } = require("./player-controller");

const resetReadyStateAndCurrentWord = (roomId) => {
  const roomData = roomsMap.get(roomId);
  roomData.players.forEach((player) => {
    player.readyToStartGame = false;
  });
  roomData.currentWord = 0;
  roomData.round = { round: 1, anagram: 1 };
};

const createNewRoom = (socket, callback) => {
  const roomId = `${uuidv4().slice(0, 5)}`;

  roomsMap.set(roomId, {
    roomId,
    timer: 0,
    timerInterval: null,
    anagrams: templateAnagrams,
    currentWord: 0,
    round: { round: 1, anagram: 1 },
    players: [
      {
        ...templatePlayerObject,
        id: socket.id,
        username: socket.data?.username,
        avatar: socket.data?.avatar,
      },
    ],
  });

  socket.join(roomId);
  callback(roomsMap.get(roomId));
  return roomId;
};

const joinMultiPlayerRoom = (socket, roomId, callback) => {
  const roomData = roomsMap.get(roomId);
  const roomUpdate = {
    ...roomData,
    players: [
      ...roomData.players,
      {
        ...templatePlayerObject,
        id: socket.id,
        username: socket.data?.username,
        avatar: socket.data?.avatar
      },
    ],
  };
  roomsMap.set(roomId, roomUpdate);
  pushPlayerlistToClients(roomId)
  socket.join(roomId);
  socket.data.roomId = roomId;
  callback(roomUpdate);
};

const populateScoreboard = (roomId) => {
  const roomData = roomsMap.get(roomId);
  roomData.anagrams.forEach((anagram) => {
    anagram.scores = roomData.players.map((user) => {
      return { username: user.username, score: 0, isSolved: false };
    });
  });
  roomsMap.set(roomData.roomId, roomData);
};

const deleteEmptyRoom = (roomId) => {
  const roomData = roomsMap.get(roomId);
  if (roomData && roomData.players.length === 0) {
    roomsMap.delete(roomId);
  }
};

module.exports = {
  resetReadyStateAndCurrentWord,
  createNewRoom,
  joinMultiPlayerRoom,
  populateScoreboard,
  deleteEmptyRoom,
};
