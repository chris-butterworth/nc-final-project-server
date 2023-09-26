import { Paper, Box, Button, Typography } from "@mui/material";
import { ModeContext } from "../context/Mode";
import { useState, useEffect, useContext } from "react";
import findHintIndices from "../utils/findHintIndices";
import findReenableButton from "../utils/findReenableButton";
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
  hint,
  hintCount,
  setHintCount,
  hints,
  setHints,
}) => {
  const { mode, setMode } = useContext(ModeContext);

  const handleClearButtonClick = () => {
    // Hint buttons stay disabled after clear
    setDisabledButtons(() => {
      return hints.map((hint) => {
        return {
          wordIndex: hint.questionWordIndex,
          letterIndex: hint.questionLetterIndex,
          letter: hint.letter,
        };
      });
    });
    // Hinted letters stay in the formattedAnswerArray on clear
    setFormattedAnswerArray((current) => {
      // Empty nested answer array
      const hintsOnly = current.map((word) => {
        return word.map(() => {
          return "";
        });
      });
      // For each hint, add this hint to the empty nested answer array in the correct position
      hints.forEach((hint) => {
        hintsOnly[hint.answerWordIndex][hint.answerLetterIndex] = hint.letter;
      });
      return hintsOnly;
    });
  };

  const handleAttempt = (questionLetter, wordIndex, letterIndex) => {
    
    const updatedArray = [...formattedAnswerArray];
    for (let i = 0; i < updatedArray.length; i++) {
      for (let j = 0; j < updatedArray[i].length; j++) {
        if (updatedArray[i][j] === "") {
          updatedArray[i][j] = questionLetter;
          setFormattedAnswerArray(updatedArray);
          const newDisabledButtons = [...disabledButtons];
          newDisabledButtons.push({
            wordIndex,
            letterIndex,
            letter: questionLetter,
          });
          setDisabledButtons(newDisabledButtons);
          return; // Exit the function after adding the letter
        }
      }
    }
  };

  const handleHintButtonClick = () => {
    if (hintCount > 2) {
      console.log("no more hints");
    } else {
      //Split the full answer into a nested array of letters
      const fullAnswerWords = hint.split(" ");
      const fullAnswerArray = fullAnswerWords.map((word) => {
        return word.split("");
      });
      // Find the word and letter indices for the first incorrect letter, as well as the button to add to the disabled buttons, as well as the button to remove from the disabled buttons
      const foundHintIndices = findHintIndices(
        formattedAnswerArray,
        fullAnswerArray,
        anagramWords,
        disabledButtons
      );
      const [
        { answerWord, answerLetter, correctLetter },
        { disableWordIndex, disableLetterIndex, disableLetter },
      ] = foundHintIndices;
      // Add hinted button to the disabled buttons array
      setDisabledButtons((currentlyDisabled) => {
        return [
          ...currentlyDisabled,
          {
            wordIndex: disableWordIndex,
            letterIndex: disableLetterIndex,
            letter: disableLetter,
          },
        ];
      });
      // Check if there is a button to reenable (if the hint swapped out another button)
      if (foundHintIndices.length > 2) {
        const reenableLetter = foundHintIndices[2];
        //remove the reenable button from the disabled buttons array
        const buttonToReenableIndex = findReenableButton(
          reenableLetter,
          disabledButtons
        );
        setDisabledButtons((currentlyDisabled) => {
          const remainingDisabledButtons = [];
          currentlyDisabled.forEach((button, index) => {
            if (index !== buttonToReenableIndex) {
              remainingDisabledButtons.push(button);
            }
          });
          return remainingDisabledButtons;
        });
      }

      // Find the correct letter
      // const correctLetter = fullAnswerArray[answerWord][answerLetter];
      // Increase hintCount by 1
      setHintCount((prev) => {
        return prev + 1;
      });
      setHints((previousHints) => {
        return [
          ...previousHints,
          {
            letter: correctLetter,
            questionWordIndex: disableWordIndex,
            questionLetterIndex: disableLetterIndex,
            answerWordIndex: answerWord,
            answerLetterIndex: answerLetter,
          },
        ];
      });
      // Update the Formatted Answer Array to include the correct letter
      const updatedArray = [...formattedAnswerArray];
      updatedArray[answerWord][answerLetter] = correctLetter;
      setFormattedAnswerArray(updatedArray);
    }
  };

  const renderWord = (word, wordIndex) => (
    <Paper
      key={`word-${wordIndex}`}
      sx={{
        // backgroundColor: "red",
        margin: "1em",
        display: "flex",
      }}
    >
      {Array.from(word.toUpperCase()).map((questionLetter, letterIndex) => (
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
              // ...(letterIndex % 3 === 0 && {
              //   backgroundColor: "#fdde99",
              // }),
              // ...(letterIndex % 3 === 1 && {
              //   backgroundColor: "#ebddeb",
              // }),
              // ...(letterIndex % 3 === 2 && {
              //   backgroundColor: "#cdf0a9",
              // }),
              backgroundColor:
                mode.palette.mode === "light" ? "#cdf0a9" : "#000000",
              padding: "0",
              minWidth: "40px",
            }}
            onClick={() =>
              handleAttempt(questionLetter, wordIndex, letterIndex)
            }
            disabled={disabledButtons.some(
              (btn) =>
                btn.wordIndex === wordIndex && btn.letterIndex === letterIndex
            ) || skippedOrCorrect}
          >
            {questionLetter}
          </Button>
        </Box>
      ))}
    </Paper>
  );

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
      <Paper
        className="solution-container"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          //   backgroundColor: "chartreuse",
          justifyContent: "center",
        }}
      >
        {formattedAnswerArray &&
          formattedAnswerArray.map((answerWord, wordIndex) => (
            <Paper
              key={`answer-word-${wordIndex}`}
              sx={{
                // backgroundColor: "blue",
                // margin: "1em",
                display: "flex",
              }}
            >
              {answerWord.map((answerLetter, letterIndex) => (
                <Box key={`answer-letter-${letterIndex}`}>
                  {answerLetter !== "" ? (
                    <Button>{answerLetter}</Button>
                  ) : (
                    <Box
                      sx={{
                        width: "40px",
                        height: "40px",
                        // border: "5px green solid",
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
          // backgroundColor: "grey",
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
