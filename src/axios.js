import axios from "axios";

import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const axiosApi = axios.create({
  baseURL: `https://glass-hub-back.onrender.com/api/v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line no-self-assign
axiosApi.CancelToken = axiosApi.CancelToken;
// eslint-disable-next-line no-self-assign
axiosApi.isCancel = axiosApi.isCancel;

axiosApi.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-undef
    NProgress.start();
    let token = null;
    if (cookies.get("token")) {
      token = cookies.get("token");
    }
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);
axiosApi.interceptors.response.use((response) => {
  // eslint-disable-next-line no-undef
  NProgress.done();

  return response;
});

export default axiosApi;
