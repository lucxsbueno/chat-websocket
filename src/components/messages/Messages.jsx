import React, { useState, useEffect } from "react";

import moment from "moment/moment";

import { useAuth } from "../../utils/providers/auth.provider";

const Messages = props => {
  const { user } = useAuth();
  const { data: messages } = props.messages;
  const [groupMessages, setGroupMessages] = useState(null);

  const renderMessageGroup = (message) => {
    const date = message[0];

    console.log(date);

    return (
      <li key={date} className="message-list__item">
        <img alt="" src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ca/ca19695d27816439b0bdb89371d20a887f845d3b_full.jpg" />
        <div className="message-container">
          {Object.values(message[1]).map(obj => renderMessage(obj, date))}

          <div className="timestamp">
            {moment(date).fromNow()}
          </div>
        </div>
      </li>
    );
  }

  const renderMessage = (obj, date) => {
    if (typeof obj != "object") return null;

    const myMessage = obj.id == user.id ? "message-list__item__message--self" : "";

    return (
      <div key={obj.id} className={"message message-list__item__message " + myMessage}>
        {obj.body}
      </div>
    );
  }

  useEffect(() => {
    if (messages.length > 0 ) {
      const firstMessage = messages[0];

      // Group messages by condition. In this case I am doing it by user
      const newMessages = messages.slice(1).reduce((previousValue, message) => {
        let lastMessages = previousValue[previousValue.length - 1];

        let lastMessage = lastMessages[lastMessages.length - 1];

        if (lastMessage.user.id === message.user.id) {
          lastMessages.push(message);

          previousValue[previousValue.length - 1] = lastMessages;
        } else {
          previousValue.push([message]);
        }

        return previousValue;
      }, [[firstMessage]]);

      // Create data structure with {key: <formatted date>, value: <grouped messages>}
      const groups = newMessages.reduce((previousValue, paramMessage) => {
        const message = paramMessage[paramMessage.length - 1];

        previousValue[message.created_at] = paramMessage;

        return previousValue;
      }, {});

      console.log(groups);

      setGroupMessages(groups);
    }
    // eslint-disable-next-line
  }, [props.messages]);

  return (
    <>
      {groupMessages && Object.entries(groupMessages).map(renderMessageGroup)}

      <h1>teste</h1>


    </>
  );
}

export default Messages;