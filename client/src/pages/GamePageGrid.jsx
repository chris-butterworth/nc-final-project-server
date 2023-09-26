import { useContext } from "react";
import { ModeContext } from "../context/Mode";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { Timer } from "../components/Timer";
import { PlayerList } from "../components/PlayerList";
import { PlayBox } from "../components/PlayBox";
import { useState, useEffect, useRef } from "react";
import socket from "../socket";
import CustomDialog from "../components/CustomDialog";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Scoreboard } from "../components/Scoreboard";
import ChatInput from "../components/ChatInput";
import { FastForward, Close } from "@mui/icons-material";
import PlayerControls from "../components/PlayerControls";

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

const GamePageGrid = ({ players, room, setRoom }) => {
  const { mode } = useContext(ModeContext);
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
  const [hint, setHint] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [skippedOrCorrect, setSkippedOrCorrect] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
  const [gameScores, setGameScores] = useState("");
  const [gameScroll, setGameScroll] = useState([]);
  const [fullScreenCustomDialog, setFullScreenCustomDialog] = useState("");
  const [lastPlayedAnswer, setLastPlayedAnswer] = useState("");
  const [lastRoundScores, setLastRoundScores] = useState([]);
  const [category, setCategory] = useState("");

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
    socket.on("gameScroll", (username, message) => {
      setGameScroll((current) => {
        return [{ username, message }, ...current];
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
    socket.on("anagram", (time, anagram, answer, round, category) => {
      setSkippedOrCorrect(false);
      setRoundNumber(round.round);
      setAnagramNumber(round.anagram);
      setBetweenRounds(false);
      setBetweenWords(false);
      setDisabledButtons([]);
      setAnagramWords(anagram);
      setCategory(category);
      setFormattedAnswerArray(
        answer
          .split(" ")
          .map((word) => Array.from({ length: word.length }, () => ""))
      );

      timerFunction(time);
    });
  }, []);
  console.log(category);

  useEffect(() => {
    socket.on("endGame", (scores) => {
      timerFunction(0);
      setAnagramWords([]);
      setFormattedAnswerArray([]);
      setBetweenWords(false);
      setBetweenRounds(false);
      setGameOver(true);
      setGameScores(scores);
      setGameMessage("Game over!");
      setFullScreenCustomDialog("");
    });
  }, []);
  useEffect(() => {
    socket.on("newGame", () => {
      setGameOver(false);
      setAnagramWords([]);
      setFormattedAnswerArray([]);
      setBetweenWords(false);
      setBetweenRounds(false);
      setGameScores("");
      setGameMessage("");
      setFullScreenCustomDialog("");
    });
  }, []);

  useEffect(() => {
    // Tests answer validity
    if (
      disabledButtons.length > 0 &&
      disabledButtons.length === formattedAnswerArray.flat().length
    ) {
      socket.emit("anagramAttempt", formattedAnswerArray, timer, hintCount);
    }
  }, [disabledButtons]);

  useEffect(() => {
    socket.on("correctAttempt", (score) => {
      setSkippedOrCorrect(true);
      setScore(score);
    });
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

  const handleQuitButtonClick = () => {
    setRoom("");
    // setPlayers([])
    socket.emit("leaveRoom");
    setPlayerReady(false);
    setTimer(0);
    setScore(0);
    setAnagramNumber(1);
    setRoundNumber(1);
    setBetweenWords(false);
    setBetweenRounds(false);
    setGameOver(false);
    setAnagramWords([]);
    setDisabledButtons([]);
    setFormattedAnswerArray([]);
    setHint("");
    setHintCount(0);
    setGameMessage("");
    setGameScores("");
    setGameScroll([]);
    setFullScreenCustomDialog("");
    setLastPlayedAnswer("");
    setLastRoundScores([]);
  };

  const handleSkipButtonClick = () => {
    if (!skippedOrCorrect) {
      setSkippedOrCorrect(true);
      socket.emit("playerSkip");
    }
  };

  const createRoomURL = () => {
    return `${window.location.origin}?room=${room}`;
  };

  return (
    <Paper sx={{ minWidth: "80vw" }}>
      <Grid container>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Paper
            elevation={3}
            sx={{
              minWidth: "25vw",
              minHeight: "8em",
              margin: "2em",
              padding: "1em",
              textAlign: "center",
            }}
          >
            <Timer
              timer={timer}
              playerReady={playerReady}
              setPlayerReady={setPlayerReady}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <Paper
            elevation={3}
            sx={{
              minWidth: "25vw",
              minHeight: "8em",
              margin: "2em",
              padding: "1em",
              textAlign: "center",
            }}
          >
            <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography
                variant="h5"
                sx={{
                  maxHeight: "25px",
                  paddingRight: "1em",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(room);
                }}
              >
                Game Room ID: {room}
              </Typography>
              <ContentCopyIcon
                fontSize="medium"
                onClick={() => {
                  navigator.clipboard.writeText(room);
                }}
              />
            </Container>
            <Container sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography
                variant="h5"
                sx={{
                  maxHeight: "25px",
                  paddingRight: "1em",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(createRoomURL());
                }}
              >
                {createRoomURL()}
              </Typography>
              <ContentCopyIcon
                fontSize="medium"
                onClick={() => {
                  navigator.clipboard.writeText(createRoomURL());
                }}
              />
            </Container>
          </Paper>
        </Grid>
      </Grid>

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

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} order={{ xs: 3, md: 1 }} md={3}>
            <Item sx={{ overflow: "auto" }}>
              <PlayerList players={players} />
            </Item>
          </Grid>

          <Grid item xs={12} order={{ xs: 1, md: 2 }} md={6}>
            <Item>
              {gameOver ? (
                <Scoreboard
                  gameScores={gameScores}
                  players={players}
                  setPlayerReady={setPlayerReady}
                />
              ) : (
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
                  category={category}
                  skippedOrCorrect={skippedOrCorrect}
                  setSkippedOrCorrect={setSkippedOrCorrect}
                />
              )}
            </Item>
          </Grid>

          <Grid
            item
            xs={12}
            order={{ xs: 2, md: 3 }}
            md={3}
            sx={{ flexDirection: "column", alignItems: "baseline" }}
          >
            <Item sx={{ overflow: "auto" }}>
              <Grid item xs={12} md={12}>
                <Typography variant="h6">Game Scroll </Typography>
                <Box>
                  {gameScroll.map((item, index) => {
                    return (
                      <Box key={index}>
                        {item.username !== "system" && (
                          <Typography sx={{ display: "inline", color: "blue" }}>
                            {item.username}
                            {" - "}
                          </Typography>
                        )}
                        <Typography sx={{ display: "inline" }}>
                          {item.message}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={3} order={{ xs: 3, md: 1 }}></Grid>
          <Grid item xs={6} order={{ xs: 1, md: 2 }}>
            <PlayerControls
              handleQuitButtonClick={handleQuitButtonClick}
              handleSkipButtonClick={handleSkipButtonClick}
              skippedOrCorrect={skippedOrCorrect}
              anagramWords={anagramWords}
              mode={mode}
            />
          </Grid>
          <Grid item order={{ xs: 2, md: 2 }} xs={3}>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                marginLeft: "0.5em",
                marginRight: "0.5em",
                backgroundColor:
                  mode.palette.mode === "dark" ? "#1A2027" : "#E4DFDA",
              }}
            >
              <ChatInput sx={{ maxWidth: "20em", maxHeight: "10em" }} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default GamePageGrid;
