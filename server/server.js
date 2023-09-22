const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const {
  roomsMap,
  createNewRoom,
  joinMultiPlayerRoom,
  getRoomIdFromSocket,
  playerReady,
  serverTimer,
  updateRoomsMap,
  nextWord,
  timeBetweenRounds,
  timeBetweenWords,
  anagramTime,
  numOfWords,
} = require("./gameFunctions.js");
const { start } = require("repl");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    console.log(socket.id, "=", username); // This is a good one
    socket.data.username = username;
  });

  socket.on("createSinglePlayerRoom", async (callback) => {
    const roomId = `sp${socket.id}`;
    await socket.join(roomId);
    createNewRoom(socket, roomId);
    callback(roomsMap.get(roomId));
  });

  socket.on("createMultiPlayerRoom", async (callback) => {
    const roomId = `mp${socket.id}`;
    await socket.join(roomId);
    createNewRoom(socket, roomId);
    callback(roomsMap.get(roomId));
  });

  socket.on("joinMultiPlayerRoom", async (roomId, callback) => {
    const response = joinMultiPlayerRoom(socket, roomId);
    if (response.error) {
      callback(response);
      return;
    }
    await socket.join(roomId);
    socket.to(roomId).emit("updatePlayers", response.players);
    callback(response);
  });

  socket.on("allReady", () => {
    io.in(getRoomIdFromSocket(socket)).emit("startTimer");
  });

  /////////////////////

  socket.on("playerReady", () => {
    const roomPlayers = playerReady(socket);
    let playerReadyStatus = [];
    roomPlayers.forEach((player) => {
      playerReadyStatus.push(player.readyToStartRound);
    });

    if (playerReadyStatus.every((item) => item)) {
      const roomId = getRoomIdFromSocket(socket);

      io.in(roomId).emit("allPlayersReady");

      const endGame = () => {
        const roomData = roomsMap.get(roomId);

        io.in(roomId).emit("endGame", roomData.anagrams);
        io.in(roomId).emit("gameScroll", `Game over!`);
      };

      const startGameTimer = () => {
        io.in(roomId).emit("betweenWordsCountdown", timeBetweenWords);
        io.in(roomId).emit(
          "fullScreenCustomDialog",
          "Game starting. First word coming up..."
        );
        serverTimer(timeBetweenWords, roomId, anagramTimer, nextWord);
      };

      const anagramTimer = () => {
        const roomData = roomsMap.get(roomId);

        io.in(roomId).emit(
          "anagram",
          anagramTime,
          roomData.anagrams[roomData.currentWord].anagram,
          roomData.anagrams[roomData.currentWord].answer,
          roomData.round
        );

        serverTimer(
          anagramTime,
          roomId,
          roomData.currentWord <= 1
            ? betweenWordTimer
            : (roomData.currentWord + 1) % 3 === 0
            ? betweenRoundTimer
            : betweenWordTimer
        );
      };

      const betweenWordTimer = () => {
        const roomData = roomsMap.get(roomId);

        if (roomData.currentWord >= numOfWords) {
          endGame();
          return;
        }

        io.in(roomId).emit("betweenWordsCountdown", timeBetweenWords);
        io.in(roomId).emit("fullScreenCustomDialog", [`Last Answer: ${roomData.anagrams[roomData.currentWord-1].answer}`,"Next word coming up..."]);

        serverTimer(timeBetweenWords, roomId, anagramTimer, nextWord);
      };

      const betweenRoundTimer = () => {
        const roomData = roomsMap.get(roomId);

        if (roomData.currentWord >= numOfWords) {
          endGame();
          return;
        }

        io.in(roomId).emit("betweenRoundsCountdown", timeBetweenRounds);
        io.in(roomId).emit(
          "fullScreenCustomDialog",
          "Take a little break, here are the scores from the last 3 words"
        );
        serverTimer(timeBetweenRounds, roomId, anagramTimer, nextWord);
      };

      io.in(roomId).emit("updatePlayers", roomPlayers);

      startGameTimer();
    } else {
      io.in(getRoomIdFromSocket(socket)).emit("updatePlayers", roomPlayers);
    }
  });

  socket.on("anagramAttempt", (attempt) => {
    const attemptString = attempt
      .map((word) => {
        return word.join("");
      })
      .join(" ");

    const roomId = getRoomIdFromSocket(socket);
    const roomData = roomsMap.get(roomId);
    if (
      attemptString.toLowerCase() ===
      roomData.anagrams[roomData.currentWord - 1].answer.toLowerCase()
    ) {
      socket.emit("correctAttempt");
      roomData.anagrams[roomData.currentWord - 1].scores.push(
        socket.data.username
      );
      updateRoomsMap(roomData);

      io.in(roomId).emit(
        "gameScroll",
        `${socket.data.username} guessed correctly`
      );
    } else {
      socket.emit("incorrectAttempt");
      io.in(roomId).emit(
        "gameScroll",
        `${socket.data.username} guessed incorrectly`
      );
    }
  });

  //   socket.on("updateScore", (anagramNumber) => {
  //     const roomId = getRoomIdFromSocket(socket);
  //     const roomData = roomsMap.get(roomId);
  //     //update room object with players score from last round
  //   });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
