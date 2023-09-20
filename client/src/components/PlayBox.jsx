import { Paper, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

export const PlayBox = () => {
  const [anagramWords, setAnagramWords] = useState([]);
  const [formattedAnswerArray, setFormattedAnswerArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const anagramData = {
        anagramWords: ["Flip", "Into", "Cup"],
        anagramAnswer: "Pulp Fiction",
      };

      setAnagramWords(anagramData.anagramWords);
      setFormattedAnswerArray(
        Array.from({ length: anagramData.anagramWords.length }, () => [])
      );
    };

    fetchData();
  }, []);

  const handleAttempt = (questionLetter, wordIndex, letterIndex) => {
    if (
      formattedAnswerArray[wordIndex].length < anagramWords[wordIndex].length
    ) {
      setFormattedAnswerArray((prev) => {
        const updatedArray = [...prev];
        updatedArray[wordIndex].push(questionLetter);
        return updatedArray;
      });
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
      {word.split("").map((questionLetter, letterIndex) => (
        <Box
          key={`letter-${letterIndex}`}
          sx={{
            backgroundColor: "yellow",
          }}
        >
          <Button
            className={`button ${
              formattedAnswerArray[wordIndex].length >= word.length
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
            disabled={formattedAnswerArray[wordIndex].length >= word.length}
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
                {answerLetter ? (
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
