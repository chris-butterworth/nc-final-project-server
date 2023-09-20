import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import { Typography } from "@mui/material";
import socket from "../socket";

export const Timer = ({ timer, playerReady, setPlayerReady }) => {

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        {timer} Seconds{" "}
      </Typography>
      {!playerReady && (
        <button
          onClick={(e) => {
            socket.emit("playerReady");
            setPlayerReady(true);
          }}
        >
          Ready
        </button>
      )}
    </Box>
  );
};

 
