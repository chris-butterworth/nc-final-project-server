import { Paper, Box, Button, Typography } from "@mui/material";
import { ModeContext } from "../context/Mode";
import { useState, useEffect, useContext } from "react";
import PlayerControls from "./PlayerControls";
import { HintBar } from "./HintBar";

export const PlayBox = ({
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
}) => {
  const { mode, setMode } = useContext(ModeContext);


  const handleAttempt = (questionLetter, wordIndex, letterIndex) => {
    const updatedArray = [...formattedAnswerArray];
    for (let i = 0; i < updatedArray.length; i++) {
      for (let j = 0; j < updatedArray[i].length; j++) {
        if (updatedArray[i][j] === "") {
          updatedArray[i][j] = questionLetter;
          setFormattedAnswerArray(updatedArray);
          const newDisabledButtons = [...disabledButtons];
          newDisabledButtons.push({ wordIndex, letterIndex });
          setDisabledButtons(newDisabledButtons);

          return;
        }
      }
    }
  };

  const renderWord = (word, wordIndex) => (
    <Paper
      key={`word-${wordIndex}`}
      sx={{
        margin: "1em",
        display: "flex",
        
      }}
    >
      {Array.from(word).map((questionLetter, letterIndex) => (
        <Box key={`letter-${letterIndex}`}>
          <Button
            className={`button anagram-button ${
              formattedAnswerArray &&
              formattedAnswerArray[wordIndex] &&
              formattedAnswerArray[wordIndex][letterIndex] !== ""
                ? "disabled"
                : ""
            }`}
            sx={{
              backgroundColor:
                mode.palette.mode === "light" ? "#cdf0a9" : "#000000",
              padding: "0",
              minWidth: "40px",
              border: "0.1em solid #B8ADA0",
            }}
            onClick={() =>
              handleAttempt(questionLetter, wordIndex, letterIndex)
            }
            disabled={
              disabledButtons.some(
                (btn) =>
                  btn.wordIndex === wordIndex && btn.letterIndex === letterIndex
              ) || skippedOrCorrect
            }
          >
            {questionLetter}
          </Button>
        </Box>
      ))}
    </Paper>
  );

  console.log({ roundNumber, anagramNumber, category });
  return (
    <>
      <Paper
        className="solution-container"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {formattedAnswerArray &&
          formattedAnswerArray.map((answerWord, wordIndex) => (
            <Paper
              key={`answer-word-${wordIndex}`}
              sx={{
                display: "flex",
                border: "0.1em solid #B8ADA0",
                marginTop: "0.5em",
                marginBottom: "0.5em",
                marginLeft: "1em",
              }}
            >
              {answerWord.map((answerLetter, letterIndex) => (
                <Box
                  key={`answer-letter-${letterIndex}`}
                  sx={{
                    border: "0.1em solid #B8ADA0",
                    borderRadius: "0.5em",
                    
                  }}
                >
                  {answerLetter !== "" ? (
                    <Button>{answerLetter}</Button>
                  ) : (
                    <Box
                      sx={{
                        width: "2.5em",
                        height: "2.5em",
                        display: "block",
                        
                      }}
                    ></Box>
                  )}
                </Box>
              ))}
            </Paper>
          ))}
      </Paper>
      <Paper
        className="question-container"
        sx={{
          marginTop:"1em",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {anagramWords.map((anagramWord, wordIndex) =>
          renderWord(anagramWord, wordIndex)
        )}
      </Paper>
      
    </>
  );
};


