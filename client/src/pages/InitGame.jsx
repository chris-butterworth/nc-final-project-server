import * as React from "react";
import { Link, useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import socket from "../socket";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";

const InitGame = ({ room, setRoom, setPlayers }) => {
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [joinRoomError, setJoinRoomError] = useState("");
  const { room_id } = useParams();

  // useEffect(() => {
  //   socket.emit("avatar", auth.currentUser.photoURL)
  // }, []);

  useEffect(() => {
    if (room_id) {
      socket.emit("joinMultiPlayerRoom", room_id, (response) => {
        console.log(response);
        if (response.error) return setJoinRoomError(response.message);
        setRoomAndPlayers(response.roomId, response.players);
      });
    }
  }, []);

  const handleJoinRoom = () => {
    socket.emit("joinMultiPlayerRoom", roomCodeInput, (response) => {
      console.log(response);
      if (response.error) return setJoinRoomError(response.message);
      setRoomAndPlayers(response.roomId, response.players);
    });
  };

  const setRoomAndPlayers = (room, players) => {
    setRoom(room);
    setPlayers(players);
  };

  useEffect(() => {
    if(!auth.currentUser){
      return
    }
    socket.emit("avatar", auth.currentUser.photoURL)
    
    
  }, []);



  return (
    <>
      <Box
        sx={{
          display: "flex-wrap",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Link
                to={`/`}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  socket.emit("createSinglePlayerRoom", (room) => {
                    setRoomAndPlayers(room.roomId, room.players);
                  });
                }}
              >
                <Paper
                  sx={{
                    minWidth: "25vw",
                    minHeight: "30vh",
                    margin: "2em",
                    padding: "1em",
                    textAlign: "center",
                  }}
                >
                  <PersonIcon fontSize="large" color="primary" />
                  <Typography variant="h3">Single Player</Typography>
                </Paper>
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Link
                to={`/`}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  socket.emit("createMultiPlayerRoom", (room) => {
                    setRoomAndPlayers(room.roomId, room.players);
                  });
                }}
              >
                <Paper
                  sx={{
                    minWidth: "25vw",
                    minHeight: "30vh",
                    margin: "2em",
                    padding: "1em",
                    textAlign: "center",
                  }}
                >
                  <GroupIcon fontSize="large" color="primary" />
                  <Typography variant="h3">New Multi-Player</Typography>
                </Paper>
              </Link>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  minWidth: "25vw",
                  minHeight: "30vh",
                  margin: "2em",
                  padding: "1em",
                  textAlign: "center",
                }}
              >
                <GroupIcon fontSize="large" color="primary" />
                <Typography variant="h3">Join game</Typography>

                <FormControl>
                  <InputLabel htmlFor="roomcode">Paste room code</InputLabel>
                  <Input
                    id="roomcode"
                    value={roomCodeInput}
                    onChange={(e) => {
                      setRoomCodeInput(e.target.value);
                    }}
                  />

                  <Button
                    onClick={(e) => {
                      handleJoinRoom();
                    }}
                  >
                    Join Room
                  </Button>
                  {joinRoomError && (
                    <Typography variant="p">{joinRoomError}</Typography>
                  )}
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Link to={`/tutorial`} style={{ textDecoration: "none" }}>
          <Paper
            sx={{
              minWidth: "20vw",
              minHeight: "30vh",
              margin: "2em",
              padding: "1em",
              textAlign: "center",
            }}
          >
            <SchoolIcon fontSize="large" color="primary" />
            <Typography variant="h3">Tutorial</Typography>
          </Paper>
        </Link>
      </Box>
    </>
  );
};

export default InitGame;
