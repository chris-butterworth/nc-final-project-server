import { TableCell, TableContainer, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const CustomDialog = ({
	open,
	children,
	title,
	contentText,
	secondaryText,
	handleContinue,
}) => {
	return (
		<Dialog
			open={open}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			{' '}
			{/*dialog container*/}
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{' '}
				{/* Main body of modal/dialog */}
				<DialogContentText>
					{' '}
					{/* main text */}
					{contentText}
					{secondaryText}
				</DialogContentText>
				{children} {/* Other content */}
			</DialogContent>
			<DialogActions>
				{' '}
				{/* Dialog action buttons */}
				{/* Force users to make input without option to cancel */}
				{/* <Button onClick={handleClose}>Cancel</Button> */}
			</DialogActions>
		</Dialog>
	)
}

export default CustomDialog
