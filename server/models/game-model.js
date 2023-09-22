const getAnagrams = (socket) => {
  const roomId = getRoomIdFromSocket(socket);
  const room = roomsMap.get(roomId);
  getNineAnagrams()
    .then((anagrams) => {
      console.log(anagrams);
      room.anagrams = anagrams;
      updateRoomsMap(room);
    })
    .catch(({ code }) => {
      console.log(code);
    });
};
