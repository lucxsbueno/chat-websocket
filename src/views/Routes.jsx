import React from "react";

import {
  AnimatePresence
} from "framer-motion";

import {
  Route,
  Routes,
  useLocation
} from "react-router-dom";

//views
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import AuthTemplate from "../components/templates/AuthTemplate";

export const AuthRoutes = (props) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AuthTemplate />}>
          <Route index element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
};

export const MainRoutes = (props) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
};