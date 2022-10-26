import React, { useRef, useEffect, Fragment } from "react";

import { useScroll } from "../../utils/hooks/useScroll";
import { ChevronDown } from "react-feather";

//components
import Messages from "./Messages";
import RoundedButton from "../form/RoundedButton";

const ChatMessages = props => {
  const { isLoading, data } = props;

  const messagesEndRef = useRef(null);
  const { sticky, scrollObserver } = useScroll();

  const scrollToBottom = behavior => {
    messagesEndRef.current?.scrollIntoView({
      behavior: behavior
    });
  }

  useEffect(() => {
    const behavior = "auto";
    scrollToBottom(behavior);
  }, []);

  return (
    <Fragment>
      <div className="chat__body pt-20" onScroll={e => scrollObserver(e)}>
        {isLoading && <div className="text-color x-p-20 y-p-20">Carregando...</div>}

        {/* {data?.data.map(message => <Message key={message.id} data={data} message={message} />)} */}

        {!isLoading && <Messages messages={data} />}

        <div ref={messagesEndRef} />
      </div>

      <div className="position-relative">
        {sticky && <RoundedButton onClick={() => scrollToBottom("smooth")}
          className="btn__scroll-to-bottom text-color">
          <ChevronDown />
        </RoundedButton>}
      </div>
    </Fragment>
  );
}

export default ChatMessages;