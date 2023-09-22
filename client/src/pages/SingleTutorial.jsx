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
        <Typography variant="span">blah blah blah blah</Typography>
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
