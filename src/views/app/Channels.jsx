import React, { useState, useEffect, useRef } from "react";

import {
  useParams,
  useLocation
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../utils/hooks/useHttp";
import { ChevronDown, Send } from "react-feather";

//components
import RoundedButton from "../../components/form/RoundedButton";
import TextareaControled from "../../components/form/TextareaControled";
import Message from "../../components/messages/Message";

const Channels = () => {
  const [message, updateMessage] = useState("");

  const request = useHttp();
  const params = useParams();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const [sticky, updateSticky] = useState(false);

  const { data, isLoading } = useQuery(["chat", params.id], () => request({ url: "/channels/" + params.id, method: "GET" }));

  const scrollObserver = e => {
    const element = e.target;
    const totalScrollHeight = element.scrollHeight - element.clientHeight;

    updateSticky(element.scrollTop !== totalScrollHeight);
  }

  const scrollToBottom = behavior => {
    messagesEndRef.current?.scrollIntoView({
      behavior: behavior
    });
  }

  useEffect(() => {
    scrollToBottom("auto");
  }, [params.id]);

  return (
    <div className="chat">
      <div className="app__header app__header--bg-03 chat__header">
        <div className="d-flex flex-row align-center justify-center">
          <div className="avatar avatar--sm mr-20">
            <img className="avatar__img" alt="Profile user information" src="https://cdn.dribbble.com/users/230875/screenshots/12078079/media/c08285d2e039896a565cffeb5eb44a15.jpg?compress=1&resize=400x300&vertical=top" />
          </div>
          <h2 className="p-sm fw-4">{location.state.channel.name}</h2>
        </div>
        <div className="x-p-20 y-p-20">
        </div>
      </div>

      <div className="chat__body pt-20" onScroll={e => scrollObserver(e)}>
        <div className="chat__messages">
          {data?.data.map(message => <Message key={message.id} data={data} message={message} />)}
        </div>

        <div ref={messagesEndRef} />
      </div>

      <div className="position-relative">
        {sticky && <RoundedButton onClick={() => scrollToBottom("smooth")}
          className="btn__scroll-to-bottom text-color">
          <ChevronDown />
        </RoundedButton>}
      </div>

      <div className="chat__footer d-flex flex-row align-center">
        <TextareaControled value={message} onChange={e => updateMessage(e.target.value)}
          placeholder={`Enviar uma mensagem no canal ${location.state.channel.name.toLowerCase()} 🤩`} />

        <RoundedButton className="text-color ml-20">
          <Send size={20} />
        </RoundedButton>
      </div>
    </div>
  )
}

export default Channels;