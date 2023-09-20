import { useState } from "react";
import socket from "../socket";
import LetterArrayComponent from "../components/Test";

const Login = ({ setUsername }) => {
  const [usernameInput, setUsernameInput] = useState("");

  return (
    <div>
      <h2>This is the login component</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUsername(usernameInput);
          socket.emit("username", usernameInput);
          setUsernameInput("");
        }}
      >
        <label htmlFor="username"> Set a username:</label>
        <input
          id="username"
          value={usernameInput}
          onChange={(e) => {
            setUsernameInput(e.target.value);
          }}
        ></input>
        <button>Submit Username</button>
      </form>
      <LetterArrayComponent />
    </div>
  );
};

export default Login;
