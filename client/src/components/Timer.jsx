import * as React from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import socket from "../socket";

export const Timer = ({ timer, playerReady, setPlayerReady, sx }) => {
  return (
    <Box sx={ sx }>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        {timer} Seconds{" "}
      </Typography>
      {!playerReady && (
        <Button sx={{fontSize: "large", padding: "0"}}
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
 