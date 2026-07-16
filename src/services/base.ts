import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL as string,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default axiosInstance;
