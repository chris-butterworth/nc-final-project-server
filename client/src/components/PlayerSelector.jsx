import * as React from "react";
import { Link } from "react-router-dom";
import { Typography, Paper, Box } from "@mui/material";
import { PersonIcon, GroupIcon, SchoolIcon } from "@mui/icons-material";
import socket from "../socket";

const PlayerSelector = ({ setRoom }) => {
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
                setRoom(room);
               
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
          <Link to={`/game-grid`} style={{ textDecoration: "none" }}>
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
              <Typography variant="h3">Multi-Player</Typography>
            </Paper>
          </Link>
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

export default PlayerSelector;
