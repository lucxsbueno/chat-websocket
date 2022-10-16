import React from "react";

import { NavLink } from "react-router-dom";

const AppNav = props => {

  return (
    <nav className="nav">
      <ul className="nav__menu">
        <li className="nav__item">
          <NavLink to="/channels" className="nav__link">
            Canais
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/friends" className="nav__link">
            Amigos
          </NavLink>
        </li>

        <li className="nav__item">
          <NavLink to="/notifications" className="nav__link">
            Notificações
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;