import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const TutorialPage = () => {
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
        <Typography variant="h3">The Tutorial</Typography>
        <Typography variant="span">Welcome to the Anagram game!</Typography>
        <Typography variant="span">Each game will consist of three rounds, with each round containing three seperate anagrams</Typography>
        <Typography variant="span"> The quicker you guess, the more points you get!</Typography>
        <Typography variant="span"> Stuck on a question? You get 3 hints per game so hit the hint button</Typography>
        <Typography variant="span"> So stuck you're giving up? No drama, press the skip button! Be careful though, you will loose precious points!</Typography>
        <Typography variant="span"> Playing with friends? Don't forget to hit up the chat!</Typography>
        <Typography variant="span"> Loving the game? Sign up and your scores will join the leaderboard!</Typography>
        <Link to="/">
          <Button>Home Page</Button>
        </Link>

        <Link to="/tutorial/single">
          <Button>Single Player Tutorial</Button>
        </Link>
        <Link to="/tutorial/multi">
          <Button>Multi-Player Tutorial</Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default TutorialPage;
