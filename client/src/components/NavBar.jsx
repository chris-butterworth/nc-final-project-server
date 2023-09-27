import { useContext, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { ModeContext } from '../context/Mode.jsx'
import { lightTheme, darkTheme } from '../themes'
import pills from '../assets/red-pill-blue-pill.jpg'
import crayon from '../assets/crayon.png'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.js'
import socket from '../socket.js'
import { Link } from 'react-router-dom'
import Hidden from '@mui/material/Hidden'
import { Typography } from '@mui/material'

const NavBar = ({ username, setUsername, setRoom, room }) => {
	const { mode, setMode } = useContext(ModeContext)
	const [menuOpen, setMenuOpen] = useState(false)

	const handleModeChange = () => {
		if (mode === lightTheme) {
			setMode(darkTheme)
		} else {
			setMode(lightTheme)
		}
	}

	const userSignOut = () => {
		signOut(auth)
			.then(() => {
				setUsername('')
				setRoom('')
				socket.emit('leaveRoom')
			})
			.catch((error) => console.log(error))
	}

	const createRoomURL = () => {
		return `${window.location.origin}?room=${room}`
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: '1em' }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<div>
						<Hidden mdUp>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ height: '40px' }}
								onClick={() => setMenuOpen(!menuOpen)}
							>
								<MenuIcon />
							</IconButton>
						</Hidden>
						<Hidden mdDown>
							<Button component={Link} to="/" variant="text" color="inherit">
								Anagram Game
							</Button>
							<Button
								component={Link}
								to="/thebuild"
								variant="text"
								color="inherit"
							>
								The Build
							</Button>
							<Button
								component={Link}
								to="/leaderboard"
								variant="text"
								color="inherit"
							>
								Leaderboards
							</Button>
						</Hidden>
					</div>
					<div>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ height: '40px' }}
							onClick={handleModeChange}
						>
							{mode.palette.mode === 'dark' ? (
								<Box component="img" sx={{ height: '40px' }} src={crayon} />
							) : (
								<Box
									component="img"
									sx={{ height: '40px', mixBlendMode: 'multiply' }}
									src={pills}
								></Box>
							)}
						</IconButton>
						<Button color="inherit" onClick={userSignOut}>
							{username ? <>Sign Out</> : <>Sign in</>}
						</Button>
					</div>
				</Toolbar>
				<Hidden mdUp>
					{menuOpen && (
						<div style={{ backgroundColor: '#333', padding: '1rem' }}>
							<Button
								component={Link}
								to="/"
								variant="text"
								color="inherit"
								fullWidth
								onClick={() => setMenuOpen(false)}
							>
								Anagram Game
							</Button>
							<Button
								component={Link}
								to="/thebuild"
								variant="text"
								color="inherit"
								fullWidth
								onClick={() => setMenuOpen(false)}
							>
								The Build
							</Button>
							<Button
								component={Link}
								to="/leaderboard"
								variant="text"
								color="inherit"
								fullWidth
								onClick={() => setMenuOpen(false)}
							>
								Leaderboards
							</Button>
							{room ? (
								<Button
									sx={{
										'&hover': { cursor: 'pointer' },
										padding: '0',
										margin: '0',
									}}
									onClick={() => {
										navigator.clipboard.writeText(createRoomURL())
									}}
                  fullWidth
								>
									Copy Room Link
								</Button>
							) : (
								''
							)}
						</div>
					)}
				</Hidden>
			</AppBar>
		</Box>
	)
}

export default NavBar
