import * as React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { PlayerListCard } from "./PlayerListCard";

export const PlayerList = ({ players }) => {
  const sortedPlayers = (players) => {
    players.sort((a, b) => {
      return b.score - a.score;
    });
  };
  console.log(sortedPlayers(players));
  console.log(players);
  return (
    <>
      <Typography variant="h4">Leaderboard</Typography>
      {players.map((player, index) => {
        return (
          <PlayerListCard
            player={player}
            key={`player-card-${index}`}
            position={index + 1}
          />
        );
      })}
    </>
  );
};
