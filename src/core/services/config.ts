import axios from "axios";

const AxionInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"

  },
});

AxionInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    console.log("err::", error);
    return Promise.reject(error);
  }
);

AxionInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(
      error.response?.data || { message: "Something went wrong" }
    );
  }
);

export default AxionInstance;
