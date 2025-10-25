import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/"

const options = {
  baseURL: baseUrl,
  headers: {
    Accept: "application/json,text/plain,octet-stream,*/*",
    "Content-Type": "application/json",
  },
};

// if requests require a token
export const getToken = () => {
  return sessionStorage.getItem("token");
};

export const http = axios.create(options);

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
