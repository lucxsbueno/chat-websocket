import React from "react";

import {
  motion
} from "framer-motion";

import {
  useAuth
} from "../utils/providers/auth.provider";

const framer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const Home = () => {
  const { setUser } = useAuth();

  const doLogout = () => {
    setUser({ token: "" });

    localStorage.removeItem("user");
  }

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
        </div>

        <div className="app__container app__header--bg-03">
          <div className="app__header">
            <h2 className="p-sm fw-5">Tecnologia</h2>
            <div className="x-p-20 y-p-20">
              <button onClick={doLogout}>Fazer logout</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Home;