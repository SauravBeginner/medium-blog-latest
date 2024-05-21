import axios from "axios";
import { authURL, baseURL } from "./baseUrl";

const publicAxios = axios.create({
  baseURL: baseURL,
});
const authAxios = axios.create({
  baseURL: authURL,
});

publicAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      //   window.location.href = "/login";

      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { publicAxios, authAxios };
