import io from "socket.io-client";

const socket = io.connect("https://chat-websocket-backend2.herokuapp.com");

export default socket;