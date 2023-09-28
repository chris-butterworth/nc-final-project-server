const roomsMap = require("./roomsDatabase");

const numOfWords = 3;
const timeBetweenWords = 3;
const timeBetweenRounds = 10;
const anagramTime = 120;

const getRoomIdFromSocket = (socket) => {
  let roomId;
  socket.rooms.forEach((socketRoom) => {
    if (roomsMap.has(socketRoom)) roomId = socketRoom;
  });
  return roomId;
};

module.exports = {
  getRoomIdFromSocket,
  numOfWords,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
};

