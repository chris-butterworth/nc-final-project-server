import * as React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { Typography } from "@mui/material";

const PlayerSelector = ({ numberofPlayers }) => {
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
          <Link to={`/game`} style={{ textDecoration: "none" }}>
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
