import React, { useState, useEffect, useRef } from "react";

import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../utils/hooks/useHttp";
import { useParams, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../utils/providers/auth.provider";

//icons
import { ChevronDown, Send } from "react-feather";

//components
import RoundedButton from "../../components/form/RoundedButton";
import TextareaControled from "../../components/form/TextareaControled";
import Message from "../../components/messages/Message";

import socket from "../../utils/ws/connection";

const Channels = () => {
  const [message, updateMessage] = useState("");
  const [sticky, updateSticky] = useState(false);

  const { user } = useAuth()
  const request = useHttp();
  const params = useParams();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["chat", params.id], () => request({ url: "/channels/" + params.id, method: "GET" }));

  const scrollObserver = e => {
    const element = e.target;
    const totalScrollHeight = element.scrollHeight - element.clientHeight;
    //se estiver scrollado pra cima o botão aparece
    updateSticky(element.scrollTop !== totalScrollHeight);
  }

  const scrollToBottom = behavior => {
    messagesEndRef.current?.scrollIntoView({
      behavior: behavior
    });
  }

  useEffect(() => {
    scrollToBottom("auto");
  }, [params.id, data?.data]);

  useEffect(() => {
    socket.on("receive_message", wsData => {
      const cache = queryClient.getQueryData(["chat", params.id]);

      queryClient.setQueryData(["chat", params.id], () => {
        return {
          data: [...cache.data, wsData.message]
        }
      });
    });
  }, [location.state.channel.name, params.id, queryClient]);

  useEffect(() => {
    location.state.channels
      .forEach(channel => socket.emit("unsubscribe_room", { room: channel.id }));

    socket.emit("join_room", { room: params.id });
  }, [params.id, location.state.channels]);

  const sendMessage = () => {
    const messageData = {
      id: uuidv4(),
      type: "text",
      body: message,
      created_at: new Date(),
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }
    }

    socket.emit("send_message", { message: messageData, room: params.id });

    const cache = queryClient.getQueryData(["chat", location.state.channel.id]);

    queryClient.setQueryData(["chat", location.state.channel.id], () => {
      return {
        data: [...cache.data, messageData]
      }
    });

    updateMessage("");
  }

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
        {isLoading && <div className="text-color x-p-20 y-p-20">Carregando...</div>}
        {data?.data.map(message => <Message key={message.id} data={data} message={message} />)}

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

        <RoundedButton className="text-color ml-20" onClick={sendMessage}>
          <Send size={20} />
        </RoundedButton>
      </div>
    </div>
  )
}

export default Channels;