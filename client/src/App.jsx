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
        "https://media.discordapp.net/attachments/995431151084773486/1029717337831637044/Lars_von_Retriever_Angel_of_Death_muppet_in_a_surgeons_dressing_e7d57624-5ba7-48a1-a292-9552772a0ee7.png?width=1558&height=1038",
      username: "phil",
      score: 42,
      id: "ANOTHERONE",
    },
    {
      avatar_alt: "Orc holding Simba",
      avatar:
        "https://media.discordapp.net/attachments/1139863387476598855/1153347556286414980/ulysses.123_An_Orc_from_Lord_of_the_Rings_as_a_weed_dealer_Ston_936ed9c2-6f7a-41b2-81c9-dd7cbddd71c3.png?width=581&height=1036",
      username: "chris",
      score: 500,
      id: "MOREID",
    },
  ]);

  useEffect(() => {
    socket.on("playerJoined", (players) => {
      setPlayers(players);
    });
  }, []);

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
