import { useState, useEffect } from "react";

export const useGroupMessages = messages => {
  const [groupMessages, setGroupMessages] = useState(null);
  const [hasMessages, setHasMessages] = useState(false);
  const [firstDate, setFirstDate] = useState("");

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

      setGroupMessages(groups);
      setFirstDate(Object.entries(groups).length > 0 ? Object.entries(groups)[0][0] : "");
      setHasMessages(Object.entries(groups).length > 0);
    }
    // eslint-disable-next-line
  }, [messages]);

  return { hasMessages, groupMessages, firstDate };
}