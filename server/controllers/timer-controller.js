const roomsMap = require("../roomsDatabase");

const startTimer = (time, roomId, callback1, nextWord) => {
  return new Promise((resolve) => {
    const roomData = roomsMap.get(roomId);
    roomData.timer = time;
    roomData.timerInterval = setInterval(secondEvent, 1000, roomId, resolve);
    roomsMap.set(roomId, roomData);
  });
};

const killTimer = (roomId) => {
  const roomData = roomsMap.get(roomId);
  clearInterval(roomData.timerInterval);
};

const secondEvent = (roomId, resolve) => {
  const roomData = roomsMap.get(roomId);
  roomData.timer = --roomData.timer;
  if (roomData.timer <= 0) {
    clearInterval(roomData.timerInterval);
    return resolve();
  }
  roomsMap.set(roomId, roomData);
};

module.exports = {
  startTimer,
  killTimer,
};

