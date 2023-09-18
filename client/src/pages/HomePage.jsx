import { Box } from '@mui/material'
import PlayerSelector from '../components/PlayerSelector'
import Login from './Login'
import GamePageGrid from './GamePageGrid'

const HomePage = ({ room, setRoom, username, setUsername }) => {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			{username ? (
				room ? (
					<GamePageGrid />
				) : (
					<PlayerSelector room={room} setRoom={setRoom} />
				)
			) : (
				<Login setUsername={setUsername} />
			)}
		</Box>
	)
}

export default HomePage
