import React from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { ModeContext } from "../context/Mode";
import { useTheme } from "@emotion/react";

export const LeaderBoard = () => {
  const theme = useTheme();
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    socket.on("leaderboard", (data) => {});
  }, []);
  const { mode, setMode } = useContext(ModeContext);
  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          minWidth: "25vw",
          minHeight: "8em",
          maxHeight: "40vh",
          margin: "2em",
          padding: "1em",
          textAlign: "center",
          backgroundColor:
            theme.palette.mode === "light" ? "#e4dfda" : "#252b32",
          borderRadius: "0.5em",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          overflow: "auto",
        }}
      >
        <Typography variant="h5">Single Game High Scores</Typography>
        {gameScores.map((anagram, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "1em",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "0.5em",
                overflow: "auto",
              }}
            >
              {sortedPlayers.map((player) => {
                const playerScore = anagram.scores.find(
                  (score) => score.username === player.username
                );

                if (playerScore && playerScore.score > 0) {
                  return (
                    <Box
                      key={player.username}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "0.2em",
                      }}
                    >
                      <Avatar
                        src={player.avatar}
                        sx={{ width: 24, height: 24, marginRight: "0.5em" }}
                      />
                      <Typography>
                        {player.username}: {playerScore.score} points
                      </Typography>
                    </Box>
                  );
                }

                return null;
              })}
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};
