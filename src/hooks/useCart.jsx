import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxios";

const useCart = () => {
  const {
    data: cartItems,
    error,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axiosSecure.get("/carts");
      const soldQuantity = response.data.reduce(
        (acc, item) => acc + item.soldQuantity,
        0
      );
      return { totalItems: response.data, soldQuantity };
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  if (error) {
    console.error(error);
    throw new Error(error?.message ? error.message : error);
  }

  const refetchCartItems = () => refetch();

  return { cartItems, refetchCartItems, isLoading };
};

export default useCart;
