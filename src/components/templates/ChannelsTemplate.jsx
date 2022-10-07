import React from "react";

import { Outlet } from "react-router-dom";
import { MoreVertical } from "react-feather";

//components
import Dropdown from "../default/Dropdown";
import DropdownLink from "../default/DropdownLink";
import RoundedButton from "../form/RoundedButton";



const ChannelsTemplate = () => {


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
                <ul className="channel__list">
                  <li className="channel__item">
                    <a href="/" className="channel__link channel__link--active">
                      <span className="channel__title">Tecnologia</span>
                      <span className="channel__status"></span>
                    </a>
                  </li>

                  <li className="channel__item">
                    <a href="/" className="channel__link">
                      <span className="channel__title">Operacional</span>
                      <span className="channel__status"></span>
                    </a>
                  </li>

                  <li className="channel__item">
                    <a href="/" className="channel__link">
                      <span className="channel__title">Diretoria</span>
                      <span className="channel__status"></span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          <div className="app__menu-footer">

          </div>
        </div>

        <div className="app__container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ChannelsTemplate;