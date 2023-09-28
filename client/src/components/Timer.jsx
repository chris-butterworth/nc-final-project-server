import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import socket from "../socket";

export const Timer = ({ timer, playerReady, setPlayerReady }) => {
  return (
    <Box >
      {playerReady && <Typography
        variant= 'h3'
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        {timer} Seconds{" "}
      </Typography>}
      {!playerReady && (
        <Button sx={{fontSize: "34px", padding: "0"}}
          onClick={() => {
            socket.emit("playerReady");
            setPlayerReady(true);
          }}
        >
          Ready
        </Button>
      )}
    </Box>
  );
};
 