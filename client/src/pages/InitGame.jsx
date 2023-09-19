import * as React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { Typography } from "@mui/material";
import socket from "../socket";
import { useState } from "react";

const InitGame = ({ numberofPlayers, room, setRoom, setPlayers }) => {
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [joinRoomError, setJoinRoomError] = useState("");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Link
            to={`/`}
            style={{ textDecoration: "none" }}
            onClick={() => {
              socket.emit("createSinglePlayerRoom", (room) => {
                setRoom(room.roomId);
                setPlayers(room.players)
                console.log("joined room", room);
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
              <PersonIcon fontSize="large" />
              <Typography variant="h3">Single Player</Typography>
            </Paper>
          </Link>
          <Link
            to={`/`}
            style={{ textDecoration: "none" }}
            onClick={() => {
              socket.emit("createMultiPlayerRoom", (room) => {
                setPlayers(room.players)
                setRoom(room.roomId);
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
              <GroupIcon fontSize="large" />
              <Typography variant="h3">New Multi-Player</Typography>
            </Paper>
          </Link>

          <Paper
            sx={{
              minWidth: "25vw",
              minHeight: "30vh",
              margin: "2em",
              padding: "1em",
              textAlign: "center",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                socket.emit(
                  "joinMultiPlayerRoom",
                  roomCodeInput,
                  (response) => {
                    console.log(response)
                    if (response.error) return setJoinRoomError(response.message);
                    setRoom(response.roomId);
                    setPlayers(response.players);
                  }
                );
              }}
            >
              <label htmlFor="roomcode"> room code:</label>
              <input
                id="roomcode"
                value={roomCodeInput}
                onChange={(e) => {
                  setRoomCodeInput(e.target.value);
                }}
              ></input>
              <button>Submit room code</button>
            </form>
            <Typography variant="h3">Join game</Typography>
          </Paper>
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
            <SchoolIcon fontSize="large" />
            <Typography variant="h3">Tutorial</Typography>
          </Paper>
        </Link>
      </Box>
    </>
  );
};

export default InitGame;
