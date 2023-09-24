import { Button } from "@mui/material";
import socket from "../socket";

export const Scoreboard = ({ gameScores, players, setPlayerReady }) => {
  return (
    <div>
      <Button
        onClick={() => {
          socket.emit("playerReady");
          setPlayerReady(true);
        }}
      >
        Ready for next game
      </Button>
      <ul>
        {gameScores.map((anagram) => {
          return (
            <li key={anagram.question}>
              <h3>
                {anagram.question} = {anagram.answer}
              </h3>
              <ul>
                {anagram.scores.map((player) => {
                  if (player.score)
                    return (
                      <li key={player.username}>
                        {player.username}: {player.score} points
                      </li>
                    );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
