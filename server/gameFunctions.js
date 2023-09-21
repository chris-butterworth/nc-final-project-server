const roomsMap = new Map();

const templatePlayerObject = {
  id: 0,
  username: "",
  avatar: "",
  avatar_alt: "",
  readyToStartRound: false,
  isSolved: false,
  score: 0, // just for this word
  totalScore: 0, // for the whole game
};

const createNewRoom = (socket, roomId) => {
  roomsMap.set(roomId, {
    roomId,
    timer: 0,
    anagrams: [
      {
        anagram: ["Flip", "Into", "Cup"],
        answer: "Pulp Fiction",
        scores: [],
      },
      { anagram: ["Tied", "Emotion"], answer: "No Time To Die", scores: [] },
      { anagram: ["Highest", "Inn"], answer: "The Shining", scores: [] },
    ],
    currentWord: 0,
    players: [
      {
        ...templatePlayerObject,
        id: socket.id,
        username: socket.data?.username,
      },
    ],
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
        {
          ...templatePlayerObject,
          id: socket.id,
          username: socket.data?.username,
        },
      ],
    };
    roomsMap.set(roomId, roomUpdate);
    return roomUpdate;
  }
};

const getRoomIdFromSocket = (socket) => {
  let roomId;
  socket.rooms.forEach((socketRoom) => {
    if (roomsMap.has(socketRoom)) roomId = socketRoom;
  });
  return roomId;
};

const playerReady = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const room = roomsMap.get(roomId);
  room.players.forEach((player) => {
    if (player.id === socket.id) {
      player.readyToStartRound = true;
    }
  });
  return room.players;
};

const serverTimer = (time, roomId, callback) => {
  let timer = time;
  const updatedRoom = roomsMap.get(roomId);
  updatedRoom.timer = timer;
  roomsMap.set(roomId, updatedRoom);

  const secondEvent = () => {
    const updatedRoom = roomsMap.get(roomId);
    updatedRoom.timer = --timer;
    roomsMap.set(roomId, updatedRoom);

    if (timer === 0) {
      clearInterval(id);
      callback();
    }
  };
  const id = setInterval(secondEvent, 1000);
};

const getNextAnagram = (roomId) => {
  const room = roomsMap.get(roomId);
  return;
};

const updateRoomsMap = (roomData) => {
  roomsMap.set(roomData.roomId, roomData);
};

module.exports = {
  roomsMap,
  createNewRoom,
  joinMultiPlayerRoom,
  getRoomIdFromSocket,
  playerReady,
  serverTimer,
  updateRoomsMap
};
