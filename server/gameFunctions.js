const roomsMap = new Map();

const createNewRoom = (socket, roomId) => {
  roomsMap.set(roomId, {
    roomId,
    players: [{ id: socket.id, username: socket.data?.username }],
  });
};

const joinMultiPlayerRoom = (socket, roomId) => {
  const room = roomsMap.get(roomId);

  let error, message;
  if (!room) {
    error = true;
    message = "room does not exist";
  } else if (room.length <= 0) {
    error = true;
    message = "room is empty";
  } else if (room.length >= 10) {
    error = true;
    message = "room is full";
  }

  if (error) {
    return { error, message };
  } else {
    const roomUpdate = {
      ...room,
      players: [
        ...room.players,
        { id: socket.id, username: socket.data?.username },
      ],
    };
    roomsMap.set(roomId, roomUpdate);
    return roomUpdate;
  }
};

module.exports = { roomsMap, createNewRoom, joinMultiPlayerRoom };
