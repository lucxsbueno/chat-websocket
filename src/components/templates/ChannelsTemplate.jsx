import React from "react";

import { NavLink, Outlet } from "react-router-dom";
import { MoreVertical } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../utils/hooks/useHttp";

//components
import Dropdown from "../default/Dropdown";
import DropdownLink from "../default/DropdownLink";
import RoundedButton from "../form/RoundedButton";

const ChannelsTemplate = () => {
  const request = useHttp();

  const { data, isLoading } = useQuery(["channels"], () => request({ url: "/channels", method: "GET" }));

  return (
    <div className="app">
      <div className="app__wrapper">
        <div className="app__menu">
          <div className="app__header app__header--bg-02">
            <h2 className="heading-sm">Channels</h2>

            <Dropdown button={
              <RoundedButton>
                <MoreVertical />
              </RoundedButton>
            }>
              <DropdownLink to="/channels/new">New channel</DropdownLink>
              <DropdownLink to="/">Configurations</DropdownLink>
              <DropdownLink to="/dashboard">Dashboard</DropdownLink>
            </Dropdown>

          </div>
          <div className="app__menu-body">
            <div className="x-p-20">
              <div className="channel">
                {isLoading && <div className="channel__loading__text">Loading... Please wait!</div>}

                <ul className="channel__list">
                  {data?.data.map(channel => {
                    return (
                      <li key={channel.id} className="channel__item">
                        <NavLink to={`/channels/${channel.id}`} className="channel__link">
                          <span className="channel__title">{channel.name}</span>
                          <span className="channel__status"></span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="app__menu-footer"></div>
        </div>

        <div className="app__container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ChannelsTemplate;