import { Paper, Box, Button, Typography } from "@mui/material";
import { ModeContext } from "../context/Mode";
import { useState, useEffect, useContext } from "react";
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

  const { mode, setMode } = useContext(ModeContext);

  const handleClearButtonClick = () => {
    setDisabledButtons([]);

    setFormattedAnswerArray((current) => {
      return current.map((word) => {
        return word.map((letter) => {
          return "";
        });
      });
    });
    console.log(formattedAnswerArray, "FORMATTED");
    console.log(initialAnswerArray, "INITIAL");
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

  const handleHintButtonClick = () => {
    // Combine the words in formattedAnswerArray into a single string
    const currentAnswer = formattedAnswerArray
      .map((word) => word.join(""))
      .join(" ");

    // Get the full anagram answer
    const fullAnswer = anagramAnswer.replace(/\s/g, "");

    // Find the index of the first incorrect character
    const firstIncorrectIndex = currentAnswer
      .split("")
      .findIndex((char, index) => char !== fullAnswer.charAt(index));

    if (firstIncorrectIndex !== -1) {
      // Extract the correct letter from the full answer
      const correctLetter = fullAnswer.charAt(firstIncorrectIndex);

      // Find the corresponding wordIndex and letterIndex in formattedAnswerArray
      let wordIndex = 0;
      let letterIndex = 0;

      for (let i = 0; i < formattedAnswerArray.length; i++) {
        const wordLength = formattedAnswerArray[i].length;
        if (firstIncorrectIndex >= letterIndex + wordLength) {
          letterIndex += wordLength;
          wordIndex++;
        } else {
          break;
        }
      }

      // Update formattedAnswerArray with the correct letter
      const updatedArray = [...formattedAnswerArray];
      updatedArray[wordIndex][letterIndex] = correctLetter;
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
      <Button onClick={handleClearButtonClick}>Clear</Button>
      <Button onClick={handleHintButtonClick}>Hint</Button>
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
