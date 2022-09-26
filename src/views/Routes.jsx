import React from "react";

import {
  Route,
  Routes
} from "react-router-dom";

//views
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";

export const AuthRoutes = (props) => (
  <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);


export const MainRoutes = (props) => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);