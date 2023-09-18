import { Box, Typography } from "@mui/material";

const TutorialPage = () => {
  return (
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
  );
};

export default TutorialPage;
