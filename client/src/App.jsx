import { useState, useContext, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { ModeContext } from "./context/Mode.jsx";
import { Paper } from "@mui/material";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import TutorialPage from "./pages/TutorialPage";
import GamePage from "./pages/GamePage";
import GamePageGrid from "./pages/GamePageGrid";
import './App.css'
import socket from "./socket";


function App() {
  const { mode } = useContext(ModeContext);

  useEffect (() => {
    socket.on("playerJoined", ()=> {
      console.log("socketId", socket.id )
    })
  },[])

  return (
    <>
      <ThemeProvider theme={mode}>
        <Paper
          sx={{
            minHeight: "100vh",
            width: "100vw",
            margin: 0,
            borderRadius: 0,
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/game-grid" element={<GamePageGrid />} />
          </Routes>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;

