import React from "react";

import {
  useParams,
  useLocation
} from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../utils/hooks/useHttp";

const Channels = () => {
  const request = useHttp();
  const params = useParams();
  const location = useLocation();

  const { data, isLoading } = useQuery(["chat", params.id], () => request({ url: "/channels/" + params.id, method: "GET" }));

  return (
    <div>
      <div className="app__header app__header--bg-03">
        <div className="d-flex flex-row align-center justify-center">
          <div className="avatar avatar--sm mr-20">
            <img className="avatar__img" alt="Profile user information" src="https://cdn.dribbble.com/users/230875/screenshots/12078079/media/c08285d2e039896a565cffeb5eb44a15.jpg?compress=1&resize=400x300&vertical=top" />
          </div>
          <h2 className="p-sm fw-4">{location.state.channel.name}</h2>
        </div>
        <div className="x-p-20 y-p-20">
        </div>
      </div>
      <div>
        {isLoading && <div>Carregando...</div>}
        <ul>
          {data?.data.map(message => {
            return (
              <li key={message.id}>
                {message.body} - {message.user.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}

export default Channels;