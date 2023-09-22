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
        {/* include a jump to setting up, joining or playing */}
        <Typography variant="h4">Setting up a Multi-Player Game</Typography>
        <Typography variant="p">blah blah blah blah</Typography>
        <Typography variant="h4">Joining a Multi-Player Game</Typography>
        <Typography variant="p">blah blah blah blah</Typography>
        <Typography variant="h4">Playing the Game</Typography>
        <Typography variant="p">blah blah blah blah</Typography>
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
