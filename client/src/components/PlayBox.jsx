import { Paper, Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
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
  hint,
  hintCount,
  setHintCount,
}) => {
  // const [anagramWords, setAnagramwords] = useState([]);
  // const [disabledButtons, setDisabledButtons] = useState([]);

  // this will be our call to the api to get the anagram and answer
  // const fetchData = async () => {
  // Example data
  // const anagramData = {
  //   anagramWords: ["Flip", "Into", "Cup"],
  //   anagramAnswer: "Pulp Fiction",
  // };

  //   setAnagramWords(anagramData.anagramWords);
  //   setFormattedAnswerArray(
  //     anagramData.anagramAnswer
  //       .split(" ")
  //       .map((word) => Array.from({ length: word.length }, () => ""))
  //   );
  // };

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   fetchData();
  // }, []);

  const handleClearButtonClick = () => {
    setDisabledButtons([]);

    setFormattedAnswerArray((current) => {
      return current.map((word) => {
        return word.map((letter) => {
          return "";
        });
      });
    });
    //  console.log(formattedAnswerArray, "FORMATTED");
    //  console.log(initialAnswerArray, "INITIAL");
    // Fetch the data again to reset the game
    // fetchData();
  };

  const handleAttempt = (questionLetter, wordIndex, letterIndex) => {
    // Create a copy of the formattedAnswerArray
    const updatedArray = [...formattedAnswerArray];

    // Iterate through the words and letters in the answer array
    for (let i = 0; i < updatedArray.length; i++) {
      for (let j = 0; j < updatedArray[i].length; j++) {
        // Check if the current cell in the answer array is empty
        if (updatedArray[i][j] === "") {
          // Place the clicked letter in the empty cell
          updatedArray[i][j] = questionLetter;
          setFormattedAnswerArray(updatedArray);

          // Disable the button by updating the disabledButtons state
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
        anagramWords
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
        console.log(reenableLetter, "<<WORD AND LETTER TO ENABLE");
        //remove the reenable button from the disabled buttons array
        const buttonToReenableIndex = findReenableButton(
          reenableLetter,
          disabledButtons,
          anagramWords
        );
        setDisabledButtons((currentlyDisabled) => {
          const remainingDisabledButtons = [];
          currentlyDisabled.forEach((button, index) => {
            if (index !== buttonToReenableIndex) {
              console.log("should be pushed!!!");
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
              ...(letterIndex % 3 === 0 && {
                backgroundColor: "#fdde99",
              }),
              ...(letterIndex % 3 === 1 && {
                backgroundColor: "#ebddeb",
              }),
              ...(letterIndex % 3 === 2 && {
                backgroundColor: "#cdf0a9",
              }),
              padding: "0",
              minWidth: "40px",
            }}
            onClick={() =>
              handleAttempt(questionLetter, wordIndex, letterIndex)
            }
            disabled={disabledButtons.some(
              (btn) =>
                btn.wordIndex === wordIndex && btn.letterIndex === letterIndex
            )}
          >
            {questionLetter}
          </Button>
        </Box>
      ))}
    </Paper>
  );

  return (
    <>
      <Button onClick={handleClearButtonClick}> Clear</Button>
      <Button onClick={handleHintButtonClick}> Hint</Button>
      <Typography>
        Round: {roundNumber}. Word: {anagramNumber}
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
