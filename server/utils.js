const roomsMap = require("./roomsDatabase");

const numOfWords = 9;
const timeBetweenWords = 3;
const timeBetweenRounds = 10;
const anagramTime = 10;

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
