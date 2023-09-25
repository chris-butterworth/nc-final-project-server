const roomsMap = require("../roomsDatabase");
const { getRoomIdFromSocket } = require("../utils");

const io = require("../server.js");

const playerReady = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const roomData = roomsMap.get(roomId);

  roomData.players.forEach((player) => {
    if (player.id === socket.id) {
      player.readyToStartGame = true;
    }
  });
};

const pushPlayerlistToClients = (roomId) => {
  const roomData = roomsMap.get(roomId);
  io.ioObject.in(roomId).emit("updatePlayers", roomData.players);
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

  roomsMap.set(roomData.roomId, roomData);
};

const removePlayerFromRoom = (roomId, socketId) => {
  const roomData = roomsMap.get(roomId);
  roomData.players.filter((player) => {
    player.id !== socketId;
  });
  roomsMap.set(roomData.roomId, roomData);
};

module.exports = {
  playerReady,
  pushPlayerlistToClients,
  updatePlayerScore,
  removePlayerFromRoom,
};
