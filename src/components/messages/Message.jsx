import React from "react";

import { useAuth } from "../../utils/providers/auth.provider";

import Me from "./Me";
import Default from "./Default";

const Message = props => {
  const { user } = useAuth();

  const { data, message } = props;
  
  const isMe = message.user.id === user.id
    ? <Me message={message} />
    : <Default message={message} data={data} />;

  return isMe;
}

export default Message;