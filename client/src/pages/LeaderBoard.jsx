import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {
  Typography,
  Avatar,
  Container,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from "@mui/material";
import socket from "../socket";
import { useState, useEffect, useContext } from "react";
import { ModeContext } from "../context/Mode";
import { useTheme } from "@emotion/react";

export const LeaderBoard = () => {
  const theme = useTheme();
  const [lifetimeLeaderboard, setLifetimeLeaderboard] = useState();
  const [highScoreLeaderboard, setHighScoreLeaderboard] = useState();
  const { mode, setMode } = useContext(ModeContext);

  useEffect(() => {
    socket.emit("liftimeLeaderboard", (lifetimeScores) => {
      setLifetimeLeaderboard(lifetimeScores);
    });
  }, []);

  useEffect(() => {
    socket.emit("highScoreLeaderboard", (highScores) => {
      setHighScoreLeaderboard(highScores);
    });
  }, []);

  return (
    <Box>
      <Paper
        elevation={3}
        label="Single Game High Scores"
        sx={{
          maxWidth: "600px",
          maxHeight: "30em",
          margin: "auto",
          marginBottom: "1em",
          marginTop: "1em",
          padding: "1em",
          textAlign: "center",
          backgroundColor:
            theme.palette.mode === "light" ? "#e4dfda" : "#252b32",
          borderRadius: "0.5em",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ paddingBottom: "0.2em" }}>
          Single Game High Scores
        </Typography>
        <TableContainer
          sx={{
            overflow: "auto",
          }}
        >
          <TableBody>
            {highScoreLeaderboard &&
              highScoreLeaderboard.map((player, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
                    <Avatar
                      src={player.avatar_url}
                      sx={{
                        width: 24,
                        height: 24,
                        marginRight: "0.5em",
                      }}
                    />
                  </TableCell>
                  <TableCell>{player.username}</TableCell>
                  <TableCell>{player.high_score} points</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableContainer>
      </Paper>

      <Paper
        elevation={3}
        label="Single Game High Scores"
        sx={{
          maxWidth: "600px",
          maxHeight: "30em",
          marginBottom: "1em",
          marginTop: "1em",
          margin: "auto",
          padding: "1em",
          textAlign: "center",
          backgroundColor:
            theme.palette.mode === "light" ? "#e4dfda" : "#252b32",
          borderRadius: "0.5em",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ paddingBottom: "0.2em" }}>
          Lifetime Points
        </Typography>
        <TableContainer
          sx={{
            overflow: "auto",
          }}
        >
          <TableBody>
            {lifetimeLeaderboard &&
              lifetimeLeaderboard.map((player, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {" "}
                    <Avatar
                      src={player.avatar_url}
                      sx={{
                        width: 24,
                        height: 24,
                        marginRight: "0.5em",
                      }}
                    />
                  </TableCell>
                  <TableCell>{player.username}</TableCell>
                  <TableCell>{player.lifetime_score} points</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </TableContainer>
      </Paper>
    </Box>
  );
};
