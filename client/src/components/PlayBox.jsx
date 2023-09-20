import { Paper, Box, Button } from "@mui/material";

export const PlayBox = () => {
  const question = "Flip Into Cup";
  const questionWords = question.split(" ");
  const formattedAnswerArr = [
    ["", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];
  console.log(document.getElementsByClassName("button"), "BUTTONS");
  console.log(formattedAnswerArr, "<<<formatted...");

  useEffect(() => {}, [document.getElementsByClassName("button")]);

  const makeQuestionWordPaper = (questionWord, wordIndex) => {
    return (
      <Paper
        sx={{
          backgroundColor: "red",
          margin: "1em",
          display: "flex",
        }}
      >
        {
          questionWord.split("").map((questionLetter, letterIndex) => {
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
    return (
      <Paper
        sx={{
          backgroundColor: "blue",
          margin: "1em",
          display: "flex",
        }}
      >
        {answerWord.map((answerLetter, letterIndex) => {
          return makeAnswerLetterBox(answerLetter, letterIndex);
        })}
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

  const handleAttempt = (questionLetter, letterIndex, wordIndex) => {
    const button = document.getElementById(
      `answer-button-${wordIndex}-${letterIndex}`
    );
    console.log(button, "bEFORE");
    button.classList.add("disabled");
    console.log(button);
    const firstEmpty = formattedAnswerArr[0].indexOf("");
    console.log(formattedAnswerArr, "<<<ANSWER ARRAY");
    if (firstEmpty >= 0) {
      return (formattedAnswerArr[0][firstEmpty] = questionLetter);
    } else {
      const secondEmpty = formattedAnswerArr[1].indexOf("");
      if (secondEmpty >= 0) {
        return (formattedAnswerArr[1][secondEmpty] = questionLetter);
      } else {
        const thirdEmpty = formattedAnswerArr[2].indexOf("");
        return (formattedAnswerArr[2][thirdEmpty] = questionLetter);
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
        {formattedAnswerArr.map((answerWord, wordIndex) => {
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
        {questionWords.map((questionWord, wordIndex) => {
          return makeQuestionWordPaper(questionWord, wordIndex);
        })}
      </Paper>
    </>
  );
};
