import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/providers/auth.provider";

const Friends = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const doLogout = () => {
    setUser({ token: "" });
    localStorage.removeItem("ws-chat-user");
    navigate("/");
  }

  return (
    <div>
      <div className="app__header app__header--bg-03">
        <h2 className="p-sm fw-5">Friends</h2>
        <div className="x-p-20 y-p-20">
          <button onClick={doLogout}>Fazer logout</button>
        </div>
      </div>
      <div>
        <Link to="/channels">Channels</Link>
      </div>
    </div>
  )
}

export default Friends;