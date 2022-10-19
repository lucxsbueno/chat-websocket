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
import Friends from "./app/Friends";
import Channels from "./app/Channels";
import Dashboard from "./app/Dashboard";
import ChannelsNew from "./app/ChannelsNew";
import Notifications from "./app/Notifications";
import ChannelsIndex from "./app/ChannelsIndex";
import AuthTemplate from "../components/templates/AuthTemplate";
import ChannelsTemplate from "../components/templates/ChannelsTemplate";
import AppTemplate from "../components/templates/AppTemplate";
import Account from "./app/Account";

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
      <Route path="/" element={<AppTemplate />}>
        <Route index element={<Dashboard />} />
        <Route path="friends" element={<Friends />} />
        <Route path="account" element={<Account />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="channels" element={<ChannelsTemplate />}>
          <Route index element={<ChannelsIndex />} />
          <Route path=":id" element={<Channels />} />
          <Route path="new" element={<ChannelsNew />} />
        </Route>
      </Route>
    </Routes>
  )
};