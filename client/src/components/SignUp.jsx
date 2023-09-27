import { ModeContext } from "../context/Mode";
import { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export const SignUp = ({
  setUsername,
  avatars,
  currentAvatarIndex,
  setSelectedTab,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const { mode, setMode } = useContext(ModeContext);

  const signUp = (e) => {
    e.preventDefault();
    if (!newUsername) {
      toast("Please enter a username");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: newUsername,
          photoURL: avatars[currentAvatarIndex],
        });
        setUsername(newUsername);
        socket.emit("avatar", avatars[currentAvatarIndex]);
        socket.emit("username", newUsername);
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
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "2em",
        paddingBottom: "2em",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={signUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={newUsername}
                  onChange={(e) => {
                    setNewUsername(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button variant="outlined" onClick={() => setSelectedTab(1)}>
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};
