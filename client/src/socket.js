import { io } from "socket.io-client"; // import connection function

const socket = io("https://ainagrams-server.onrender.com"); // initialize websocket connection
// const socket = io("localhost:8080"); // initialize websocket connection
//
export default socket;
