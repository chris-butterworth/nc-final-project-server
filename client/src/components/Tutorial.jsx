import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

const Typewriter = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const delay = 100; // Adjust the typing speed (milliseconds per character)

    const typeText = async () => {
      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        setDisplayText(text.slice(0, i + 1));
      }
      onComplete();
    };

    typeText();
  }, [text, onComplete]);

  return <Typography variant="body1">{displayText}</Typography>;
};

export const Tutorial = () => {
  const linesOfText = [
    "Welcome to the Anagram game!",
    "Each game will consist of three rounds, with each round containing three separate anagrams.",
    "The quicker you guess, the more points you get!",
    "Stuck on a question? You get 3 hints per game, so hit the hint button",
    "So stuck you're giving up? No drama, press the skip button! Be careful though, you will lose precious points!",
    "Playing with friends? Don't forget to hit up the chat!",
    "Loving the game? Sign up, and your scores will join the leaderboard!",
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [completedText, setCompletedText] = useState("");

  useEffect(() => {
    if (currentLine < linesOfText.length) {
      const lineLength = linesOfText[currentLine].length;
      const timeout = setTimeout(() => {
        setCurrentLine((prevLine) => prevLine + 1);
      }, lineLength * 100 + 1500); // Delay after each line
      return () => clearTimeout(timeout);
    } else {
      // All lines have been typed, switch to static mode
      setIsTyping(false);
    }
  }, [currentLine]);

  const onCompleteLine = () => {
    if (currentLine < linesOfText.length) {
      setCompletedText(
        (prevText) => prevText + linesOfText[currentLine] + "\n"
      );
      setCurrentLine((prevLine) => prevLine + 1); // Move to the next line
    }
  };

  return (
    <div>
      {isTyping ? (
        <Typewriter
          text={linesOfText[currentLine]}
          onComplete={onCompleteLine}
        />
      ) : (
        <Typography variant="body1">{completedText}</Typography>
      )}
    </div>
  );
};
