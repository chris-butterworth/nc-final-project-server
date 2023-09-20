import { Paper, Box, Button } from "@mui/material";

export const PlayBox = () => {
  const question = "Flip Into Cup";
  const questionWords = question.split(" ");
  const answer = "Pulp Fiction";

  const makeQuestionWordPaper = (questionWord, wordIndex) => {
    return (
      <Paper
        sx={{
          backgroundColor: "red",
          margin: "auto",
          display: "flex",
        }}
      >
        {questionWord.split("").map((questionLetter, letterIndex) => {
          return makeQuestionLetterBox(questionLetter, letterIndex);
        })}
      </Paper>
    );
  };

  const makeQuestionLetterBox = (questionLetter, letterIndex) => {
    console.log("in second function");
    return (
      <Box
        sx={{
          backgroundColor: "yellow",
        }}
      >
        <Button
          sx={{
            backgroundColor: "purple",
          }}
        >
          {questionLetter}
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Paper className="solution-container"></Paper>
      <Paper
        className="question-container"
        sx={{
          backgroundColor: "grey",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {questionWords.map((questionWord, wordIndex) => {
          return makeQuestionWordPaper(questionWord, wordIndex);
        })}
      </Paper>
    </>
  );
};
