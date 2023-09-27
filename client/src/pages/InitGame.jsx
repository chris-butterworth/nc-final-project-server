import * as React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  Divider,
} from "@mui/material";
import socket from "../socket";
import { useState, useEffect } from "react";
import { Tutorial } from "../components/Tutorial";

const InitGame = ({ room, setRoom, setPlayers }) => {
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [joinRoomError, setJoinRoomError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const roomParam = searchParams.get("room");

  useEffect(() => {
    if (roomParam) {
      socket.emit("joinMultiPlayerRoom", roomParam, (response) => {
        if (response.error) return setJoinRoomError(response.message);
        setRoomAndPlayers(response.roomId, response.players);
      });
      searchParams.delete("room");
      setSearchParams(searchParams);
    }
  }, []);

  const handleJoinRoom = () => {
    socket.emit("joinMultiPlayerRoom", roomCodeInput, (response) => {
      if (response.error) return setJoinRoomError(response.message);
      setRoomAndPlayers(response.roomId, response.players);
    });
  };

  const setRoomAndPlayers = (room, players) => {
    setRoom(room);
    setPlayers(players);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "60vw",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
                minWidth: "100",
                minHeight: "30vh",
                margin: "auto",
                padding: "1em",
                textAlign: "center",
              }}
            >
              <VideogameAssetIcon fontSize="large" color="primary" />
              <Typography variant="h3">Start New Game</Typography>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              minWidth: "100",
              minHeight: "30vh",
              margin: "auto",
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

        <Grid item xs={12} md={12}>
          <Link to="/tutorial" style={{ textDecoration: "none" }}>
            <Paper
              sx={{
                minWidth: "100",
                minHeight: "30vh",
                margin: "auto",
                padding: "1em",
                textAlign: "center",
              }}
            >
              <SchoolIcon fontSize="large" color="primary" />
              <Typography variant="h3">Tutorial</Typography>
              <Tutorial />
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InitGame;
