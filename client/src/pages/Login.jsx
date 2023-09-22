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
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [avatars, setAvatars] = useState([]);

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
      <AvatarGallery
        avatars={avatars}
        setAvatars={setAvatars}
        currentAvatarIndex={currentAvatarIndex}
        setCurrentAvatarIndex={setCurrentAvatarIndex}
      />
      <FormControl sx={{ width: "80%" }}>
        <InputLabel htmlFor="username">Set a username</InputLabel>
        <Input
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
            socket.emit("avatar", avatars[currentAvatarIndex]);
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
