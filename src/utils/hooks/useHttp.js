import axios from "axios";

import {
  useAuth
} from "../providers/auth.provider";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_DEV,
  timeout: process.env.REACT_APP_REQUEST_TIMEOUT
});

export const useHttp = () => {
  //auth
  const {
    user
  } = useAuth();

  const bearerToken = user.token
    ? "Bearer " + user.token
    : "";

  return fetch = async (configObject) => {
    const {
      url,
      method,
      data
    } = configObject;

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

    const response = await instance(options);

    return response;
  }
}