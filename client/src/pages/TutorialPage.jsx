import { Box, Typography, Paper } from "@mui/material";

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
        <Typography variant="span">blah blah blah blah</Typography>
      </Box>
    </Paper>
  );
};

export default TutorialPage;
