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
  useMediaQuery,
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
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { HintBar } from "../components/HintBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#E4DFDA",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minHeight: "50vh",
  maxHeight: "50vh",
  maxWidth: "50vw",
}));

const GamePageGrid = ({ players, room, setRoom }) => {
  const { mode } = useContext(ModeContext);
  const [playerReady, setPlayerReady] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0); // if truthy then means you've guessed correctly
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
  const isMobile = useMediaQuery("(max-width: 600px)");

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

  // const handleQuitButtonClick = () => {
  //   setRoom("");
  //   // setPlayers([])
  //   socket.emit("leaveRoom");
  //   setPlayerReady(false);
  //   setTimer(0);
  //   setScore(0);
  //   setAnagramNumber(1);
  //   setRoundNumber(1);
  //   setBetweenWords(false);
  //   setBetweenRounds(false);
  //   setGameOver(false);
  //   setAnagramWords([]);
  //   setDisabledButtons([]);
  //   setFormattedAnswerArray([]);
  //   setHint("");
  //   setHintCount(0);
  //   setGameMessage("");
  //   setGameScores("");
  //   setGameScroll([]);
  //   setFullScreenCustomDialog("");
  //   setLastPlayedAnswer("");
  //   setLastRoundScores([]);
  // };

  const handleQuitButtonClick = () => {
    console.log(handleQuitButtonClick, "quit button click looking for toast");
    const confirmQuit = async () => {
      try {
        const result = await toast.promise(
          (resolve, reject) => {
            const confirmResult = window.confirm(
              "Are you sure you want to quit?"
            );
            if (confirmResult) {
              resolve("You have quit the game!");
            } else {
              reject("Cancelled");
            }
          },
          {
            loading: "Checking...",
            timeout: 5000, // Adjust the timeout as needed
            icon: "⚠️", // Customize the icon as needed
            style: {
              backgroundColor: "red", // Customize the toast background color
              color: "white", // Customize the text color
            },
          }
        );

        // User confirmed quitting
        setRoom("");
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
      } catch (error) {
        // Handle any errors here
      }
    };

    confirmQuit();
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

  const handleHintButtonClick = () => {
    // Combine the words in formattedAnswerArray into a single string
    const currentAnswer = formattedAnswerArray
      .map((word) => word.join(""))
      .join(" ");

    // Get the full anagram answer
    const fullAnswer = anagramAnswer.replace(/\s/g, "");

    // Find the index of the first incorrect character
    const firstIncorrectIndex = currentAnswer
      .split("")
      .findIndex((char, index) => char !== fullAnswer.charAt(index));

    if (firstIncorrectIndex !== -1) {
      // Extract the correct letter from the full answer
      const correctLetter = fullAnswer.charAt(firstIncorrectIndex);

      // Find the corresponding wordIndex and letterIndex in formattedAnswerArray
      let wordIndex = 0;
      let letterIndex = 0;

      for (let i = 0; i < formattedAnswerArray.length; i++) {
        const wordLength = formattedAnswerArray[i].length;
        if (firstIncorrectIndex >= letterIndex + wordLength) {
          letterIndex += wordLength;
          wordIndex++;
        } else {
          break;
        }
      }

      // Update formattedAnswerArray with the correct letter
      const updatedArray = [...formattedAnswerArray];
      updatedArray[wordIndex][letterIndex] = correctLetter;
      setFormattedAnswerArray(updatedArray);
    }
  };

  return (
    <Paper sx={{ minWidth: "80vw" }}>
      <Grid container>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: isMobile ? "25" : "100vw", // Adjusted maxWidth
              minHeight: "8em",
              margin: isMobile ? "0" : "2em",
              padding: "1em",
              textAlign: "center",
              flexDirection: "column", // Add this to make it a flex container
              alignItems: "center", // Center its children horizontally
              justifyContent: "center",
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
              maxWidth: isMobile ? "100" : "50vw", // Adjusted maxWidth
              minHeight: "8em",
              margin: isMobile ? "0" : "2em",
              padding: "1em",
              textAlign: "right",
              flexDirection: "column", 
              alignItems:"flex-end", 
              justifyContent: "flex-end",
            }}
          >
            <Container>
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
            <Container>
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
          <Item
  sx={{
    display: "flex",
    flex: 1,
    flexDirection: "column", 
    justifyContent: "flex-end",
    minHeight: "50vh",
    
  }}
>
  {gameOver ? (
    <Scoreboard
      gameScores={gameScores}
      players={players}
      setPlayerReady={setPlayerReady}
    />
  ) : (
    <>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden", 
        }}
      >
         <HintBar sx={{ minWidth: "100%", flex: 1, justifyContent: "flex-start"}}
         anagramWords={anagramWords}
         formattedAnswerArray={formattedAnswerArray}
         setFormattedAnswerArray={setFormattedAnswerArray}
          disabledButtons={disabledButtons}
          setDisabledButtons={setDisabledButtons}
          roundNumber={roundNumber}
          anagramNumber={anagramNumber}
          category={category}
          skippedOrCorrect={skippedOrCorrect}
          handleSkipButtonClick = {handleSkipButtonClick}
          handleHintButtonClick={handleHintButtonClick}
         />
        <PlayBox
          sx={{ minWidth: "100%", flex: 1 }}
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
          mode={mode}
        />
      </div>
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <PlayerControls
          sx={{ minWidth: "100%", flex: 1 }}
          handleQuitButtonClick={handleQuitButtonClick}
          handleSkipButtonClick={handleSkipButtonClick}
          skippedOrCorrect={skippedOrCorrect}
          anagramWords={anagramWords}
          setAnagramWords={setAnagramWords}
          mode={mode}
        />
      </div>
    </>
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
          <Grid item xs={6} order={{ xs: 1, md: 2 }}></Grid>
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
