import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MultiTutorial = () => {
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
        <Typography variant="h3">Multi-Player Tutorial</Typography>
        
        <Typography variant="h4">Setting up a Multi-Player Game</Typography>
        <Typography variant="p">To set up a multiplayer game simpliy click the "New Multi-player" option from the game menu </Typography>
        <Typography variant="p">Once you have entered the multiplayer room a "Game Room ID" will appear that you can send to your friends to join the room!</Typography>
        <Typography variant="h4">Joining a Multi-Player Game</Typography>
        <Typography variant="p">To join another players multiplayer game paste the given Game Room Id into the Join Game option from the game menu and click "join room"!</Typography>
        <Typography variant="h4">Playing the Game</Typography>
        <Typography variant="p">1. When you are ready to being click on 'Ready'</Typography>
        <Typography variant="p">2. Once all the players currently in the room have clicked 'ready' then the game will begin</Typography>
        <Typography variant="p">3. An anagram will be displayed for you, to guess click on the letter tiles to add it to your current guess</Typography>
        <Typography variant="p">4. If all players have either guessed correctly or skipped or the timer has run out, the round will end and the next one will begin</Typography>
        <Typography variant="p">5. Once all 3 rounds have finished the player with the highest score wins!</Typography>
        <Link to="/">
          <Button>Home Page</Button>
        </Link>
        <Link to="/tutorial">
        <Button>All Tutorials</Button>
        </Link>
        <Link to="/tutorial/single">
          <Button>Single Player Tutorial</Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default MultiTutorial;
