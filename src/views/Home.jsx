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
    setUser({
      id: "",
      name: "",
      token: ""
    });

    localStorage.removeItem("user");
  }

  return (
    <motion.div initial={framer.initial} animate={framer.animate} exit={framer.exit}>
      <h1 className="u-h1">Home</h1>
      <button onClick={doLogout}>Sair</button>
    </motion.div>
  )
}

export default Home;