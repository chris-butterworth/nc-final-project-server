const roomsMap = require("../roomsDatabase");

const { getNineAnagrams } = require("../api");

const getAnagrams = () => {
  return getNineAnagrams()
    .then((anagrams) => {
      anagrams.forEach((anagram) => {
        anagram.scores = [];
        anagram.question = anagram.question.split(" ");
      });
      return anagrams;
    })
    .catch(({ code }) => {
      console.log("getAnagrams error", code);
    });
};

module.exports = { getAnagrams };

