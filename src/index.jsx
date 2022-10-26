import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./utils/providers/auth.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

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
