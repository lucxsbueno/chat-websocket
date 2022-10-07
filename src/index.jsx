import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </Router>
  </QueryClientProvider>
);
