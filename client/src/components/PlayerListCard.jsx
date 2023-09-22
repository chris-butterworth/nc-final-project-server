import * as React from "react";
import { Link } from "react-router-dom";
import { Paper, Box, Grid, Card } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { Typography, Avatar } from "@mui/material";
import { useState, useRef, useEffect } from "react";

export const PlayerListCard = ({ player, position }) => {
  return (
    <Card sx={{ marginBottom: "0.5em" }}>
      <Grid sx={{ display: "flex" }}>
        <Grid item md={3} sx={{ margin: "auto" }}>
          {" "}
          <Avatar
            alt={player.avatar_alt}
            src={player.avatar}
            sx={{ margin: "auto" }}
          />
        </Grid>
        <Grid item md={9} sx={{ textAlign: "left", paddingLeft: "0.4em" }}>
          <Grid item>
            {" "}
            <Typography variant="h5">
              {position}. {player.username}
            </Typography>
          </Grid>
          <Grid item>
            {" "}
            <Typography variant="body1">{player.totalScore}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );

};
