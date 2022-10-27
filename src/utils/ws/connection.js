import io from "socket.io-client";

const socket = io.connect("http://13ff-201-48-245-226.ngrok.io");

export default socket;