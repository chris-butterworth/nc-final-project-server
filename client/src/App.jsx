import { useState, useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { ModeContext } from './context/Mode.jsx'
import { Paper, Button } from '@mui/material'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import TutorialPage from './pages/TutorialPage'
import GamePage from './pages/GamePage'
import GamePageGrid from './pages/GamePageGrid'
import './App.css'
import socket from './socket'
import Login from './pages/Login.jsx'

function App() {
	const { mode } = useContext(ModeContext)
	const [username, setUsername] = useState('')
	const [room, setRoom] = useState('')
	const [players, setPlayers] = useState([])
	console.log(room, 'room')
	return (
		<>
			<ThemeProvider theme={mode}>
				<Paper
					sx={{
						minHeight: '100vh',
						borderRadius: 0,
					}}
				>
					<NavBar />
					<Routes>
						<Route path="/tutorial" element={<TutorialPage />} />
						<Route
							path="/"
							element={
								<HomePage
									room={room}
									setRoom={setRoom}
									username={username}
									setUsername={setUsername}
								/>
							}
						/>
					</Routes>
				</Paper>
			</ThemeProvider>
		</>
	)
}

export default App
