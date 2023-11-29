import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosSecure } from "./useAxios";

const useHasShop = () => {
  const { user } = useAuth();
  const { data: hasShop } = useQuery({
    queryKey: ["hasShop", user?.email],
    queryFn: () => axiosSecure.get("/hasShop").then((res) => res.data),
  });

  console.log({ hasShop });

  return { hasShop };
};

export default useHasShop;
