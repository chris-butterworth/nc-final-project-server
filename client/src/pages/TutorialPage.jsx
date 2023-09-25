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
        <Typography variant="span"> click below for instructions for either the single player mode or the multiplayer mode!</Typography>
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
