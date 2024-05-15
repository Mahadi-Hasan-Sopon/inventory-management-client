import axios from "axios";

const baseURL =
  import.meta.env.VITE_DEVELOPMENT_MODE === "true"
    ? "http://localhost:5000"
    : "https://inventory-management-server-chi.vercel.app";

export const axiosPublic = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosSecure = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = () => {
  return { axiosPublic, axiosSecure };
};

export default useAxios;

// baseURL: "https://inventory-management-server-chi.vercel.app",
// baseURL: "http://localhost:5000",
