import React from "react";

//routes
import {
  MainRoutes,
  AuthRoutes
} from "./views/Routes";

//context
import {
  useAuth
} from "./utils/providers/auth.provider";

const App = () => {
  const {
    user
  } = useAuth();

  const isLogged = user.token
    ? <MainRoutes/>
    : <AuthRoutes/>;

  return isLogged;
};

export default App;
