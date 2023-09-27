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

const ourPersonalAvatars = [
  {
    avatar_alt: "An advanced hamster",
    avatar:
      "https://media.discordapp.net/attachments/1008571088919343124/1153344710786682960/l3x8107_draw_me_an_advanced_hamster_d812a072-2ee6-4ae1-bd23-f08c4355f781.png?width=876&height=876",
    username: "charlotte",
    score: 100000,
    totalScore: 0,
    id: "1OC437RgRH-Bu81NAAAT",
  },
  {
    avatar_alt: "Pudgy Penguin",
    avatar:
      "https://media.discordapp.net/attachments/1008571088919343124/1152177396225679390/l3x8107_5_game_avatars_based_on_pudgy_penguin_3eade88c-1421-4a7f-a8f8-e3e93b4e6104.png?width=876&height=876",
    username: "lex",
    score: 7,
    totalScore: 0,
    id: "ANOTHERID",
  },
  {
    avatar_alt: "Confused Beaver",
    avatar:
      "https://media.discordapp.net/attachments/1008571088919343124/1153345530072682516/l3x8107_a_confused_beaver_wearing_a_thinkers_cap_85cd99e8-ab6a-4d44-a70d-7756460708a4.png?width=876&height=876",
    username: "simon",
    score: 3,

    totalScore: 0,
    id: "IDHERE",
  },
  {
    avatar_alt: "Angel of Death laughing",
    avatar:
      "https://media.discordapp.net/attachments/1008571088919343124/1153609768309633024/l3x8107_an_angel_of_death_in_anime_style_smiling_sardonically_4d91615b-52b2-41d9-b9e4-c40916e16de8.png?width=876&height=876",
    username: "phil",
    score: 42,
    totalScore: 0,
    id: "ANOTHERONE",
  },
  {
    avatar_alt: "Orc holding Simba",
    avatar:
      "https://media.discordapp.net/attachments/1008571088919343124/1153610407550922842/l3x8107_an_orc_holding_simba_on_top_of_pride_rock_b200701e-f66b-4220-8e0d-8e2f638fccda.png?width=876&height=876",
    username: "chris",
    score: 500,
    totalScore: 0,
    id: "MOREID",
  },
];

module.exports = { templateAnagrams, templatePlayerObject, testRoom };
