import { Typography, Box, Button, Paper, Card } from "@mui/material";
import { useState } from "react";
import "../App.css";

export const PlayBox = () => {
  const [solutionAttempt, setSolutionAttempt] = useState([]);
  //do this without direct DOM manipulation
  const letters = document.getElementsByClassName("letter-button");
  const solutionBoxes = document.getElementsByClassName("solution-box");
  const question1 = "Flip Into Cup";
  const questionWords = question1.split(" ");
  console.log(questionWords);
  const answer1 = "Pulp Fiction";
  const hiddenAnswerStr = "xxxx xxxxxxx";
  const formattedAnswer = [4, 7];
  const emptyBoxes = [];
  const wordLetters = [
    document.getElementsByClassName("letter-button-0"),
    document.getElementsByClassName("letter-button-1"),
    document.getElementsByClassName("letter-button-2"),
  ];
  console.log(solutionAttempt);
  const handleAttempt = (
    attemptLetter,
    currX,
    currY,
    targetX,
    targetY,
    wordIndex,
    letterIndex
  ) => {
    console.log(wordIndex, "<<<<WORD NUMBER");
    console.log(letterIndex, "<<<<LETTRER NUMEBR");

    setSolutionAttempt((currSolution) => {
      return [...currSolution, attemptLetter];
    });
    console.log(wordIndex);
    wordLetters[wordIndex][letterIndex].style.left = currX + "px";
    wordLetters[wordIndex][letterIndex].style.top = currY + "px";
    requestAnimationFrame(() => {
      wordLetters[wordIndex][letterIndex].style.left = targetX + 5 + "px";
      wordLetters[wordIndex][letterIndex].style.top = targetY + 5 + "px";
    });
  };

  const getEmptyBoxes = () => {
    for (let i = 0; i < formattedAnswer.length; i++) {
      const thisWord = [];
      for (let j = 0; j < formattedAnswer[i]; j++) {
        thisWord.push("");
      }
      emptyBoxes.push(thisWord);
    }
    return emptyBoxes;
  };

  const makeBoxes = (wordLength, index) => {
    const boxesArr = [];
    for (let i = 0; i < wordLength; i++) {
      boxesArr.push(
        <Box
          key={`answer-box-${index}-${i + 1}`}
          className="playBoxBoxes solution-box"
          sx={{
            margin: "10px",
            padding: "0",
            minWidth: "5em",
            border: "green 10px solid",
            display: "block",
          }}
        ></Box>
      );
    }
    return boxesArr;
  };

  const makeQuestionBoxes = (word, wordIndex) => {
    return word.split("").map((letter, letterIndex) => {
      return (
        <Box
          key={`question-box-${wordIndex}-${letterIndex}`}
          sx={{
            width: "5em",
            height: "5em",
            display: "block",
            margin: "10px",
            border: "2px blue solid",
          }}
        >
          <Button
            className={`letter-button letter-button-${wordIndex}`}
            sx={{
              color: "red",
              margin: "auto",
              padding: "auto",
              backgroundColor: "white",
              position: "absolute",
              margin: "0",
              display: "block",
              transition: "left 0.5s ease-out, top 0.7s ease-out",
            }}
            onClick={(e) => {
              e.preventDefault();
              const currX = wordLetters[wordIndex][letterIndex].offsetLeft;
              const currY = wordLetters[wordIndex][letterIndex].offsetTop;
              const targetX = solutionBoxes[solutionAttempt.length].offsetLeft;
              const targetY = solutionBoxes[solutionAttempt.length].offsetTop;
              handleAttempt(
                letter,
                currX,
                currY,
                targetX,
                targetY,
                wordIndex,
                letterIndex
              );
            }}
          >
            {letter}
          </Button>
        </Box>
      );
    });
    console.log(wordIndex, "<<<<<wordindex");
  };

  getEmptyBoxes();
  const questions = ["Titanic", "Pulp Fiction", "The Shining", "Citizen Kane"];
  const answers = ["Act In It", "Flip Into Cup", "Highest Inn", "Nazi Necktie"];

  return (
    <>
      <Typography variant="h4">PLAY BOX</Typography>
      <Paper>
        <Button></Button>
      </Paper>
      <Paper
        className="solution-container"
        sx={{
          backgroundColor: "yellow",
          display: "flex",
          justifyContent: "center",
          marginBottom: "1em",
          flexWrap: "wrap",
        }}
      >
        {formattedAnswer.map((word, index) => {
          if (index + 1 !== formattedAnswer.length) {
            return (
              <>
                <Paper
                  sx={{
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginBottom: "1em",
                    flexWrap: "wrap",
                    margin: "auto",
                  }}
                >
                  {makeBoxes(word)}
                </Paper>
              </>
            );
          } else {
            return (
              <>
                <Paper
                  sx={{
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginBottom: "1em",
                    flexWrap: "wrap",
                    margin: "auto",
                  }}
                >
                  {makeBoxes(word)}
                </Paper>
              </>
            );
          }
        })}
      </Paper>
      <Paper
        className="question-container"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "grey",
          flexWrap: "wrap",
        }}
      >
        {questionWords.map((word, index) => {
          return (
            <Paper
              sx={{
                backgroundColor: "black",
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: "1em",
                flexWrap: "wrap",
                margin: "auto",
              }}
            >
              {makeQuestionBoxes(word, index)}{" "}
            </Paper>
          );
        })}
      </Paper>
    </>
  );
};
