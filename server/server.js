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
} = require("./gameFunctions.js");

const app = express();

const server = http.createServer(app);

const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: "*",
});

io.on("connection", (socket) => {
  socket.on("username", (username) => {
    console.log(socket.id, "=", username);
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
      const roomData = roomsMap.get(roomId);

      io.in(roomId).emit("allPlayersReady");

      let currentAnagramNumber = 0;

      let endMatch = () => {
        io.in(roomId).emit("endMatch", roomData.anagrams);
      };

      let roundCountdown = () => {
        io.in(roomId).emit("roundCountdown", 3, "Next word coming up...");
        serverTimer(3, roomId, roundInProgress);
      };

      let roundInProgress = () => {
        if (currentAnagramNumber >= 3) {
          endMatch();
          return;
        }
        io.in(roomId).emit(
          "anagram",
          15,
          roomData.anagrams[currentAnagramNumber].anagram,
          roomData.anagrams[currentAnagramNumber++].answer
        );

        io.in(roomId).emit("gameData", roomData.game);
        serverTimer(15, roomId, roundCountdown);
      };

      io.in(roomId).emit("updatePlayers", roomPlayers);
      roundCountdown();
    } else {
      io.in(getRoomIdFromSocket(socket)).emit("updatePlayers", roomPlayers);
    }
  });

  socket.on("anagramAttempt", (attempt) => {

    const attemptString = attempt.map((word) => {
      return word.join('')
    }).join(' ')

    // if (attemptString !== )
  });

  socket.on("updateScore", (anagramNumber) => {
    const roomId = getRoomIdFromSocket(socket);
    const roomData = roomsMap.get(roomId);
    //update room object with players score from last round
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
