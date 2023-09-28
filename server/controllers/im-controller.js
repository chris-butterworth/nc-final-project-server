const io = require("../server");

const gameScrollEmit = (roomId, user, message) => {
  io.ioObject.in(roomId).emit("gameScroll", user, message);
};



module.exports = { gameScrollEmit };
