import axios from "axios";
import qs from "qs";

const api = axios.create({
  baseURL: "https://api.kinopoisk.dev/",
  headers: {
    accept: "application/json",
    "X-API-KEY": "G8REABY-1JJM9JE-NFH2A9H-Q2A36EY",
    // "X-API-KEY": "R2B4B27-4G8M3HT-GT1TMFA-JM0QG10",
    // "X-API-KEY": "4P9RGZ9-0QBM11G-GY2A4JG-44FF306",
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export default api;
