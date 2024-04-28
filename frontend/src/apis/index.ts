import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Cookies.remove("auth_token");
      window.location.href = "/";
    }
    return error;
  }
);

export { api };
