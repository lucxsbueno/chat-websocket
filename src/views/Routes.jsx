import React from "react";

import {
  AnimatePresence
} from "framer-motion";

import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

//views
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Channels from "./app/Channels";
import ChannelsNew from "./app/ChannelsNew";
import ChannelsIndex from "./app/ChannelsIndex";
import AuthTemplate from "../components/templates/AuthTemplate";
import ChannelsTemplate from "../components/templates/ChannelsTemplate";
import Dashboard from "./app/Dashboard";

export const AuthRoutes = props => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AuthTemplate />}>
          <Route index element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
};

export const MainRoutes = props => {

  return (
    <Routes>
      <Route path="channels" element={<ChannelsTemplate />}>
        <Route index element={<ChannelsIndex />} />
        <Route path=":id" element={<Channels />} />
        <Route path="new" element={<ChannelsNew />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  )
};