import { Box } from "@mui/material";
import InitGame from "../pages/InitGame";
import Login from "../pages/Login";
import GamePageGrid from "../pages/GamePageGrid";

const AppContainer = ({
  room,
  setRoom,
  username,
  setUsername,
  players,
  setPlayers,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {username ? (
        room ? (
          <GamePageGrid players={players} />
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
