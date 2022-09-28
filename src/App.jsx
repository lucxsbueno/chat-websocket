import React from "react";

import SnackbarProvider from "react-simple-snackbar";

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

  return (
    <SnackbarProvider>
      {isLogged}
    </SnackbarProvider>
  );
};

export default App;
