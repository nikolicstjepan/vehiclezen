import axios from "axios";

import * as config from "../config";
import store from "../../store";
import history from "../../history";
import { setToken } from "../../features/user/userSlice";

axios.defaults.baseURL = config.baseApiURL;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
axios.defaults.validateStatus = (status) => {
  return status < 500;
};

export const get = async (resource) => {
  const response = await axios.get(resource, {
    headers: { token: localStorage.getItem("token") },
  });

  if (response.status === 200) {
    return response.data;
  } else if (response.status === 403) {
    store.dispatch(setToken());
    history.push("/login");
  }

  return Promise.reject(response.status);
};

export const post = async (resource, data = {}) => {
  const response = await axios.post(resource, data, {
    headers: { token: localStorage.getItem("token") },
  });

  if (response.status === 201 || response.status === 200) {
    return response.data;
  } else if (response.status === 403) {
    store.dispatch(setToken());
    history.push("/login");
  }

  return Promise.reject(response.data.error);
};

export const remove = async (resource) => {
  const response = await axios.delete(resource, {
    headers: { token: localStorage.getItem("token") },
  });

  if (response.status === 200) {
    return response.data;
  } else if (response.status === 403) {
    store.dispatch();
    history.push("/login");
  }

  return Promise.reject(response.status);
};
