import { useState } from "react";
import { TextField, Button, FormControl, Input } from "@mui/material";
import socket from "../socket";

const ChatInput = () => {
  const [chatBoxInput, setChatBoxInput] = useState("");

  const handleSubmit = () => {
    if (chatBoxInput) {
      socket.emit("gameChat", chatBoxInput);
      setChatBoxInput("");
    }
  };
  return (
    <div>
      <FormControl
        sx={{
          width: "100%",
          paddingTop: "1em",
        }}
      >
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
    </div>
  );
};

export default ChatInput;
