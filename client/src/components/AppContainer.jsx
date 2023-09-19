import { Box } from "@mui/material";
import InitGame from "../pages/InitGame";
import Login from "../pages/Login";
import GamePageGrid from "../pages/GamePageGrid";

const AppContainer = ({ room, setRoom, username, setUsername, setPlayers }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {username ? (
        room ? (
          <GamePageGrid />
        ) : (
          <InitGame room={room} setRoom={setRoom} setPlayers={setPlayers} />
        )
      ) : (
        <Login setUsername={setUsername} />
      )}
    </Box>
  );
};

export default AppContainer;
