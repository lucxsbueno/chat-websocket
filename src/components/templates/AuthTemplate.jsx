import React from "react";

import {
  Outlet
} from "react-router-dom";

import {
  motion
} from "framer-motion";

const AuthTemplate = (props) => {

  return (
    <motion.div className="signin" initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Outlet />
    </motion.div>
  );
}

export default AuthTemplate;