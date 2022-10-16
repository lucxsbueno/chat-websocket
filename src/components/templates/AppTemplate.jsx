import React from "react";

import { Outlet } from "react-router-dom";

import Logo from "../brand/Logo";
import AppNav from "../default/AppNav";

const AppTemplate = props => {

  return (
    <div className="app__template">
      <div>
        <div className="app__header app__header--bg-01">
          <div className="d-flex flex-row align-center">
            <Logo/>

            <AppNav />
          </div>
          <div>Perfil</div>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AppTemplate;