import { Paper, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

export const PlayBox = () => {
  const [anagramWords, setAnagramWords] = useState([]);
  const [formattedAnswerArray, setFormattedAnswerArray] = useState([]);
  const [clickedLetters, setClickedLetters] = useState([]);

  console.log({
    anagramWords,
    formattedAnswerArray,
    clickedLetters,
  });

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
    setFormattedAnswerArray((prev) => {
      const updatedArray = prev.map((word) => [...word]);
      for (let i = 0; i < updatedArray.length; i++) {
        for (let j = 0; j < updatedArray[i].length; j++) {
          if (updatedArray[i][j] === "") {
            updatedArray[i][j] = questionLetter;
            return updatedArray;
          }
        }
      }
      return updatedArray;
    });

    setClickedLetters((prev) => [...prev, questionLetter]);
  };

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
        {anagramWords.map((anagramWord, wordIndex) => (
          <Paper
            key={`question-word-${wordIndex}`}
            sx={{
              backgroundColor: "red",
              margin: "1em",
              display: "flex",
            }}
          >
            {Array.from(anagramWord).map((questionLetter, letterIndex) => (
              <Box
                key={`question-letter-${letterIndex}`}
                sx={{
                  backgroundColor: "yellow",
                }}
              >
                <Button
                  className={`button ${
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
                  onClick={() => handleAttempt(questionLetter)}
                  disabled={
                    formattedAnswerArray[wordIndex] &&
                    formattedAnswerArray[wordIndex][letterIndex] !== ""
                  }
                >
                  {questionLetter}
                </Button>
              </Box>
            ))}
          </Paper>
        ))}
      </Paper>
    </>
  );
};
