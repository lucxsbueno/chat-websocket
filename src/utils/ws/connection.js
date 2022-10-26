import io from "socket.io-client";

const socket = io.connect(process.env.PROD);

export default socket;