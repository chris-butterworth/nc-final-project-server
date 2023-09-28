import { useState } from "react";
import socket from "../socket";

import {
  Paper,
  Tab,
  Tabs,
  Typography,
  Box,
  
  useMediaQuery,
} from "@mui/material";
import AvatarGallery from "../components/AvatarGallery";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { SignUp } from "../components/SignUp";
import { SignIn } from "../components/SignIn";
import { SignInAsGuest } from "../components/SignInAsGuest";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ setUsername }) => {
  
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [avatars, setAvatars] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const isMobile = useMediaQuery("(max-width: 600px)");

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
       
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom:'2em',
          paddingTop:'2em',
          minHeight: isMobile ? "auto" : "70vh",
        
          minWidth:'365px'
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            width: "80%",
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
          <Tab
            label={
              <Typography
                variant={isMobile ? "body2" : "h6"} 
              >
                Guest
              </Typography>
            }
          />
          <Tab label={<Typography variant={isMobile ? "body2" : "h6"}>Sign In</Typography>} />
          <Tab label={<Typography variant={isMobile ? "body2" : "h6"}>Sign Up</Typography>} />
        </Tabs>

        <Box
          sx={{
            width: "100%",
            padding: isMobile ? "0.5em" : "2em",
          }}
        >
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
      <Toaster />
    </Box>
  );
};

export default Login;
