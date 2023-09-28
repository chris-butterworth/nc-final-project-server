import { useContext, useState } from "react";
import { Typography, Button, Box, useMediaQuery } from "@mui/material";
import { ModeContext } from "../context/Mode";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const PlayerControls = ({
	handleQuitButtonClick,
	handleSkipButtonClick,
	skippedOrCorrect,
	anagramWords,
}) => {
	const { mode } = useContext(ModeContext)

  const isMobile = useMediaQuery((mode) => mode.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				minWidth: '25vw',
				minHeight: '5vh',
				margin: '1em',
				padding: '0.5em',
				paddingLeft: '2em',
				paddingRight: '2em',
				textAlign: 'center',
				justifyContent: 'space-around',

				backgroundColor: mode.palette.mode === 'light' ? '#e4dfda' : '#252b32',
				borderRadius: '0.5em',
				boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
			}}
		>
			<Button
				onClick={handleClickOpen}
				variant="contained"
				sx={{
					backgroundColor:
						mode.palette.mode === 'light' ? '#ef476f' : '#EE0000',
					color: mode.palette.mode === 'light' ? '#fff' : '#fff',
					margin: isMobile ? '0.5em 0' : '0.5em',
				}}
			>
				Quit
			</Button>
			{/* <Typography
				variant="span"
				sx={{ color: mode.palette.mode === 'light' ? '#ef476f' : '#fff' }}
			>
				Player Controls
			</Typography> */}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'QUIT'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to leave the game?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Disagree</Button>
					<Button onClick={handleQuitButtonClick} autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			<Button
				onClick={handleSkipButtonClick}
				disabled={skippedOrCorrect || anagramWords.length === 0}
				variant="contained"
				sx={{
					backgroundColor:
						mode.palette.mode === 'light' ? '#ef476f' : '#EE0000',
					color: mode.palette.mode === 'light' ? '#fff' : '#fff',
					margin: isMobile ? '0.5em 0' : '0.5em',
				}}
			>
				Skip
			</Button>
		</Box>
	)
}

export default PlayerControls
