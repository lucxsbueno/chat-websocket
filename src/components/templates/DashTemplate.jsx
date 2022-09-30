import React from "react";

import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

const framer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const DashTemplate = () => {

  return (
    <motion.div className="app" initial={framer.initial} animate={framer.animate} exit={framer.exit}>
      <div className="app__wrapper">
        <div className="app__menu">
          <div className="app__header app__header--bg-02">
            <h2 className="heading-sm">Channels</h2>
          </div>
          <div className="app__menu-body">
            <div className="x-p-20 y-p-20">
              Dentro do menu
            </div>
          </div>
          <div className="app__menu-footer">

          </div>
        </div>

        <div className="app__container">
          <Outlet/>
        </div>
      </div>
    </motion.div>
  );
}

export default DashTemplate;