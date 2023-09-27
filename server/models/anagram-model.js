const { getNineAnagrams } = require("../api");
const { templateAnagrams } = require("../testData");

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
      return templateAnagrams;
    });
};

module.exports = { getAnagrams };
