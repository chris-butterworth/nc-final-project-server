
const roomsMap = new Map()


const createNewRoom = (socket, roomId) =>{
    roomsMap.set(roomId, {
    roomId,
    players: [{ id: socket.id, username: socket.data?.username }],
  });
}

const joinMultiPlayerRoom = (socket, room, roomId ) => {
    
    const roomUpdate = {
        ...room,
        players: [
          ...room.players,
          { id: socket.id, username: socket.data?.username },
        ],
      };
  
      roomsMap.set(roomId, roomUpdate);
      return roomUpdate
}

module.exports = {roomsMap, createNewRoom}