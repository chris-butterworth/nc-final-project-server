import { useEffect, useState } from "react";
import socket from "../socket";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import {
  Button,
  FormControl,
  InputLabel,
  Paper,
  Tab,
  Tabs,
  Typography,
  Box,
  Input,
} from "@mui/material";
import AvatarGallery from "../components/AvatarGallery";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";
import { SignInAsGuest } from "../components/SignInAsGuest";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [avatars, setAvatars] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUsername(userCredential.user.displayName);
        socket.emit("avatar", userCredential.user.photoURL);  
        socket.emit("username", userCredential.user.displayName);
      })
      .catch((err) => {
        toast("invalid login");
      });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "60vh",
          width: "30vw",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "30vw",
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
        </Box>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          centered
          sx={{ width: "80%", marginTop: "1em" }}
        >
          <Tab label={<Typography variant="h5">Sign In As Guest</Typography>} />
          <Tab label={<Typography variant="h5">Sign In</Typography>} />
          <Tab label={<Typography variant="h5">Sign Up</Typography>} />
        </Tabs>

        <Box sx={{ width: "100%" }}>
          {selectedTab === 0 && (
            <SignInAsGuest
              avatars={avatars}
              currentAvatarIndex={currentAvatarIndex}
              setUsername={setUsername}
            />
          )}
          {selectedTab === 1 && (
            <SignIn
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              signIn={signIn}
            />
          )}
          {selectedTab === 2 && (
            <SignUp
              setUsername={setUsername}
              avatars={avatars}
              currentAvatarIndex={currentAvatarIndex}
              setSelectedTab={setSelectedTab}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
