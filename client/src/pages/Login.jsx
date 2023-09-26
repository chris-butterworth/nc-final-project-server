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
import {signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../../firebase";
import SignUp from "../components/SignUp";

const Login = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = (e) => {
    console.log("in function")
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
           console.log(userCredential, "user cred")
           socket.emit("avatar", avatars[currentAvatarIndex])
         }).catch((err) => {
            console.log(err)
         })
}
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
        <InputLabel htmlFor="username">Set a username (play as guest)</InputLabel>
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
      <FormControl sx={{ width: "80%" }} onSubmit = {signIn}>
        <InputLabel htmlFor="username"> Login Email:</InputLabel>
        <Input
          id="username"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        </FormControl>
        <FormControl sx={{ width: "80%" }} onSubmit = {signIn}>
        <InputLabel htmlFor="username"></InputLabel>
        <Input
          id="username"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        
        <Button
         onClick={signIn}
        >
          Submit username
        </Button>
      </FormControl>
      <SignUp setUsername={setUsername} avatars={avatars} currentAvatarIndex={currentAvatarIndex}/>

    </Paper>
  );
};

export default Login;
