import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth.provider";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_PROD,
  timeout: process.env.REACT_APP_REQUEST_TIMEOUT
});

export const useHttp = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const bearerToken = user.token
    ? "Bearer " + user.token
    : "";

  const request = async (configObject) => {
    const { url, method, data } = configObject;

    const options = {
      url: url,
      method: method.toLowerCase(),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": bearerToken
      },
      data: data
    };

    try {
      const response = await instance(options);

      return response;
    } catch (e) {
      if (e.response.status === 401) {
        //rip snackbar

        setTimeout(() => {
          setUser({ token: "" });
          localStorage.removeItem("ws-chat-user");
          navigate("/");
        }, 1000);
      }
    }
  }

  return request;
}