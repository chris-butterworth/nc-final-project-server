const roomsMap = require("./roomsDatabase");

const numOfWords = 9;
const timeBetweenWords = 1;
const timeBetweenRounds = 1;
const anagramTime = 1;

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
