const roomsMap = require('./roomsDatabase')

const {
	setAnagrams,
	testAllPlayersGuessedCorrectly,
	testAttempt,
	increaseRoomCurrentWord,
} = require('./controllers/anagram-controller')
const {
	startGameEmit,
	betweenWordStageEmit,
	anagramStageEmit,
	betweenRoundStageEmit,
	endGameEmit,
} = require('./controllers/game-controller')
const {
	updatePlayerScore,
	playerReady,
	pushPlayerlistToClients,
	removePlayerFromRoom,
	resetCorrectAndSkipped,
} = require('./controllers/player-controller')
const {
	createNewRoom,
	resetReadyStateAndCurrentWord,
	populateScoreboard,
	deleteEmptyRoom,
	joinMultiPlayerRoom,
	getGameScoreFromSocketId,
} = require('./controllers/room-controller')
const { killTimer, startTimer } = require('./controllers/timer-controller')
const { getAnagrams } = require('./models/anagram-model')
const {
	getRoomIdFromSocket,
	anagramTime,
	timeBetweenRounds,
	timeBetweenWords,
	numOfWords,
} = require('./utils')
const { gameScrollEmit } = require('./controllers/im-controller')
const { templateAnagrams } = require('./testData')
const { updateScoreOnDatabase } = require('./api')

const newSession = (socket, callback) => {
	const roomId = createNewRoom(socket, callback)
	socket.data.roomId = roomId
	getAnagrams().then((anagrams) => {
		setAnagrams(roomId, anagrams ? anagrams : templateAnagrams)
	})
}

const resetSession = (roomId) => {
	endGameEmit(roomId)
	resetReadyStateAndCurrentWord(roomId)
	getAnagrams().then((anagrams) => {
		setAnagrams(roomId, anagrams)
	})
}

const handleJoinMultiPlayerRoom = (socket, roomId, callback) => {
	const roomData = roomsMap.get(roomId)
	if (!roomData) {
		callback({ error: true, message: 'Room ID not found' })
		return
	} else if (testEveryPlayerReady(roomId)) {
		callback({ error: true, message: 'Game in progress, cannot join' })
		return
	}
	joinMultiPlayerRoom(socket, roomId, callback)
	pushPlayerlistToClients(roomId)
	gameScrollEmit(roomId, 'system', `${socket.data.username} joined the game`)
}

const handlePlayerReady = (socket) => {
	const roomId = getRoomIdFromSocket(socket)
	playerReady(socket)
	pushPlayerlistToClients(roomId)
	;``
	if (testEveryPlayerReady(roomId)) {
		populateScoreboard(roomId)
		handleStartGame(roomId)
	}
}

const testEveryPlayerReady = (roomId) => {
	const roomData = roomsMap.get(roomId)
	let playerReadyStatus = []
	roomData.players.forEach((player) => {
		playerReadyStatus.push(player.readyToStartGame)
	})
	return playerReadyStatus.every((item) => item)
}

const handleStartGame = async (roomId) => {
	startGameEmit(roomId)
	await startTimer(timeBetweenWords, roomId)
	resetCorrectAndSkipped(roomId)
	pushPlayerlistToClients(roomId)
	anagramStageEmit(roomId)
	await startTimer(anagramTime, roomId)
	nextWord(roomId)
}

const nextWord = async (roomId) => {
	const roomData = roomsMap.get(roomId)
	if (!roomData) return
	if (roomData.round.anagram === 3) {
		betweenRoundStageEmit(roomId)
		await startTimer(timeBetweenRounds, roomId)
	} else {
		betweenWordStageEmit(roomId)
		await startTimer(timeBetweenWords, roomId)
	}
	increaseRoomCurrentWord(roomId)
	resetCorrectAndSkipped(roomId)
	pushPlayerlistToClients(roomId)
	anagramStageEmit(roomId)
	await startTimer(anagramTime, roomId)

	if (roomData.currentWord === numOfWords - 1) {
		resetSession(roomId)
		return
	} else {
		nextWord(roomId)
	}
}

const handleTestAttempt = (socket, attempt, time, hintCount) => {
	const roomId = getRoomIdFromSocket(socket)
	const roomData = roomsMap.get(roomId)
	const result = testAttempt(socket, attempt, time, hintCount)
	if (result) {
		updatePlayerScore(roomId, socket.data.username, result)
		pushPlayerlistToClients(roomId)
		const allPlayersCorrect = testAllPlayersGuessedCorrectly(socket)
		if (allPlayersCorrect && roomData.currentWord === 8) {
			killTimer(roomId)
			resetSession(roomId)
		} else if (allPlayersCorrect) {
			roomData.timer = 2
			roomsMap.set(roomId, roomData)
			gameScrollEmit(
				roomId,
				'system',
				`All players guessed correctly or skipped.`
			)
		}
	}
}

const handleWebChat = (socket, message) => {
	const roomId = getRoomIdFromSocket(socket)
	gameScrollEmit(roomId, socket.data.username, message)
}

const handleLeaveRoom = (socket) => {
	const roomId = getRoomIdFromSocket(socket)

	gameScrollEmit(roomId, 'system', `${socket.data.username} left the game`)
	socket.leave(roomId)
	socket.data.roomId = undefined
	removePlayerFromRoom(roomId, socket.id)
	deleteEmptyRoom(roomId)
	pushPlayerlistToClients(roomId)
	testAllPlayersGuessedCorrectly(socket)
}

const handleDisconnect = (socket) => {
	const roomId = socket.data.roomId
	gameScrollEmit(roomId, 'system', `${socket.data.username} left the game`)
	removePlayerFromRoom(roomId, socket.id)
	deleteEmptyRoom(roomId)
	pushPlayerlistToClients(roomId)
	testAllPlayersGuessedCorrectly(socket)
}

const handleSkip = (socket) => {
	const roomId = getRoomIdFromSocket(socket)
	const roomData = roomsMap.get(roomId)
	roomData.anagrams[roomData.currentWord].scores.forEach((player) => {
		if (player.username === socket.data.username) {
			player.isSolved = true
		}
	})
	roomData.players.forEach((player) => {
		if (player.username === socket.data.username) {
			player.skipped = true
		}
	})
	gameScrollEmit(roomId, 'system', `${socket.data.username} skipped`)
	roomsMap.set(roomId, roomData)
	pushPlayerlistToClients(roomId)

	const allPlayersCorrect = testAllPlayersGuessedCorrectly(socket)
	if (allPlayersCorrect && roomData.currentWord === 8) {
		killTimer(roomId)
		resetSession(roomId)
	} else if (allPlayersCorrect) {
		roomData.timer = 1
		roomsMap.set(roomId, roomData)
		gameScrollEmit(roomId, 'system', `All players guessed or skipped`)
	}
}

const handleUpdateScore = (socket, auth) => {
	const roomId = getRoomIdFromSocket(socket)
	const player = getGameScoreFromSocketId(socket.id, roomId)

	const totalScore = player[0].totalScore
	updateScoreOnDatabase(auth, totalScore)
}

module.exports = {
	newSession,
	handleJoinMultiPlayerRoom,
	handleTestAttempt,
	handlePlayerReady,
	handleWebChat,
	handleLeaveRoom,
	handleSkip,
	handleDisconnect,
	handleUpdateScore,
}
