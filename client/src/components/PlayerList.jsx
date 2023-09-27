import * as React from "react";
import { Typography } from "@mui/material";
import { PlayerListCard } from "./PlayerListCard";

export const PlayerList = ({ players }) => {

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
