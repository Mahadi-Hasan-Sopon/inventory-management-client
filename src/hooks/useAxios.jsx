import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://inventory-management-server-chi.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosSecure = axios.create({
  baseURL: "https://inventory-management-server-chi.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = () => {
  return { axiosPublic, axiosSecure };
};

export default useAxios;
