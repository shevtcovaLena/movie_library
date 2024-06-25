import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: "https://api.kinopoisk.dev/",
  headers: {
    accept: "application/json",
    "X-API-KEY": "G8REABY-1JJM9JE-NFH2A9H-Q2A36EY",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export default api;
