import { io } from "socket.io-client";

// const socket = io("https://ainagrams-server.onrender.com");
const socket = io("localhost:8080"); 
//
export default socket;