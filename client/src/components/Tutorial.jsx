import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'

const Typewriter = ({ text, onComplete }) => {
	const [displayText, setDisplayText] = useState('')

	useEffect(() => {
		const delay = 40 
		let currentIndex = 0

		const typeText = async () => {
			while (text && currentIndex <= text.length) {
				await new Promise((resolve) => setTimeout(resolve, delay))
				setDisplayText(text.slice(0, currentIndex))
				currentIndex++
			}
			onComplete()
		}

		typeText()
	}, [text, onComplete])

	return <Typography variant="body1">{displayText}</Typography>
}

export const Tutorial = () => {
	const linesOfText = [
		'Welcome to the Anagram game!',
		'3 words per round, 3 rounds per game.',
		'Faster you guess, the more points you get!',
		'Click for a more detailed tutorial.',
	]

	const [currentLine, setCurrentLine] = useState(0)
	const [completedLines, setCompletedLines] = useState([])
	const [isTyping, setIsTyping] = useState(true)

	useEffect(() => {
		if (currentLine < linesOfText.length) {
			const lineLength = linesOfText[currentLine].length
			const timeout = setTimeout(() => {
				setCompletedLines((prevLines) => [
					...prevLines,
					linesOfText[currentLine],
				])
				setCurrentLine((prevLine) => prevLine + 1)
			}, (lineLength + 1) * 150) 
			return () => clearTimeout(timeout)
		} else {
			setIsTyping(false)
		}
	}, [currentLine])

	return (
		<div>
			{isTyping ? (
				<Typewriter text={linesOfText[currentLine]} onComplete={() => {}} />
			) : (
				<>
					{completedLines.map((line, index) => (
						<Typography key={index} variant="body1">
							{line}
						</Typography>
					))}
				</>
			)}
		</div>
	)
}
