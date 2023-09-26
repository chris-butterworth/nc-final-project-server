import React from "react";
import {
  Paper,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FastForward, Close } from "@mui/icons-material";

const PlayerControls = ({
  handleQuitButtonClick,
  handleSkipButtonClick,
  skippedOrCorrect,
  anagramWords,
  mode,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        minWidth: "25vw",
        minHeight: "5vh",
        margin: "2em",
        padding: "1em",
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
      <IconButton
        onClick={handleQuitButtonClick}
        sx={{
          backgroundColor:
            mode.palette.mode === "light" ? "#06d6a0" : "#ff0000",
          color: mode.palette.mode === "light" ? "#ef476f" : "#fff",
          margin: isMobile ? "0.5em 0" : "0.5em",
        }}
      >
        <Close />
      </IconButton>
      <Button
        onClick={handleQuitButtonClick}
        variant="contained"
        sx={{
          backgroundColor:
            mode.palette.mode === "light" ? "#06d6a0" : "#ff0000",
          color: mode.palette.mode === "light" ? "#ef476f" : "#fff",
          margin: isMobile ? "0.5em 0" : "0.5em",
        }}
      >
        Quit
      </Button>
      <IconButton
        onClick={handleSkipButtonClick}
        disabled={skippedOrCorrect || anagramWords.length === 0}
        sx={{
          backgroundColor:
            mode.palette.mode === "light" ? "#ef476f" : "#003B00",
          color: mode.palette.mode === "light" ? "#06d6a0" : "#fff",
          margin: isMobile ? "0.5em 0" : "0.5em",
        }}
      >
        <FastForward />
      </IconButton>
      <Button
        onClick={handleSkipButtonClick}
        disabled={skippedOrCorrect || anagramWords.length === 0}
        variant="contained"
        sx={{
          backgroundColor:
            mode.palette.mode === "light" ? "#ef476f" : "#003B00",
          color: mode.palette.mode === "light" ? "#06d6a0" : "#fff",
          margin: isMobile ? "0.5em 0" : "0.5em",
        }}
      >
        Skip
      </Button>
    </Box>
  );
};

export default PlayerControls;
