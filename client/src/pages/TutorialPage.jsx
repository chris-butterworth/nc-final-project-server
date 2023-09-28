import { Box, Typography, Paper, Button, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const TutorialPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        // minHeight: "100vh",
        padding: isMobile ? "1em" : "0",
      }}
    >
      <Paper
        sx={{
          minWidth: "50%",
          padding: isMobile ? "1em" : "2em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            How To Play
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            Welcome to the Anagram game!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            Each game will consist of three rounds, with each round containing
            three separate anagrams.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            The quicker you guess, the more points you get!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            Stuck on a question? You get 3 hints per game, so hit the hint
            button.
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            So stuck you're giving up? No drama, press the skip button! Be
            careful though, you will lose precious points!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            Playing with friends? Don't forget to hit up the chat!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            Loving the game? Sign up, and your scores will join the leaderboard!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "1em" }}>
            Want to know more about the geniuses who built this app?{" "}
            <Link to="/thebuild">Click here to see our faces!</Link>
          </Typography>
          <Link style={{ paddingTop: "1em" }} to="/">
            <Button variant="contained" color="primary">
              Start a Game
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default TutorialPage;
