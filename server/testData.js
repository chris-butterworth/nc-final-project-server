const templatePlayerObject = {
	id: 0,
	username: '',
	avatar: '',
	avatar_alt: '',
	readyToStartGame: false,
	score: 0, // just for this word
	totalScore: 0, // for the whole game
	correct: false,
	skipped: false,
}

const templateAnagrams = [
	{
		question: 'IODINE TOTEM',
		answer: 'NO TIME TO DIE',
		category: 'Films',
		subcategory: 'Action & Adventure',
	},
	{
		question: 'HIGHEST INN',
		answer: 'THE SHINING',
		category: 'Books',
		subcategory: 'Horror',
	},
	{
		question: 'BOTH BE HIT',
		answer: 'THE HOBBIT',
		category: 'Books',
		subcategory: 'Fantasy',
	},
	{
		question: 'HE HIT BELLBOY',
		answer: 'THE HOLY BIBLE',
		category: 'Book',
		subcategory: 'Religion & Spirituality',
	},
	{
		question: 'IN DRAMA KHAKIS',
		answer: 'KIM KARDASHIAN',
		category: 'People',
		subcategory: 'Film & Television',
	},
	{
		question: 'AM A BACK BOAR',
		answer: 'BARACK OBAMA',
		category: People,
		subcategory: 'Politics & History',
	},
	{
		question: 'CORSICA NYMPHAE',
		answer: 'AMERICAN PSYCHO',
		category: 'Books',
		subcategory: 'Horror',
	},
	{
		question: 'TEEN HELL RIO',
		answer: 'ONE TREE HILL',
		category: 'TV Shows',
		subcategory: 'Young Adults',
	},
	{
		question: 'GENT SHEW WIT',
		answer: 'THE WEST WING',
		category: 'TV Shows',
		subcategory: 'Drama',
	},
]

const testRoom = {
	roomId: 'y_xoUWQ',
	timer: 0,
	timerInterval: null,
	anagrams: templateAnagrams,
	currentWord: 8,
	round: { round: 3, anagram: 3 },
	players: [
		{
			id: '1',
			username: 'user1',
			avatar: '/src/assets/lightAvatars/personA.jpeg',
			avatar_alt: '',
			readyToStartGame: true,
			score: 11,
			totalScore: 1111,
		},
		{
			id: '2',
			username: 'user2',
			avatar: '/src/assets/lightAvatars/personB.jpeg',
			avatar_alt: '',
			readyToStartGame: true,
			score: 22,
			totalScore: 2222,
		},
		{
			id: '3',
			username: 'user3',
			avatar: '/src/assets/lightAvatars/personC.jpeg',
			avatar_alt: '',
			readyToStartGame: true,
			score: 33,
			totalScore: 3333,
		},
	],
}

module.exports = { templateAnagrams, templatePlayerObject, testRoom }
