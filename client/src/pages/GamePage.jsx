import { Box, Paper, Typography } from "@mui/material";

const GamePage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          sx={{
            minWidth: "25vw",
            minHeight: "5vh",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Typography variant="span">i identify as a timer</Typography>
        </Paper>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Paper
          elevation={3}
          sx={{
            minWidth: "10%",
            minHeight: "50vh",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Typography variant="span">player list</Typography>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            minWidth: "60%",
            minHeight: "50vh",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Typography variant="span">play box</Typography>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            minWidth: "10%",
            minHeight: "50vh",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Typography variant="span">winners list</Typography>
        </Paper>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}></Box>
    </Box>
  );
};

export default GamePage;
