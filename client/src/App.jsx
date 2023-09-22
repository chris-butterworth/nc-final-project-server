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

function App() {
  const { mode } = useContext(ModeContext);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [players, setPlayers] = useState([
    {
      avatar_alt: "An advanced hamster",
      avatar:
        "https://media.discordapp.net/attachments/1008571088919343124/1153344710786682960/l3x8107_draw_me_an_advanced_hamster_d812a072-2ee6-4ae1-bd23-f08c4355f781.png?width=876&height=876",
      username: "charlotte",
      score: 100000,
      id: "1OC437RgRH-Bu81NAAAT",
    },
    {
      avatar_alt: "Pudgy Penguin",
      avatar:
        "https://media.discordapp.net/attachments/1008571088919343124/1152177396225679390/l3x8107_5_game_avatars_based_on_pudgy_penguin_3eade88c-1421-4a7f-a8f8-e3e93b4e6104.png?width=876&height=876",
      username: "lex",
      score: 7,
      id: "ANOTHERID",
    },
    {
      avatar_alt: "Confused Beaver",
      avatar:
        "https://media.discordapp.net/attachments/1008571088919343124/1153345530072682516/l3x8107_a_confused_beaver_wearing_a_thinkers_cap_85cd99e8-ab6a-4d44-a70d-7756460708a4.png?width=876&height=876",
      username: "simon",
      score: 3,
      id: "IDHERE",
    },
    {
      avatar_alt: "Angel of Death laughing",
      avatar:
        "https://media.discordapp.net/attachments/1008571088919343124/1153609768309633024/l3x8107_an_angel_of_death_in_anime_style_smiling_sardonically_4d91615b-52b2-41d9-b9e4-c40916e16de8.png?width=876&height=876",
      username: "phil",
      score: 42,
      id: "ANOTHERONE",
    },
    {
      avatar_alt: "Orc holding Simba",
      avatar:
        "https://media.discordapp.net/attachments/1008571088919343124/1153610407550922842/l3x8107_an_orc_holding_simba_on_top_of_pride_rock_b200701e-f66b-4220-8e0d-8e2f638fccda.png?width=876&height=876",
      username: "chris",
      score: 500,
      id: "MOREID",
    },
  ]);

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
          }}
        >
          <NavBar />
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
          </Routes>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
