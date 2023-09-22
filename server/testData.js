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
    question: ["Flip", "Into", "Cup"],
    answer: "Pulp Fiction",
    category: "film",
    scores: [],
  },
  {
    question: ["Tied", "Emotion"],
    answer: "No Time To Die",
    category: "film",
    scores: [],
  },
  {
    question: ["Highest", "Inn"],
    answer: "The Shining",
    category: "film",
    scores: [],
  },
  {
    question: ["Flip", "Into", "Cup"],
    answer: "Pulp Fiction",
    category: "film",
    scores: [],
  },
  {
    question: ["Tied", "Emotion"],
    answer: "No Time To Die",
    category: "film",
    scores: [],
  },
  {
    question: ["Highest", "Inn"],
    answer: "The Shining",
    category: "film",
    scores: [],
  },
  {
    question: ["Flip", "Into", "Cup"],
    answer: "Pulp Fiction",
    category: "film",
    scores: [],
  },
  {
    question: ["Tied", "Emotion"],
    answer: "No Time To Die",
    category: "film",
    scores: [],
  },
  {
    question: ["Highest", "Inn"],
    answer: "The Shining",
    category: "film",
    scores: [],
  },
];

module.exports = { templateAnagrams, templatePlayerObject };
