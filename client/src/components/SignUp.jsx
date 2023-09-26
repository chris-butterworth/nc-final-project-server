import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  FormControl,
  InputLabel,
  Typography,
  Input,
  Box,
  Paper,
} from "@mui/material";
const SignUp = ({ setUsername, avatars, currentAvatarIndex }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    if (!newUsername) {
      toast("Please enter a username");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: newUsername,
          photoURL: avatars[currentAvatarIndex],
        })
          .then(() => {
            setUsername(auth.currentUser.displayName);
            socket.emit("avatar", auth.currentUser.photoURL);
            socket.emit("username", auth.currentUser.displayName);
          })
          .catch((error) => {});
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === "auth/weak-password") {
          toast("Password must be over six characters");
        } else if (err.code === "auth/email-already-in-use") {
          toast("Email already in use");
        } else if (err.code === "auth/invalid-email") {
          toast("Please enter a valid email");
        }
      });
  };
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
      <FormControl sx={{ width: "80%" }}>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          type="text"
          value={newUsername}
          onChange={(e) => {
            setNewUsername(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl sx={{ width: "80%" }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl sx={{ width: "80%" }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>

        <Button onClick={signUp}>sign up</Button>
      </FormControl>
    </Paper>
  );
};

export default SignUp;
