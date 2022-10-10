import io from "socket.io-client"; 

const socket = io.connect(process.env.REACT_APP_BASE_URL_DEV);

export default socket;