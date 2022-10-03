import React from "react";

import { useHttp } from "../utils/hooks/useHttp";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data: res, status, error } = useQuery(["users"], () => getUsers());
  
  const fetch = useHttp();

  const getUsers = () => fetch({ url: "/users", method: "GET" });

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="list-wrapper">
      testando
      <ul>
        {res.data.map((user) => (
          <li>{user.name} - <strong>{user.email}</strong></li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard;