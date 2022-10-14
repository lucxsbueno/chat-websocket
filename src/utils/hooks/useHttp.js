import axios from "axios";

import options from "../../utils/config/snackbar.config";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import { useAuth } from "../providers/auth.provider";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_DEV,
  timeout: process.env.REACT_APP_REQUEST_TIMEOUT
});

export const useHttp = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [openSnackbarError] = useSnackbar(options("error"));

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
        openSnackbarError("A sessão expirou.");
        
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