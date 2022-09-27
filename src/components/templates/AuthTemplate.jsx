import React from "react";

import {
  motion
} from "framer-motion";

import {
  Outlet
} from "react-router-dom";

const framer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const AuthTemplate = (props) => {

  return (
    <motion.div className="auth" initial={framer.initial} animate={framer.animate} exit={framer.exit}>
      <Outlet />
    </motion.div>
  );
}

export default AuthTemplate;