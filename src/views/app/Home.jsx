import React from "react";

import { useAuth } from "../../utils/providers/auth.provider";

const Home = () => {
  const { setUser } = useAuth();

  const doLogout = () => {
    setUser({ token: "" });
    localStorage.removeItem("ws-chat-user");
  }

  return (
    <div className="app__header app__header--bg-03">
      <h2 className="p-sm fw-5">Tecnologia</h2>
      <div className="x-p-20 y-p-20">
        <button onClick={doLogout}>Fazer logout</button>
      </div>
    </div>
  )
}

export default Home;