import * as React from "react";
import { Grid, Card } from "@mui/material";
import { Typography, Avatar } from "@mui/material";

export const PlayerListCard = ({ player, position }) => {
  return (
    <Card
      sx={{
        marginBottom: "0.5em",
        border: player.correct
          ? "3px solid green"
          : player.skipped
          ? "3px solid red"
          : "3px solid transparent",
      }}
    >
      <Grid sx={{ display: "flex" }}>
        <Grid item xs={2} md={3} sx={{ margin: "auto" }}>
          {" "}
          <Avatar
            alt={player.avatar_alt}
            src={player.avatar}
            sx={{ margin: "auto" }}
          />
        </Grid>
        <Grid item xs={10} md={9} sx={{ textAlign: "left", paddingLeft: "0.4em" }}>
          <Grid item>
            {" "}
            <Typography variant="h5">
              {position}. {player.username}
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex" }}>
            {" "}
            <Typography variant="body1" sx={{ paddingRight: "5em" }}>
              {player.totalScore}
            </Typography>
            <Typography variant="body1">{player.correct && "✔"}</Typography>
            <Typography variant="body1">{player.skipped && "✘"}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
