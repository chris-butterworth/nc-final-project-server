import { Paper, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";

export const PlayBox = () => {
  const [solutionAttempt, setSolutionAttempt] = useState([]);
  const [anagram, setAnagram] = useState("");
  const [anagramWords, setAnagramWords] = useState([]);
  const [anagramLetters, setAnagramLetters] = useState([]);
  // const [anagramLetterInitialRefs, setAnagramLetterInitialRefs] = useState([]);
  const [anagramAnswer, setAnagramAnswer] = useState("");
  const [formattedAnswerArray, setFormattedAnswerArray] = useState([]);

  useEffect(() => {
    // TODO:
    // do api call, and get anagram data from api
    // on initial page load, set the initial state of the game

    // faking it
    setAnagram("Flip Into Cup");
    setAnagramWords("Flip Into Cup".split(" "));
    setAnagramLetters(["F", "l", "i", "p", "I", "n", "t", "o", "C", "u", "p"]);
    setAnagramAnswer("Pulp Fiction");
    setFormattedAnswerArray([
      ["", "", "", ""],
      ["", "", "", "", "", "", ""],
    ]);
  }, []);

  console.log("formattedAnswerArray: ", formattedAnswerArray);

  // const question = "Flip Into Cup";
  // const questionWords = question.split(" ");
  // const formattedAnswerArr = [
  //   ["", "", "", ""],
  //   ["", "", "", "", "", "", ""],
  // ];
  // console.log(document.getElementsByClassName("button"), "BUTTONS");
  // console.log(formattedAnswerArr, "<<<formatted...");

  // useEffect(() => {}, [document.getElementsByClassName("button")]);

  const makeQuestionWordPaper = (anagramWord, wordIndex) => {
    return (
      <Paper
        sx={{
          backgroundColor: "red",
          margin: "1em",
          display: "flex",
        }}
      >
        {
          anagramWord.split("").map((questionLetter, letterIndex) => {
            return makeQuestionLetterBox(
              questionLetter,
              letterIndex,
              wordIndex
            );
          })
          //get all the button references for this word
          //make an array of them for this word
          //default state of not selected
        }
      </Paper>
    );
  };

  const makeQuestionLetterBox = (questionLetter, letterIndex, wordIndex) => {
    console.log("in second function");
    return (
      <Box
        sx={{
          backgroundColor: "yellow",
        }}
      >
        <Button
          className="button"
          id={`answer-button-${wordIndex}-${letterIndex}`}
          sx={{
            backgroundColor: "purple",
            padding: "0",
            minWidth: "40px",
          }}
          onClick={() => {
            handleAttempt(questionLetter, letterIndex, wordIndex);
          }}
        >
          {questionLetter}
        </Button>
      </Box>
    );
  };

  const makeAnswerWordPaper = (answerWord, wordIndex) => {
    console.log("makeAnswerWordPaper: ", answerWord);
    return (
      <Paper
        sx={{
          backgroundColor: "blue",
          margin: "1em",
          display: "flex",
        }}
      >
        {/* {answerWord.map((answerLetter, letterIndex) => {
          return makeAnswerLetterBox(answerLetter, letterIndex);
        })} */}
      </Paper>
    );
  };

  const makeAnswerLetterBox = (answerLetter, letterIndex) => {
    if (answerLetter) {
      return (
        <Box>
          <Button>{answerLetter}</Button>
        </Box>
      );
    } else {
      return (
        <Box
          sx={{
            width: "40px",
            height: "40px",
            border: "5px green solid",
            display: "block",
          }}
        ></Box>
      );
    }
  };

  /* 

1. On click: letter taken from question array and added to solution array. 
      logic: check empty index in order: word i[0] letter [0], if empty > add to position, etc. 
2. Once added to the answer array, disable button that has been clicked
        disabled looks like: button greyed out, content not visible and button no longer clickable
3. Letter that has been added to the answer array appears in the respective position in the answer paper and letter box. 

other 
answer boxes need to contain buttons that on click change their value corresponding to the i value of the answer array. 

*/

  const handleAttempt = (questionLetter, letterIndex, wordIndex) => {
    // const firstAvailableEmptyLetterSlot = formattedAnswerArray.map((array) => {
    //   return array.map((item) => {
    //     return
    //   })
    // })
    // formattedAnswerArray[0][1]

    console.log("handleAttempt called");
    const button = document.getElementById(
      `answer-button-${wordIndex}-${letterIndex}`
    );
    // console.log(button, "bEFORE");
    button.classList.add("disabled");
    // console.log(button);
    const firstEmpty = formattedAnswerArray[0].indexOf("");
    // console.log(formattedAnswerArray, "<<<ANSWER ARRAY");
    if (firstEmpty >= 0) {
      // return (formattedAnswerArray[0][firstEmpty] = questionLetter);
      return setFormattedAnswerArray((prev) => {
        return [
          ...prev,
          (formattedAnswerArray[0][firstEmpty] = questionLetter),
        ];
      });

      // (formattedAnswerArray[0][firstEmpty] = questionLetter);
    } else {
      const secondEmpty = formattedAnswerArray[1].indexOf("");
      if (secondEmpty >= 0) {
        // return (formattedAnswerArray[1][secondEmpty] = questionLetter);
        return setFormattedAnswerArray((prev) => {
          return [
            ...prev,
            (formattedAnswerArray[1][secondEmpty] = questionLetter),
          ];
        });
      } else {
        const thirdEmpty = formattedAnswerArray[2].indexOf("");
        // return (formattedAnswerArray[2][thirdEmpty] = questionLetter);
        return setFormattedAnswerArray((prev) => {
          return [
            ...prev,
            (formattedAnswerArray[2][thirdEmpty] = questionLetter),
          ];
        });
      }
    }
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
        {formattedAnswerArray.map((answerWord, wordIndex) => {
          console.log("formattedAnswerArray CHANGED!", formattedAnswerArray);
          return makeAnswerWordPaper(answerWord, wordIndex);
        })}
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
        {anagramWords.map((anagramWord, wordIndex) => {
          return makeQuestionWordPaper(anagramWord, wordIndex);
        })}
      </Paper>
    </>
  );
};
