import { useContext } from "react";
import {
  Paper,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
} from "@mui/material";
import { FastForward, Close } from "@mui/icons-material";
import { ModeContext } from "../context/Mode"
import { Toaster } from "react-hot-toast";

const PlayerControls = ({
  handleQuitButtonClick,
  handleSkipButtonClick,
  skippedOrCorrect,
  anagramWords,
}) => {
  console.log(anagramWords, "<<<words in player controls")
  const { mode } = useContext(ModeContext);

  const isMobile = useMediaQuery((mode) => mode.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        minWidth: "25vw",
        minHeight: "5vh",
        margin: "1em",
        padding: "0.5em",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: mode.palette.mode === "light" ? "#e4dfda" : "#252b32",
        borderRadius: "0.5em",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        variant="span"
        sx={{ color: mode.palette.mode === "light" ? "#ef476f" : "#fff" }}
      >
        Player Controls
      </Typography>
      
      <Button
        onClick={handleQuitButtonClick}
        variant="contained"
        sx={{
          
          backgroundColor:
          mode.palette.mode === "light" ? "#ef476f" : "#EE0000",
        color: mode.palette.mode === "light" ? "#fff" : "#fff",
        margin: isMobile ? "0.5em 0" : "0.5em",
        }}
      >
        Quit
      </Button>
      <Button
        onClick={handleSkipButtonClick}
        disabled={skippedOrCorrect || anagramWords.length === 0}
        variant="contained"
        sx={{
          backgroundColor:
            mode.palette.mode === "light" ? "#ef476f" : "#EE0000",
          color: mode.palette.mode === "light" ? "#fff" : "#fff",
          margin: isMobile ? "0.5em 0" : "0.5em",
        }}
      >
        Skip
      </Button>
    </Box>
  );
};

export default PlayerControls;
