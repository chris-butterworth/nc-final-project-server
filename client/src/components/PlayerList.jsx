import * as React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { Typography } from "@mui/material";
import { PlayerListCard } from "./PlayerListCard";
import { useEffect } from "react";

export const PlayerList = ({ players }) => {
  useEffect(() => {
    players.sort((a, b) => {
      return b.score - a.score;
    });
  }, [players]);

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
