import { Typography, Box, Button, Paper, Card } from "@mui/material";
import { useState } from "react";
import "../App.css";

export const PlayBox = () => {
  const [solutionAttempt, setSolutionAttempt] = useState([]);
  //do this without direct DOM manipulation
  const letters = document.getElementsByClassName("letter-button");
  console.log(letters, "<<<<<LETERES");
  //   console.log(letters, "<<<<<<<<<<<");
  const solutionBoxes = document.getElementsByClassName("solution-box");

  const handleAttempt = (
    attemptLetter,
    currX,
    currY,
    targetX,
    targetY,
    wordIndex,
    letterIndex
  ) => {
    const wordLetters = document.getElementsByClassName(
      `letter-button-${wordIndex}`
    );
    setSolutionAttempt((currSolution) => {
      return [...currSolution, attemptLetter];
    });
    wordLetters[letterIndex].style.left = currX + "px";
    wordLetters[letterIndex].style.top = currY + "px";
    requestAnimationFrame(() => {
      wordLetters[letterIndex].style.left = targetX + 5 + "px";
      wordLetters[letterIndex].style.top = targetY + 5 + "px";
    });
  };

  const question1 = "Flip Into Cup";
  const answer1 = "Pulp Fiction";
  const hiddenAnswerStr = "xxxx xxxxxxx";
  const hiddenAnswer = hiddenAnswerStr.split("");
  console.log(hiddenAnswer);
  const questionArr = question1.split(" ");
  const formattedAnswer = [4, 7];
  const emptyBoxes = [];
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
    console.log(typeof wordLength, "<<<<<4 and 7");
    const boxesArr = [];
    for (let i = 0; i < wordLength; i++) {
      console.log(i, "INCREMENT TO 4 and 7");
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
    const wordsLetters = document.getElementsByClassName(
      `letter-button-${wordIndex}`
    );

    console.log(typeof wordLength, "<<<<<4 and 7");
    const lettersArr = word.split("");

    const boxesArr = [];

    lettersArr.map((letter, letterIndex) => {
      boxesArr.push(
        <Box
          key={`answer-box-${wordIndex}-${letterIndex}`}
          className={`playBoxBoxes solution-box letter-button-${wordIndex}`}
          sx={{
            margin: "10px",
            padding: "0",
            minWidth: "5em",
            border: "rose 10px solid",
            display: "block",
          }}
        >
          <Button
            className="letter-button"
            sx={{
              color: "red",
              margin: "auto",
              padding: "auto",
              backgroundColor: "white",
              position: "absolute",
              margin: "0",
              display: "block",

              //   fontSize: "large",
              //   margin: "0",
              transition: "left 0.5s ease-out, top 0.7s ease-out",
            }}
            onClick={(e) => {
              e.preventDefault();
              const currX = wordsLetters[letterIndex].offsetLeft;
              const currY = wordsLetters[letterIndex].offsetTop;
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

    // for (let i = 0; i < word.length; i++) {
    //   console.log(i, "INCREMENT TO 4 and 7");
    //   boxesArr.push(
    //     <Box
    //       key={`answer-box-${index}-${i + 1}`}
    //       className="playBoxBoxes solution-box"
    //       sx={{
    //         margin: "10px",
    //         padding: "0",
    //         minWidth: "5em",
    //         border: "green 10px solid",
    //         display: "block",
    //       }}
    //     >
    //       <Button>{letter}</Button>
    //     </Box>
    //   );
    // }
    return boxesArr;
  };
  getEmptyBoxes();
  const questions = ["Titanic", "Pulp Fiction", "The Shining", "Citizen Kane"];
  const answers = ["Act In It", "Flip Into Cup", "Highest Inn", "Nazi Necktie"];

  return (
    <Paper sx={{ height: "auto", maxHeight: "80vh" }}>
      <Typography variant="h4">PLAY BOX</Typography>
      <Paper>
        {/* <Button
          className="letter-button"
          sx={{
            color: "red",
            margin: "auto",
            padding: "auto",
            backgroundColor: "white",
            position: "absolute",
            margin: "0",
            display: "block",

            //   fontSize: "large",
            //   margin: "0",
            transition: "left 0.5s ease-out, top 0.7s ease-out",
          }}
          onClick={(e) => {
            e.preventDefault();
            const currX = letters[index].offsetLeft;
            const currY = letters[index].offsetTop;
            const targetX = solutionBoxes[solutionAttempt.length].offsetLeft;
            const targetY = solutionBoxes[solutionAttempt.length].offsetTop;
            handleAttempt(letter, currX, currY, targetX, targetY, index);
          }}
        >
          A
        </Button> */}
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
          console.log(word, "WORD");
          console.log(index, "INDEX");
          console.log(formattedAnswer.length, "LENGTH");
        })}
        {/* {hiddenAnswer.map((letter, index) => {
          if (letter !== " ") {
            return (
              <Box
                key={`answer-box-${index}`}
                className="playBoxBoxes solution-box"
                sx={{
                  border: "green 10px solid",
                  margin: "10px",
                  padding: "0",
                  minWidth: "5em",
                  // position: "inherit",
                  // transition: "left 0.5s ease-out, top 0.7s ease-out",
                  display: "block",
                }}
              ></Box>
            );
          } else {
            console.log("IN ELSE");
            return <Box sx={{ display: "block", width: "5em" }}></Box>;
          } */}
        //{" "}
        {
          //     return word.map((box, boxIndex) => {
          //       return (
          //         <Box
          //           key={`answer-box-${wordIndex}-${boxIndex}`}
          //           className="playBoxBoxes solution-box"
          //           sx={{
          //             border: "green 10px solid",
          //             margin: "10px",
          //             padding: "0",
          //             // position: "inherit",
          //             // transition: "left 0.5s ease-out, top 0.7s ease-out",
          //             display: "block",
          //           }}
          //         ></Box>
          //       );
          //     });
          //   }
          //   return;
          //   return (
          //     <Box
          //       key={`answer-box-${index}`}
          //       className="playBoxBoxes solution-box"
          //       sx={{
          //         border: "green 10px solid",
          //         margin: "10px",
          //         padding: "0",
          //         // position: "inherit",
          //         // transition: "left 0.5s ease-out, top 0.7s ease-out",
          //         display: "block",
          //       }}
          //     ></Box>
          //   );
        }
      </Paper>
      <Paper
        className="question-container"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "grey",
        }}
      >
        {questionArr.map((word, index) => {
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
                {makeQuestionBoxes(word, index)}
              </Paper>
            </>
          );
          console.log(word, "WORD");
          console.log(index, "INDEX");
          console.log(formattedAnswer.length, "LENGTH");
        })}
        {/* {question1.split("").map((letter, index) => {
          return (
            <Box
              className=" question-box"
              key={`question-box-${index}`}
              sx={{
                width: "5em",
                height: "5em",
                display: "block",
                margin: "10px",
                border: "2px blue solid",
              }}
            >
              <Button
                className="letter-button"
                sx={{
                  color: "red",
                  margin: "auto",
                  padding: "auto",
                  backgroundColor: "white",
                  position: "absolute",
                  margin: "0",
                  display: "block",

                  //   fontSize: "large",
                  //   margin: "0",
                  transition: "left 0.5s ease-out, top 0.7s ease-out",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const currX = letters[index].offsetLeft;
                  const currY = letters[index].offsetTop;
                  const targetX =
                    solutionBoxes[solutionAttempt.length].offsetLeft;
                  const targetY =
                    solutionBoxes[solutionAttempt.length].offsetTop;
                  handleAttempt(letter, currX, currY, targetX, targetY, index);
                }}
              >
                {letter}
              </Button>
            </Box>
          );
        })} */}
      </Paper>
    </Paper>
  );
};
