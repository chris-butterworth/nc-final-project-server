import { useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ModeContext } from "./context/Mode.jsx";
import { Paper } from "@mui/material";
import NavBar from "./components/NavBar";
import AppContainer from "./components/AppContainer";
import TutorialPage from "./pages/TutorialPage";
import { TheBuild } from "./pages/TheBuild.jsx";
import "./App.css";
import socket from "./socket.js";
import matrix from "./assets/matrix.gif";
import light from "./assets/light.avif";
import MultiTutorial from "./pages/MultiTutorial.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { Footer } from "./components/Footer.jsx";

function App() {
  const { mode } = useContext(ModeContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName);
        socket.emit("avatar", user.photoURL);
        socket.emit("username", user.displayName);
      } else {
        setUsername("");
        socket.emit("leaveRoom");
      }
    });
    return () => {
      listen();
    };
  }, [auth]);

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
            {/* <Route path="/tutorial/single" element={<SingleTutorial />} /> */}
            <Route path="/thebuild" element={<TheBuild/>} />
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
          </Routes>
          <Footer/>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
