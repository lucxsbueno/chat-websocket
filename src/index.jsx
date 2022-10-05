import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"

import {
  BrowserRouter as Router
} from "react-router-dom";

import {
  AuthProvider
} from "./utils/providers/auth.provider";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient} >
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </QueryClientProvider>
);
