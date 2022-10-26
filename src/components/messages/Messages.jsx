import React, { useEffect } from "react";

//components
import SenderMessages from "./SenderMessages";
import IncomingMessages from "./IncomingMessages";

import { useAuth } from "../../utils/providers/auth.provider";
import { useGroupMessages } from "../../utils/hooks/useGroupMessages";

const Messages = props => {
  const { user } = useAuth();
  const { data: messages } = props.messages;
  const { hasMessages, groupMessages } = useGroupMessages(messages);
  
  useEffect(() => { props.scroll("auto") }, [groupMessages]);

  const renderMessageGroup = (message, index) => {
    const groupMessage = message[1][0];

    return groupMessage.user.id === user.id
      ? <SenderMessages key={index} message={message} />
      : <IncomingMessages key={index} message={message} />;
  }

  return hasMessages
    && Object.entries(groupMessages).map((message, index) =>
      renderMessageGroup(message, index));
}

export default Messages;