import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import {
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import socket from "../socket";
import { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { ModeContext } from "../context/Mode";


export const LeaderBoard = () => {
    const { mode, setMode } = useContext(ModeContext);
  return (
    <Box>
      <Paper>
        <Typography>The Leader Board Will Go Here</Typography>
      </Paper>
    </Box>
  );
};
