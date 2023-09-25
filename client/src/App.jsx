import { useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ModeContext } from "./context/Mode.jsx";
import { Paper } from "@mui/material";
import NavBar from "./components/NavBar";
import AppContainer from "./components/AppContainer";
import TutorialPage from "./pages/TutorialPage";
import "./App.css";
import socket from "./socket.js";
import matrix from "./assets/matrix.gif";
import light from "./assets/light.avif";
import SingleTutorial from "./pages/SingleTutorial.jsx";
import MultiTutorial from "./pages/MultiTutorial.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

function App() {
  const { mode } = useContext(ModeContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    console.log("change of user");
    socket.emit("assignUsername", username);
  }, [username]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(auth, "auth in auth");
        console.log(user.displayName, "user in auth");
        setUsername(user.displayName);
      } else {
        setUsername("");
      }
    });
    return () => {
      listen();
    };
  }, []);

  useEffect(() => {
    socket.on("updatePlayers", (players) => {
      setPlayers(players);
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={mode}>
        <Paper
          sx={{
            ...(mode.palette.mode === "dark" && {
              backgroundImage: `url(${matrix})`,
              backgroundSize: "cover",
            }),
            ...(mode.palette.mode === "light" && {
              backgroundImage: `url(${light})`,
              backgroundSize: "cover",
            }),
            minHeight: "100vh",
            minWidth: "100vh",
          }}
        >
          <NavBar
            setRoom={setRoom}
            setUsername={setUsername}
            username={username}
          />
          <Routes>
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/tutorial/single" element={<SingleTutorial />} />
            <Route path="/tutorial/multi" element={<MultiTutorial />} />
            <Route
              path="/"
              element={
                <AppContainer
                  room={room}
                  setRoom={setRoom}
                  username={username}
                  setUsername={setUsername}
                  players={players}
                  setPlayers={setPlayers}
                />
              }
            />
            <Route
              path="/room/:room_id"
              element={
                <AppContainer
                  room={room}
                  setRoom={setRoom}
                  username={username}
                  setUsername={setUsername}
                  players={players}
                  setPlayers={setPlayers}
                />
              }
            />
          </Routes>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
