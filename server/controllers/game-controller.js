const roomsMap = require('../roomsDatabase')
const io = require('../server.js')
const { timeBetweenRounds, timeBetweenWords, anagramTime } = require('../utils')

const startGameEmit = (roomId) => {
	io.ioObject.in(roomId).emit('betweenWordsCountdown', timeBetweenWords)
	io.ioObject
		.in(roomId)
		.emit('fullScreenCustomDialog', 'Game starting. First word coming up...')
}

const endGameEmit = (roomId) => {
	const roomData = roomsMap.get(roomId)
	io.ioObject.in(roomId).emit('endGame', roomData.anagrams)
}

const anagramStageEmit = (roomId) => {
	const roomData = roomsMap.get(roomId)
	io.ioObject
		.in(roomId)
		.emit(
			'anagram',
			anagramTime,
			roomData.anagrams[roomData.currentWord].question,
			roomData.anagrams[roomData.currentWord].answer,
			roomData.round,
			roomData.anagrams[roomData.currentWord].category,
			roomData.anagrams[roomData.currentWord].subcategory
		)
}

const betweenWordStageEmit = (roomId, message = 'Next word coming up...') => {
	const roomData = roomsMap.get(roomId)
	const lastWordAnswer = roomData.anagrams[roomData.currentWord].answer

	io.ioObject.in(roomId).emit('betweenWordsCountdown', timeBetweenWords)
	io.ioObject
		.in(roomId)
		.emit('fullScreenCustomDialog', message, `Last Answer: ${lastWordAnswer}`)
}

const betweenRoundStageEmit = (roomId) => {
	const roomData = roomsMap.get(roomId)
	const lastWordAnswer = roomData.anagrams[roomData.currentWord].answer

	const lastRoundAnswers = roomData.anagrams.filter((anagram, index) => {
		if (index <= roomData.currentWord && index > roomData.currentWord - 3)
			return anagram
	})

	lastRoundAnswers.forEach((anagram) => {
		anagram.scores.sort((a, b) => {
			return b.score - a.score
		})
	})
	console.log(lastRoundAnswers)
	io.ioObject.in(roomId).emit('betweenRoundsCountdown', timeBetweenRounds)
	io.ioObject
		.in(roomId)
		.emit(
			'fullScreenCustomDialog',
			'Take a little break...',
			`Last Answer: ${lastWordAnswer}`,
			lastRoundAnswers
		)
}

//socket.on(updatescore, (auth.key))

//player list.find matching socketid list, grab score
module.exports = {
	startGameEmit,
	endGameEmit,
	anagramStageEmit,
	betweenWordStageEmit,
	betweenRoundStageEmit,
}
