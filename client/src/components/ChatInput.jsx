import { useState } from "react";
import { TextField, Button, FormControl, Input } from "@mui/material";
import socket from "../socket";

const ChatInput = () => {
  const [chatBoxInput, setChatBoxInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (chatBoxInput) {
      socket.emit("gameChat", chatBoxInput);
      setChatBoxInput("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ width: "80%" }}>
        <TextField
          id="outlined-basic"
          label="Chat"
          variant="outlined"
          onChange={(e) => {
            setChatBoxInput(e.target.value);
          }}
          value={chatBoxInput}
        />
        <Button type="submit" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default ChatInput;
