import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosSecure } from "./useAxios";

const useHasShop = () => {
  const { user } = useAuth();
  const { data: hasShop } = useQuery({
    queryKey: ["hasShop", user?.email],
    queryFn: () => user && axiosSecure.get("/hasShop").then((res) => res.data),
    initialData: null,
  });

  return { hasShop };
};

export default useHasShop;
