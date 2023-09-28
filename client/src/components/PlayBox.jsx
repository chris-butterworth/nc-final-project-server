import {
	Paper,
	Box,
	Button,
	Typography,
	useMediaQuery,
	Grid,
} from '@mui/material'
import { ModeContext } from '../context/Mode'
import { useContext } from 'react'

import findHintIndices from '../utils/findHintIndices'
import findReenableButton from '../utils/findReenableButton'
export const PlayBox = ({
	anagramWords,
	setAnagramWords,
	formattedAnswerArray,
	setFormattedAnswerArray,
	gameMessage,
	disabledButtons,
	setDisabledButtons,
	roundNumber,
	anagramNumber,
	category,
	skippedOrCorrect,
	hint,
	hintCount,
	setHintCount,
	hints,
	setHints,
	subcategory,
}) => {
	const { mode, setMode } = useContext(ModeContext)
	const isMobile = useMediaQuery((mode) => mode.breakpoints.down('sm'))

	const handleClearButtonClick = () => {
		// Hint buttons stay disabled after clear
		setDisabledButtons(() => {
			return hints.map((hint) => {
				return {
					wordIndex: hint.questionWordIndex,
					letterIndex: hint.questionLetterIndex,
					letter: hint.letter,
				}
			})
		})
		// Hinted letters stay in the formattedAnswerArray on clear
		setFormattedAnswerArray((current) => {
			// Empty nested answer array
			const hintsOnly = current.map((word) => {
				return word.map(() => {
					return ''
				})
			})
			// For each hint, add this hint to the empty nested answer array in the correct position
			hints.forEach((hint) => {
				hintsOnly[hint.answerWordIndex][hint.answerLetterIndex] = hint.letter
			})
			return hintsOnly
		})
	}

	const handleAttempt = (questionLetter, wordIndex, letterIndex) => {
		const updatedArray = [...formattedAnswerArray]
		for (let i = 0; i < updatedArray.length; i++) {
			for (let j = 0; j < updatedArray[i].length; j++) {
				if (updatedArray[i][j] === '') {
					updatedArray[i][j] = questionLetter
					setFormattedAnswerArray(updatedArray)
					const newDisabledButtons = [...disabledButtons]
					newDisabledButtons.push({
						wordIndex,
						letterIndex,
						letter: questionLetter,
					})
					setDisabledButtons(newDisabledButtons)
					return // Exit the function after adding the letter
				}
			}
		}
	}

	const handleHintButtonClick = () => {
		if (hintCount <= 2) {
			//Split the full answer into a nested array of letters
			const fullAnswerWords = hint.split(' ')
			const fullAnswerArray = fullAnswerWords.map((word) => {
				return word.split('')
			})
			// Find the word and letter indices for the first incorrect letter, as well as the button to add to the disabled buttons, as well as the button to remove from the disabled buttons
			const foundHintIndices = findHintIndices(
				formattedAnswerArray,
				fullAnswerArray,
				anagramWords,
				disabledButtons
			)
			const [
				{ answerWord, answerLetter, correctLetter },
				{ disableWordIndex, disableLetterIndex, disableLetter },
			] = foundHintIndices
			// Add hinted button to the disabled buttons array
			setDisabledButtons((currentlyDisabled) => {
				return [
					...currentlyDisabled,
					{
						wordIndex: disableWordIndex,
						letterIndex: disableLetterIndex,
						letter: disableLetter,
					},
				]
			})
			// Update the Formatted Answer Array to include the correct letter
			const updatedArray = [...formattedAnswerArray]
			updatedArray[answerWord][answerLetter] = correctLetter
			setFormattedAnswerArray(updatedArray)
			// Check if there is a button to reenable (if the hint swapped out another button)
			if (foundHintIndices.length === 3) {
				const reenableLetter = foundHintIndices[2]
				//remove the reenable button from the disabled buttons array
				const buttonToReenableIndex = findReenableButton(
					reenableLetter,
					disabledButtons
				)
				setDisabledButtons((currentlyDisabled) => {
					const remainingDisabledButtons = []
					currentlyDisabled.forEach((button, index) => {
						if (index !== buttonToReenableIndex) {
							remainingDisabledButtons.push(button)
						}
					})
					return remainingDisabledButtons
				})
			}
			if (foundHintIndices.length > 3) {
				const reenableLetter = foundHintIndices[2]
				const buttonToReenableIndex = findReenableButton(
					reenableLetter,
					disabledButtons
				)
				setDisabledButtons((currentlyDisabled) => {
					const remainingDisabledButtons = []
					currentlyDisabled.forEach((button, index) => {
						if (index !== buttonToReenableIndex) {
							remainingDisabledButtons.push(button)
						}
					})
					return remainingDisabledButtons
				})

				// Only enters this if block if there is a letter to remove from later in the array
				const { removeWord, removeLetter } = foundHintIndices[3]
				// Gets the word and letter index of the letter to remove from formattedAnswerArray
				setFormattedAnswerArray((prev) => {
					// Creates a new formattedAnswerArray
					const newFormattedAnswer = []
					for (let i = 0; i < prev.length; i++) {
						const newFormattedWord = []
						for (let j = 0; j < prev[i].length; j++) {
							// If this is the letter we want to remove, we push an empty string to our new array in its place
							if (removeWord === i && removeLetter === j) {
								newFormattedWord.push('')
							} else {
								// If this is any other letter, we push the current letter into the new formattedAnswerArray
								newFormattedWord.push(prev[i][j])
							}
						}
						// Push each word into the full newFormattedAnswer array once completed
						newFormattedAnswer.push(newFormattedWord)
					}
					// Return our newFormattedAnswer array
					return newFormattedAnswer
				})
			}
			// Increase hintCount by 1
			setHintCount((prev) => {
				return prev + 1
			})
			// Update hints array
			setHints((previousHints) => {
				return [
					...previousHints,
					{
						letter: correctLetter,
						questionWordIndex: disableWordIndex,
						questionLetterIndex: disableLetterIndex,
						answerWordIndex: answerWord,
						answerLetterIndex: answerLetter,
					},
				]
			})
		}
	}

	const renderWord = (word, wordIndex) => (
		<Paper
			key={`word-${wordIndex}`}
			sx={{
				margin: '1em',
				display: 'flex',
			}}
		>
			{Array.from(word.toUpperCase()).map((questionLetter, letterIndex) => (
				<Box key={`letter-${letterIndex}`}>
					<Button
						className={`button anagram-button ${
							formattedAnswerArray &&
							formattedAnswerArray[wordIndex] &&
							formattedAnswerArray[wordIndex][letterIndex] !== ''
								? 'disabled'
								: ''
						}`}
						sx={{
							backgroundColor:
								mode.palette.mode === 'light' ? '#cdf0a9' : '#000000',
							padding: '0',
							minWidth: '40px',
							border: '0.1em solid #B8ADA0',
						}}
						onClick={() =>
							handleAttempt(questionLetter, wordIndex, letterIndex)
						}
						disabled={
							disabledButtons.some(
								(btn) =>
									btn.wordIndex === wordIndex && btn.letterIndex === letterIndex
							) || skippedOrCorrect
						}
					>
						{questionLetter}
					</Button>
				</Box>
			))}
		</Paper>
	)

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					minWidth: '25vw',
					minHeight: '2vh',
					margin: '1em',
					padding: '0.5em',
					paddingLeft: isMobile ? '0.7m' : '2em',
					paddingRight: isMobile ? '0.7em' : '2em',
					textAlign: 'center',
					justifyContent: 'space-between',
					backgroundColor:
						mode.palette.mode === 'light' ? '#e4dfda' : '#252b32',
					borderRadius: '0.5em',
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
				}}
			>
				<Grid
					container
					spacing={2}
					sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}
				>
					<Grid item>
						<Button
							onClick={handleClearButtonClick}
							disabled={
								skippedOrCorrect ||
								anagramWords.length === 0 ||
								disabledButtons.length === 0
							}
							variant="contained"
							sx={{
								backgroundColor:
									mode.palette.mode === 'light' ? '#ef476f' : '#EE0000',
								color: mode.palette.mode === 'light' ? '#fff' : '#fff',
								margin: isMobile ? '0.5em 0' : '0.5em',
							}}
						>
							Clear
						</Button>
					</Grid>
					<Grid item>
						<Button
							onClick={handleHintButtonClick}
							disabled={
								skippedOrCorrect || anagramWords.length === 0 || hintCount === 3
							}
							sx={{
								backgroundColor:
									mode.palette.mode === 'light' ? '#ef476f' : '#EE0000',
								color: mode.palette.mode === 'light' ? '#fff' : '#fff',
								margin: isMobile ? '0.5em 0' : '0.5em',
							}}
						>
							Hint ({3 - hintCount})
						</Button>
					</Grid>

					<Grid item sx={{ flexDirection: 'column' }}>
						<Typography sx={{ padding: '5px' }}>
							Round: {roundNumber}.
						</Typography>
						<Typography sx={{ padding: '5px' }}>
							Word: {anagramNumber}.
						</Typography>
					</Grid>
					<Grid item sx={{ flexDirection: 'column' }}>
						<Typography sx={{ padding: '5px' }}>
							Category: {category}
						</Typography>
						<Typography sx={{ padding: '5px' }}>
							Subcategory: {subcategory}
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<Paper
				className="solution-container"
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					paddingBottom: '1em',
					paddingTop: '1em',
					justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				{formattedAnswerArray &&
					formattedAnswerArray.map((answerWord, wordIndex) => (
						<Paper
							key={`answer-word-${wordIndex}`}
							sx={{
								display: 'flex',
								border: '0.1em solid #B8ADA0',
								marginTop: '0.5em',
								marginBottom: '0.5em',
								marginLeft: '1em',
							}}
						>
							{answerWord.map((answerLetter, letterIndex) => (
								<Box
									key={`answer-letter-${letterIndex}`}
									sx={{
										border: '0.1em solid #B8ADA0',
										borderRadius: '0.5em',
										// padding: mode.palette.mode === 'light' ? '' : 'auto',
                    padding: '0',
                    margin:'0',
                    minWidth: '40px',
                    height: '2.5em',
                    display: 'block',
									}}
								>
									{answerLetter !== '' ? (
										<Button
											sx={{
												padding: '0',
                        margin: '0',
												minWidth: '40px',
												height: mode.palette.mode === 'light' ? '100%' : 'auto',
												border: '0.1em solid #B8ADA0',
											}}
										>
											{answerLetter}
										</Button>
									) : (
										<Box
											sx={{
                        padding: '0',
                        margin:'0',
                        minWidth: '40px',
												height: '2.5em',
												display: 'block',
											}}
										></Box>
									)}
								</Box>
							))}
						</Paper>
					))}
			</Paper>
			<Paper
				className="question-container"
				sx={{
					marginTop: '1em',
					display: 'flex',
					paddingBottom: '1em',
					paddingTop: '1em',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				{anagramWords.map((anagramWord, wordIndex) =>
					renderWord(anagramWord, wordIndex)
				)}
			</Paper>
		</>
	)
}
