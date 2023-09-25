const roomsMap = require("../roomsDatabase");
const io = require("../server");

const gameScrollEmit = (roomId, message) => {
  io.ioObject.in(roomId).emit("gameScroll", message);
};



module.exports = { gameScrollEmit };
