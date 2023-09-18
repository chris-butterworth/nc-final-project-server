import { Box } from "@mui/material";
import PlayerSelector from "../components/PlayerSelector";

const HomePage = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <PlayerSelector />
    </Box>
  );
};

export default HomePage;
