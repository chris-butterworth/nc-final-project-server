import { useEffect, useState } from "react";
import socket from "../socket";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

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
      <button
        onClick={() => {
          setUsernameInput(
            uniqueNamesGenerator({
              dictionaries: [adjectives, animals, colors],
              length: 2,
            })
          );
        }}
      >
        Generate new random username
      </button>
    </div>
  );
};

export default Login;
