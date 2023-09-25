import { Box } from "@mui/material";
import InitGame from "../pages/InitGame";
import Login from "../pages/Login";
import GamePageGrid from "../pages/GamePageGrid";
import {useEffect} from 'react'
const AppContainer = ({
  room,
  setRoom,
  username,
  setUsername,
  players,
  setPlayers,
}) => {
  useEffect(()=>{
    setRoom("") //added to refresh room when leaving page
    
  }, [])
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {username ? (
        room ? (
          <GamePageGrid players={players} room={room} />
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
