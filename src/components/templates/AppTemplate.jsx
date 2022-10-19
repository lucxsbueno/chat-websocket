import React from "react";

import AppNav from "../default/AppNav";
import { Power } from "react-feather";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/providers/auth.provider";
import RoundedButton from "../../components/form/RoundedButton";

const AppTemplate = props => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const doLogout = () => {
    setUser({ token: "" });
    localStorage.removeItem("ws-chat-user");
    navigate("/");
  }

  return (
    <div className="app__template">
      <div>
        <div className="app__header app__header--bg-01">
          <div className="d-flex flex-row align-center">
            <AppNav />
          </div>

          <div className="d-flex flex-row align-center">
            <Link to="/account" className="app__badge mr-10">
              <span className="app__badge__title">{user.name}</span>

              <div className="chat__avatar__wrapper">
                <img alt="" className="chat__avatar__img" src={user.avatar} />
              </div>
            </Link>

            <RoundedButton className="text-color" onClick={doLogout}>
              <Power size={20} />
            </RoundedButton>
          </div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppTemplate;