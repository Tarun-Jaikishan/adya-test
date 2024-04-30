import axios from "axios";
import Cookie from "js-cookie";

const ax = axios.create({
  baseURL: `${import.meta.env.VITE_API_LINK}`,
  withCredentials: true,
  //   headers: {
  //     "Content-Type": "application/json",
  //   }
});

ax.interceptors.request.use(
  (config) => {
    const token = Cookie.get("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ax.interceptors.response.use(
//   (config) => {
//     const token = sessionStorage.getItem("access_token");
//     if (token) config.headers.Authorization = `Bearer ${token}`;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { ax };
