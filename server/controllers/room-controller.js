const roomsMap = require("../roomsDatabase");
const { templateAnagrams, templatePlayerObject } = require("../testData");

const resetReadyStateAndCurrentWord = (roomId) => {
  const roomData = roomsMap.get(roomId);
  roomData.players.forEach((player) => {
    player.readyToStartGame = false;
  });
  roomData.currentWord = 0;
  roomData.round = { round: 1, anagram: 1 };
};

const createNewRoom = (socket, callback) => {
  const roomId = `${socket.id.slice(0, 7)}`;

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

  let error, message;
  if (!roomData) {
    error = true;
    message = "Room ID not found";
  }

  if (error) {
    callback({ error, message });
    return;
  } else {
    const roomUpdate = {
      ...roomData,
      players: [
        ...roomData.players,
        {
          ...templatePlayerObject,
          id: socket.id,
          username: socket.data?.username,
        },
      ],
    };
    roomsMap.set(roomId, roomUpdate);
    socket.join(roomId);
    socket.to(roomId).emit("updatePlayers", roomUpdate.players);
    callback(roomUpdate);
  }
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


module.exports = {
  resetReadyStateAndCurrentWord,
  createNewRoom,
  joinMultiPlayerRoom,
  populateScoreboard,

};
