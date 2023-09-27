import { io } from "socket.io-client";

const socket = io(
  process.env.NODE_ENV === "prod"
    ? "https://ainagrams-server.onrender.com"
    : "localhost:8080"
);
//
export default socket;
