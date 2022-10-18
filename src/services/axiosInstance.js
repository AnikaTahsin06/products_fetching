import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "https://fakestoreapi.com",
  withCredentials: false,
  "Content-Type": "application/json",
});

export default axiosInstance;
