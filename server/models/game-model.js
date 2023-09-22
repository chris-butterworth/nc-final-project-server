const roomsMap = require("../roomsDatabase");

const { getNineAnagrams } = require("../api");

const getAnagrams = (roomId) => {
  const room = roomsMap.get(roomId);
  getNineAnagrams()
    .then((anagrams) => {
        console.log(anagrams);
      anagrams.forEach((anagram) => {
        anagram.scores = [];
        anagram.question = anagram.question.split(" ");
      });

      room.anagrams = anagrams;
      updateRoomsMap(room);
    })
    .catch(({ code }) => {
      console.log(code);
    });
};

module.exports = { getAnagrams };
