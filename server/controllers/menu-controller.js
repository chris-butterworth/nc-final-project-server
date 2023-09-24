const { getAnagrams } = require("../models/game-model");
const roomsMap = require("../roomsDatabase");
const { templateAnagrams, templatePlayerObject } = require("../testData");
const { setAnagrams } = require("../utils/gameUtils");

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
  getAnagrams().then((anagrams) => {
    setAnagrams(roomId, anagrams);
  });
  callback(roomsMap.get(roomId));
};

const joinMultiPlayerRoom = (socket, roomId, callback) => {
  const room = roomsMap.get(roomId);

  let error, message;
  if (!room) {
    error = true;
    message = "Room ID not found";
  } else if (room.length <= 0) {
    error = true;
    message = "Room is empty";
  } else if (room.length >= 10) {
    error = true;
    message = "Room is full";
  }

  if (error) {
    callback({ error, message });
    return;
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
    socket.join(roomId);
    socket.to(roomId).emit("updatePlayers", roomUpdate.players);
    callback(roomUpdate);
  }
};
module.exports = { createNewRoom, joinMultiPlayerRoom };