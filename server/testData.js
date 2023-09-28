const templatePlayerObject = {
  id: 0,
  username: "",
  avatar: "",
  avatar_alt: "",
  readyToStartGame: false,
  score: 0, // just for this word
  totalScore: 0, // for the whole game
  correct: false,
  skipped: false,
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

const testRoom = {
  roomId: "y_xoUWQ",
  timer: 0,
  timerInterval: null,
  anagrams: templateAnagrams,
  currentWord: 8,
  round: { round: 3, anagram: 3 },
  players: [
    {
      id: "1",
      username: "user1",
      avatar: "/src/assets/lightAvatars/personA.jpeg",
      avatar_alt: "",
      readyToStartGame: true,
      score: 11,
      totalScore: 1111,
    },
    {
      id: "2",
      username: "user2",
      avatar: "/src/assets/lightAvatars/personB.jpeg",
      avatar_alt: "",
      readyToStartGame: true,
      score: 22,
      totalScore: 2222,
    },
    {
      id: "3",
      username: "user3",
      avatar: "/src/assets/lightAvatars/personC.jpeg",
      avatar_alt: "",
      readyToStartGame: true,
      score: 33,
      totalScore: 3333,
    },
  ],
};

module.exports = { templateAnagrams, templatePlayerObject, testRoom };
