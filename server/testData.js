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

const templateAnagrams = [
  {
    anagram: ["Flip", "Into", "Cup"],
    answer: "Pulp Fiction",
    scores: [],
  },
  { anagram: ["Tied", "Emotion"], answer: "No Time To Die", scores: [] },
  { anagram: ["Highest", "Inn"], answer: "The Shining", scores: [] },
  {
    anagram: ["Flip", "Into", "Cup"],
    answer: "Pulp Fiction",
    scores: [],
  },
  { anagram: ["Tied", "Emotion"], answer: "No Time To Die", scores: [] },
  { anagram: ["Highest", "Inn"], answer: "The Shining", scores: [] },
  {
    anagram: ["Flip", "Into", "Cup"],
    answer: "Pulp Fiction",
    scores: [],
  },
  { anagram: ["Tied", "Emotion"], answer: "No Time To Die", scores: [] },
  { anagram: ["Highest", "Inn"], answer: "The Shining", scores: [] },
];

module.exports = { templateAnagrams, templatePlayerObject };
