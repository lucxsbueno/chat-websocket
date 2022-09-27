import axios from "axios";

import {
  useAuth
} from "../providers/auth.provider";

const BASE_URL = "http://localhost:5000";

const useAxiosInstance = () => {
  //auth
  const {
    user
  } = useAuth();

  const AUTHORIZATION = user.token
    ? `Bearer ${user.token}`
    : "Bearer";

  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION
    }
  });

  return instance;
}

export default useAxiosInstance;