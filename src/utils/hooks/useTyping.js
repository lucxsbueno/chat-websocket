import { useState, useEffect } from "react";

import socket from "../ws/connection";

export const useTyping = () => {
  const [typing, setTyping] = useState();
  const [allowedEmoji] = useState([..."πππ€ͺπ€π€―π΄π©π»π½π€πΎππβοΈπ€π€π€ππ­π¦π¦π"]);

  useEffect(() => {
    socket.on("user_is_typing", (user) => {
      setTyping(user + " is typing... " + [...allowedEmoji][Math.floor(Math.random() * allowedEmoji.length)]);
      
      setTimeout(() => {
        setTyping("");
      }, 3000);
    });

    return () => socket.off("user_is_typing");
    // eslint-disable-next-line
  }, []);

  return typing;
}