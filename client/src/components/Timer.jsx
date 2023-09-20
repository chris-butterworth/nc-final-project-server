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
import socket from "../socket";

export const Timer = ({timer, setTimer}) => {
  const Ref = useRef(null);
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor(total / 1000);
    return {
      total,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer check if less than 10 then we need to add '0' at the beginning of the variable
      setTimer(
        // (hours > 9 ? hours : '0' + hours) + ':' + (minutes > 9 ? minutes : '0' + minutes) + ':'
        seconds
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to adjust the Endtime formula we are about to code next
    setTimer("120"§);

    // If you try to remove this line the updating of timer Variable will be after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 120);
    return deadline;
  };
  
  useEffect(() => {
    socket.on("startTimer", () => {
      clearTimer(getDeadTime());
    });
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", justifyContent: "center" }}
      >
        {timer} Seconds{" "}
      </Typography>
      <button
        onClick={(e) => {
          socket.emit("startTimerRequest");
        }}
      >
        Start
      </button>
    </Box>
  );
};
