import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const SingleTutorial = () => {
  return (
    <Paper sx={{ minWidth: "50%", margin: "10px auto", width: "fit-content" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "2em",
        }}
      >
        <Typography variant="h3">Single Tutorial</Typography>
        <Typography variant="span">Guess the anagram as quickly as possible, the quicker you are the higher you score!</Typography>
        <Typography variant="span">1. To begin the game simply click on 'ready', the game will then start</Typography>
        <Typography variant="span">2. An anagram will be displayed for you, to guess click on the letter tiles to add it to your current guess</Typography>
        <Typography variant="span">3. If you guess correctly the next round will begin</Typography>
        <Typography variant="span">4. Once all rounds have been completed the game will end </Typography>
        <Link to="/">
          <Button>Home Page</Button>
        </Link>
        <Link to="/tutorial">
          <Button>All Tutorials</Button>
        </Link>
        <Link to="/tutorial/multi">
          <Button>Multi-Player Tutorial</Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default SingleTutorial;
