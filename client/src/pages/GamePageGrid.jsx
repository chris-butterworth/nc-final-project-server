import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, Typography } from "@mui/material";
import { Timer } from "../components/Timer";
import { PlayerList } from "../components/PlayerList";
import { PlayBox } from "../components/PlayBox";
import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import CustomDialog from "../components/CustomDialog";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#E4DFDA",
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
  const [timer, setTimer] = useState(0);

  const [score, setScore] = useState(0); // if truthy then means you've guess correctly

  const [anagramNumber, setAnagramNumber] = useState(1);
  const [roundNumber, setRoundNumber] = useState(1);

  const [betweenWords, setBetweenWords] = useState(false);
  const [betweenRounds, setBetweenRounds] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [anagramWords, setAnagramWords] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [formattedAnswerArray, setFormattedAnswerArray] = useState([]);

  const [gameMessage, setGameMessage] = useState("");
  const [gameScores, setGameScores] = useState("");
  const [gameScroll, setGameScroll] = useState([]);
  const [fullScreenCustomDialog, setFullScreenCustomDialog] = useState("");
  const [lastPlayedAnswer, setLastPlayedAnswer] = useState("");
  const [lastRoundScores, setLastRoundScores] = useState([]);
  const Ref = useRef(null);

  useEffect(() => {
    socket.on(
      "fullScreenCustomDialog",
      (message, lastPlayedAnswer, scores = "") => {
        setFullScreenCustomDialog(message);
        setGameScores(scores);
        setLastPlayedAnswer(lastPlayedAnswer);
      }
    );
  }, []);

  useEffect(() => {
    socket.on("gameScroll", (message) => {
      setGameScroll((current) => {
        return [...current, message];
      });
    });
  }, []);

  useEffect(() => {
    socket.on("betweenWordsCountdown", (time) => {
      setAnagramWords([]);
      setFormattedAnswerArray([]);
      setBetweenWords(true);
      timerFunction(time);
    });
  }, []);
  useEffect(() => {
    socket.on("betweenRoundsCountdown", (time) => {
      setAnagramWords([]);
      setFormattedAnswerArray([]);
      setBetweenRounds(true);
      timerFunction(time);
    });
  }, []);
  useEffect(() => {
    socket.on("anagram", (time, anagram, answer, round) => {
      setRoundNumber(round.round);
      setAnagramNumber(round.anagram);
      setBetweenRounds(false);
      setBetweenWords(false);
      setDisabledButtons([]);
      setAnagramWords(anagram);
      setFormattedAnswerArray(
        answer
          .split(" ")
          .map((word) => Array.from({ length: word.length }, () => ""))
      );

      timerFunction(time);
    });
  }, []);

  useEffect(() => {
    socket.on("endGame", (scores) => {
      setAnagramWords([]);
      setFormattedAnswerArray([]);
      setBetweenWords(false);
      setBetweenRounds(false);
      setGameOver(true);
      setGameScores(scores);
    });
  }, []);

  useEffect(() => {
    // Tests answer validity
    if (
      disabledButtons.length > 0 &&
      disabledButtons.length === formattedAnswerArray.flat().length
    ) {
      socket.emit("anagramAttempt", formattedAnswerArray);
    }
  }, [disabledButtons]);

  useEffect(() => {
    socket.on("correctAttempt", () => {});
    setScore(1);
  }, []);
  useEffect(() => {
    socket.on("incorrectAttempt", () => {
      setDisabledButtons([]);
      setFormattedAnswerArray((current) => {
        return current.map((word) => {
          return word.map((letter) => {
            return "";
          });
        });
      });
    });
  }, []);

  const timerFunction = (time) => {
    const clearTimer = (e) => {
      setTimer(time);
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
        startTimer(e);
      }, 1000);
      Ref.current = id;
    };

    const getDeadline = () => {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + time);
      return deadline;
    };

    const startTimer = (e) => {
      let { total, seconds } = getTimeRemaining(e);
      if (total >= 0) {
        setTimer(seconds);
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

    clearTimer(getDeadline());
  };

  return (
    <Paper>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Timer
            timer={timer}
            playerReady={playerReady}
            setPlayerReady={setPlayerReady}
            sx={{ maxHeight: "25px" }}
          />
        </Box>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ maxHeight: "25px", paddingRight: "1em", cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(room);
              }}
            >
              Game Room ID: {room}
            </Typography>
            <ContentCopyIcon
              onClick={() => {
                navigator.clipboard.writeText(room);
              }}
            />
          </div>
        </Paper>
      </Box>

      <CustomDialog
        open={betweenWords}
        title={gameMessage}
        contentText={fullScreenCustomDialog}
        secondaryText={lastPlayedAnswer}
      >
        <Timer
          timer={timer}
          setTimer={setTimer}
          playerReady={playerReady}
          setPlayerReady={setPlayerReady}
          sx={{ maxHeight: "25px" }}
        />
      </CustomDialog>
      <CustomDialog
        open={betweenRounds}
        title={gameMessage}
        contentText={fullScreenCustomDialog}
        secondaryText={lastPlayedAnswer}
        roundScores={lastRoundScores}
      >
        <Timer
          timer={timer}
          setTimer={setTimer}
          playerReady={playerReady}
          setPlayerReady={setPlayerReady}
          sx={{ maxHeight: "25px" }}
        />
      </CustomDialog>
      <CustomDialog
        open={gameOver}
        title={gameMessage}
        contentText={fullScreenCustomDialog}
        // secondaryText={gameScores}
      >
        <Timer
          timer={timer}
          setTimer={setTimer}
          playerReady={playerReady}
          setPlayerReady={setPlayerReady}
          sx={{ maxHeight: "25px" }}
        />
      </CustomDialog>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} order={{ xs: 3, md: 1 }} md={3}>
            <Item sx={{ overflow: "auto" }}>
              <PlayerList players={players} />
            </Item>
          </Grid>

          <Grid item xs={12} order={{ xs: 1, md: 2 }} md={6}>
            <Item>
              <PlayBox
                sx={{ minWidth: "50vw" }}
                anagramWords={anagramWords}
                setAnagramWords={setAnagramWords}
                formattedAnswerArray={formattedAnswerArray}
                setFormattedAnswerArray={setFormattedAnswerArray}
                disabledButtons={disabledButtons}
                setDisabledButtons={setDisabledButtons}
                roundNumber={roundNumber}
                anagramNumber={anagramNumber}
              />
            </Item>
          </Grid>
        </Grid>
        <Grid item xs={12} order={{ xs: 2, md: 3 }} md={3}>
          <Item>
            <Typography variant="h4">Game Scroll </Typography>
            <Typography>
              {gameScroll.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </Typography>
          </Item>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
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
    </Paper>
  );
};

export default GamePageGrid;
