import axios from "axios";

const apiPath = import.meta.env.VITE_API_PATH;

const API = axios.create({
  baseURL: apiPath,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use(
  (config) => {
    // const token = readJWT();
    // if (!token || !config.headers) return config;
    // config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    // Respuesta con status == 2xx

    return response;
  },
  (error) => {
    // if (error.response.status === 401) { // Unauthorized, tiene que volver e loguearse con cidi
    //   cleanToken();
    //   unauth();
    // }
    return Promise.reject(error);
  }
);

export default API;
