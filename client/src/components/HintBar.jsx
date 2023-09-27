import { Paper, Box, Button, Typography } from "@mui/material";
import { ModeContext } from "../context/Mode";
import { useState, useEffect, useContext } from "react";
import PlayerControls from "./PlayerControls";

export const HintBar = ({
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
  setSkippedOrCorrect,
  children,
  handleSkipButtonClick,
  handleHintButtonClick, 
  handleClearButtonClick, 
}) => {
  const { mode, setMode } = useContext(ModeContext);


  console.log({ roundNumber, anagramNumber, category });
  return (
    <>
      <Button
        onClick={handleClearButtonClick}
        disabled={
          skippedOrCorrect ||
          anagramWords.length === 0 ||
          disabledButtons.length === 0
        }
      >
        Clear
      </Button>
      <Button
        onClick={handleHintButtonClick}
        disabled={skippedOrCorrect || anagramWords.length === 0}
      >
        Hint
      </Button>
      <Typography>
        Round: {roundNumber}. Word: {anagramNumber}. Category: {category}
      </Typography>
    </>
  );
};


