import { io } from "socket.io-client";
const ENV = process.env.NODE_ENV || "development";
const socket =
  ENV === "development"
    ? io("localhost:8080")
    : io("https://ainagrams-server.onrender.com");

export default socket;
