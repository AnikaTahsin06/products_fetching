import { Axios } from "axios";

const axiosInstance = Axios.create({
  baseURL: "https://fakestoreapi.com/products",
  withCredentials: true,
  "Content-Type": "application/json",
});

export default axiosInstance;
