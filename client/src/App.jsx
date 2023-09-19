import { useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ModeContext } from "./context/Mode.jsx";
import { Paper } from "@mui/material";
import NavBar from "./components/NavBar";
import AppContainer from "./components/AppContainer";
import TutorialPage from "./pages/TutorialPage";
import "./App.css";


function App() {
  const { mode } = useContext(ModeContext);
  const [username, setUsername] = useState("hi");
  const [room, setRoom] = useState("");
  const [players, setPlayers] = useState([]);

  return (
    <>
      <ThemeProvider theme={mode}>
        <Paper
          sx={{
            minHeight: "100vh",
            borderRadius: 0,
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route
              path="/"
              element={
                <AppContainer
                  room={room}
                  setRoom={setRoom}
                  username={username}
                  setUsername={setUsername}
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
