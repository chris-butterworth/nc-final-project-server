import { useState } from "react";
import { TextField, Button, FormControl } from "@mui/material";
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
      <FormControl
        sx={{
          width: "100%",
          paddingTop: "1em",
        }}
      >
        <TextField
         id="outlined-multiline-static"
         label="Chatty McGee"
         maxRows={4}
          onChange={(e) => {
            setChatBoxInput(e.target.value);
          }}
          value={chatBoxInput}
        />
        <Button type="submit">Submit</Button>
      </FormControl>
    </form>
  );
};

export default ChatInput;
