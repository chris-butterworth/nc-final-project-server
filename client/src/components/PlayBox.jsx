import { Paper, Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
export const PlayBox = ({
  anagramWords,
  setAnagramWords,
  formattedAnswerArray,
  setFormattedAnswerArray,
  gameMessage,
  disabledButtons,
  setDisabledButtons,
}) => {
  // const [anagramWords, setAnagramWords] = useState([]);
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
          newDisabledButtons.push({ wordIndex, letterIndex });
          setDisabledButtons(newDisabledButtons);

          return; // Exit the function after adding the letter
        }
      }
    }
  };

  const renderWord = (word, wordIndex) => (
    <Paper
      key={`word-${wordIndex}`}
      sx={{
        backgroundColor: "red",
        margin: "1em",
        display: "flex",
      }}
    >
      {Array.from(word).map((questionLetter, letterIndex) => (
        <Box
          key={`letter-${letterIndex}`}
          sx={{
            backgroundColor: "yellow",
          }}
        >
          <Button
            className={`button anagram-button ${
              formattedAnswerArray &&
              formattedAnswerArray[wordIndex] &&
              formattedAnswerArray[wordIndex][letterIndex] !== ""
                ? "disabled"
                : ""
            }`}
            sx={{
              backgroundColor: "purple",
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
      <Typography>{gameMessage}</Typography>
      <Button onClick={handleClearButtonClick}> Clear</Button>
      <Paper
        className="solution-container"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "chartreuse",
          justifyContent: "center",
        }}
      >
        {formattedAnswerArray &&
          formattedAnswerArray.map((answerWord, wordIndex) => (
            <Paper
              key={`answer-word-${wordIndex}`}
              sx={{
                backgroundColor: "blue",
                margin: "1em",
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
                        border: "5px green solid",
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
          backgroundColor: "grey",
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
