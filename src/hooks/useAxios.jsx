import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:5000",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxios = () => {
  return { axiosPublic, axiosPrivate };
};

export default useAxios;
