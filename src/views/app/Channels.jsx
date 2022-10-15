import React, { useState, useEffect, useRef } from "react";

import { useHttp } from "../../utils/hooks/useHttp";
import { useSnackbar } from "react-simple-snackbar";
import { useTyping } from "../../utils/hooks/useTyping";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/providers/auth.provider";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

//icons
import { ChevronDown, Send } from "react-feather";

//components
import Messages from "../../components/messages/Messages";
import RoundedButton from "../../components/form/RoundedButton";
import TextareaControled from "../../components/form/TextareaControled";

import cuid from "cuid";
import socket from "../../utils/ws/connection";
import options from "../../utils/config/snackbar.config";

const Channels = () => {
  const [message, updateMessage] = useState("");
  const [sticky, updateSticky] = useState(false);
  const [openSnackbarError] = useSnackbar(options("error"));

  const { user } = useAuth();
  const request = useHttp();
  const params = useParams();
  const typing = useTyping();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  //all chats
  const { data, isLoading } = useQuery(["chat", params.id], () => request({ url: "/channels/" + params.id, method: "GET" }), {
    refetchOnWindowFocus: false
  });

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
    const behavior = "auto";
    scrollToBottom(behavior);
  }, [params.id, data?.data]);

  useEffect(() => {
    socket.on("receive_message", socketData => {
      const cache = queryClient.getQueryData(["chat", params.id]);

      if (socketData.message.id !== cache.data[cache.data.length - 1].id) {
        queryClient.setQueryData(["chat", params.id], () => {
          return {
            data: [...cache.data, socketData.message]
          }
        });
      } 
    });
  }, [location.state.channel.name, params.id, queryClient]);

  useEffect(() => {
    location.state.channels
      ?.forEach(channel => socket.emit("unsubscribe_room", { room: channel.id }));

    socket.emit("join_room", { room: params.id });
  }, [params.id, location.state.channels]);

  /**
   *
   *
   *
   *
   *
   * Enviar a mensagem
   */
  const sendMessage = () => {
    const messageData = {
      id: cuid(),
      type: "text",
      body: message,
      created_at: new Date(),
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar
      }
    }

    mutate({
      id: cuid(),
      type: "text",
      body: message,
      user_id: user.id,
      chat_id: location.state.channel.chat.id
    });

    socket.emit("send_message", { message: messageData, room: params.id });

    const cache = queryClient.getQueryData(["chat", location.state.channel.id]);

    queryClient.setQueryData(["chat", location.state.channel.id], () => {
      return {
        data: [...cache.data, messageData]
      }
    });

    updateMessage("");
  }

  const onSendMessage = message => request({ url: `/channels/${params.id}/message`, method: "POST", data: { message } });

  const { mutate } = useMutation(onSendMessage, {
    onError: error => {
      if (error.response) {
        openSnackbarError(error.response.data.message);
      } else {
        openSnackbarError("Erro interno do servidor.");
      }
    },
    onSettled: () => { }
  });

  const onTyping = () => {
    socket.emit("typing", { user: user.name, room: params.id });
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

      <div className="chat__bottom">
        <div className="chat__feedback">
          {typing && <div className="text-color x-p-20 mt-10">{typing}</div>}
        </div>
        <div className="chat__footer">
          <TextareaControled value={message} onChange={e => updateMessage(e.target.value)} onKeyPress={onTyping}
            placeholder={`Enviar uma mensagem no canal ${location.state.channel.name.toLowerCase()} 🤩`} />

          <RoundedButton className="text-color ml-20" onClick={sendMessage}>
            <Send size={20} />
          </RoundedButton>
        </div>
      </div>
    </div>
  )
}

export default Channels;