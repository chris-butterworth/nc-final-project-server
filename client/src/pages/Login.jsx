import { useEffect, useState } from "react";
import socket from "../socket";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import {
  Button,
  FormControl,
  InputLabel,
  Typography,
  Input,
  Box,
  Paper,
} from "@mui/material";
import AvatarGallery from "../components/AvatarGallery";

const Login = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");

  return (
    <Paper
      sx={{
        margin: "10vh 10vw",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "60vh",
        minWidth: "40vw",
      }}
    >
      <Typography sx={{ textAlign: "center" }} variant="h2">
        Log In
      </Typography>
      <AvatarGallery/>
      <FormControl sx={{ width: "80%" }}>
        <InputLabel sx={{ textAlign: "center" }} htmlFor="username">
          Set a username
        </InputLabel>
        <Input
          className="login-form-input"
          id="username"
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        ></Input>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setUsername(usernameInput);
            socket.emit("username", usernameInput);
            setUsernameInput("");
          }}
        >
          Submit username
        </Button>
      </FormControl>
      <Button
        sx={{ marginBottom: "10px" }}
        className="login-random-username"
        onClick={() => {
          setUsernameInput(
            uniqueNamesGenerator({
              dictionaries: [adjectives, animals, colors],
              length: 2,
            })
          );
        }}
      >
        Generate a random username
      </Button>
    </Paper>
  );
};

export default Login;
