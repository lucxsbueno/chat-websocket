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
import Home from "./app/Home";
import Chats from "./app/Chats";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import AuthTemplate from "../components/templates/AuthTemplate";
import DashTemplate from "../components/templates/DashTemplate";

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
        <Route path="/" element={<DashTemplate />}>
          <Route index element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
};