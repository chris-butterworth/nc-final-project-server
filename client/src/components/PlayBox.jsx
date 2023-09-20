import { Paper, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

export const PlayBox = () => {
  const [anagramWords, setAnagramWords] = useState([]);
  const [formattedAnswerArray, setFormattedAnswerArray] = useState([]);
  const [clickedLetters, setClickedLetters] = useState([]);

  useEffect(() => {
    // Simulating data fetching, replace with your actual data retrieval logic
    const fetchData = async () => {
      // Example data
      const anagramData = {
        anagramWords: ["Flip", "Into", "Cup"],
        anagramAnswer: "Pulp Fiction",
      };

      setAnagramWords(anagramData.anagramWords);
      setFormattedAnswerArray(
        anagramData.anagramAnswer
          .split(" ")
          .map((word) => Array.from({ length: word.length }, () => ""))
      );
    };

    fetchData();
  }, []);

  const handleAttempt = (questionLetter) => {
    const updatedArray = [...formattedAnswerArray];

    for (let i = 0; i < updatedArray.length; i++) {
      for (let j = 0; j < updatedArray[i].length; j++) {
        if (updatedArray[i][j] === "") {
          updatedArray[i][j] = questionLetter;
          setFormattedAnswerArray(updatedArray);
          setClickedLetters((prev) => [...prev, questionLetter]);
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
            className={`button`}
            sx={{
              backgroundColor: "purple",
              padding: "0",
              minWidth: "40px",
            }}
            onClick={() => handleAttempt(questionLetter)}
          >
            {questionLetter}
          </Button>
        </Box>
      ))}
    </Paper>
  );

  return (
    <>
      <Paper
        className="solution-container"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          backgroundColor: "chartreuse",
          justifyContent: "center",
        }}
      >
        {formattedAnswerArray.map((answerWord, wordIndex) => (
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
