import React from "react";

import {
  Route,
  Routes
} from "react-router-dom";

//views
import Signin from "./Signin";
import Signup from "./Signup";

const MainRoutes = (props) => (
  <Routes>
    <Route path="/" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);


export default MainRoutes;