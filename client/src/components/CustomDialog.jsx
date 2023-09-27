import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CustomDialog = ({
  open,
  children,
  title,
  contentText,
  secondaryText,
  roundScores,
  handleContinue,
}) => {
  return (
    <Dialog
      open={open}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      {" "}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {" "}
        <DialogContentText> </DialogContentText>
        <DialogContentText>{contentText}</DialogContentText>
        <DialogContentText>{secondaryText}</DialogContentText>
        <DialogContentText>{roundScores}</DialogContentText>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions> </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
