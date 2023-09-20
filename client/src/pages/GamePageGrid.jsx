import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, Typography } from "@mui/material";
import { Timer } from "../components/Timer";
import { PlayerList } from "../components/PlayerList";
import { useState, useEffect, useRef } from "react";
import socket from "../socket";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "50vh",
  maxHeight: "50vh",
}));

const GamePageGrid = ({ players, room }) => {
  const [playerReady, setPlayerReady] = useState(false);
  const [allPlayersReady, setAllPlayersReady] = useState(false);
  const [roundStarting, setRoundStarting] = useState(false); // 3 second countdown
  const [timer, setTimer] = useState("0"); // this will change for between rounds/ in a word
  const [roundActive, setRoundActive] = useState(false); // a set of 3 words with breaks
  const [anagram, setAnagram] = useState(""); // when roundActive = true this is loaded with an anagram
  const [score, setScore] = useState(0); // if truthy then means you've guess correctly
  const [betweenWords, setBetweenWords] = useState(false); // 5 second between words
  const [anagramNumber, setAnagramNumber] = useState(0);
  const [betweenRounds, setBetweenRounds] = useState(false); // 30 seconds, can be skipped with ready
  const [roundNumber, setRoundNumber] = useState(1);
  const [gameOver, setGameOver] = useState(false); // true after 3 rounds
  const Ref = useRef(null);
  useEffect(() => {
    socket.on("startMatch", () => {
      setAllPlayersReady(true);
      setRoundStarting(true)
      timerFunction(50)
    });
  }, []);
  const timerFunction = (time) =>{
    
    console.log(time, "< int imer")
    const clearTimer = (e) => {
      // If you adjust it you should also need to adjust the Endtime formula we are about to code next
      setTimer(time.toString());
  
      // If you try to remove this line the updating of timer Variable will be after 1000ms or 1sec
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        startTimer(e);
      }, 1000);
      Ref.current = id;
    };
  
    const getDeadline = () => {
      let deadline = new Date();
  
      // This is where you need to adjust if you entend to add more time
      deadline.setSeconds(deadline.getSeconds() + time);
      return deadline;
    };
    
    const startTimer = (e) => {
      let { total, seconds } = getTimeRemaining(e);
      if (total >= 0) {
        
        setTimer(
         
          seconds
        );
      }
    };
  
    const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor(total / 1000);
      return {
        total,
        seconds,
      };
    };
  
    clearTimer(getDeadline())
  
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          sx={{
            minWidth: "25vw",
            minHeight: "5vh",
            maxHeight: "auto",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
            variant: "h3",
          }}
        >
          <Timer
            timer={timer}
            setTimer={setTimer}
            playerReady={playerReady}
            setPlayerReady={setPlayerReady}
            sx={{ maxHeight: "25px" }}
          />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            minWidth: "25vw",
            minHeight: "5vh",
            maxHeight: "auto",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
            variant: "h3",
          }}
        >
          <Typography sx={{ maxHeight: "25px" }}>
            Game Room ID: {room}
          </Typography>
        </Paper>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} order={{ xs: 3, md: 1 }} md={3}>
            <Item sx={{ overflow: "auto" }}>
              <PlayerList players={players} />
            </Item>
          </Grid>
          <Grid item xs={12} order={{ xs: 1, md: 2 }} md={6}>
            <Item>
              <Typography variant="h4">Play Box</Typography>
            </Item>
          </Grid>

          <Grid item xs={12} order={{ xs: 2, md: 3 }} md={3}>
            <Item>
              <Typography variant="h4">Winners List</Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <Paper
          elevation={3}
          sx={{
            minWidth: "25vw",
            minHeight: "5vh",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Typography variant="span">Player Controls</Typography>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            minWidth: "25vw",
            minHeight: "5vh",
            margin: "2em",
            padding: "1em",
            textAlign: "center",
          }}
        >
          <Typography variant="span">Chat Box</Typography>
        </Paper>
      </Box>
    </Box>

    // <Box sx={{ display: "flex", flexDirection: "column" }}>
    //   <Box
    //     sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    //   >
    //     <Paper
    //       elevation={3}
    //       sx={{
    //         minWidth: "25vw",
    //         minHeight: "5vh",
    //         margin: "2em",
    //         padding: "1em",
    //         textAlign: "center",
    //       }}
    //     >
    //       <Typography variant="span">i identify as a timer</Typography>
    //     </Paper>
    //   </Box>
    //   <Box sx={{ display: "flex", flexDirection: "row" }}>
    //     <Paper
    //       elevation={3}
    //       sx={{
    //         minWidth: "10%",
    //         minHeight: "50vh",
    //         margin: "2em",
    //         padding: "1em",
    //         textAlign: "center",
    //       }}
    //     >
    //       <Typography variant="span">player list</Typography>
    //     </Paper>
    //     <Paper
    //       elevation={3}
    //       sx={{
    //         minWidth: "60%",
    //         minHeight: "50vh",
    //         margin: "2em",
    //         padding: "1em",
    //         textAlign: "center",
    //       }}
    //     >
    //       <Typography variant="span">play box</Typography>
    //     </Paper>
    //     <Paper
    //       elevation={3}
    //       sx={{
    //         minWidth: "10%",
    //         minHeight: "50vh",
    //         margin: "2em",
    //         padding: "1em",
    //         textAlign: "center",
    //       }}
    //     >
    //       <Typography variant="span">winners list</Typography>
    //     </Paper>
    //   </Box>
    //   <Box sx={{ display: "flex", flexDirection: "row" }}></Box>
    // </Box>
  );
};

export default GamePageGrid;
