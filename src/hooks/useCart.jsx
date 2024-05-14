import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "./useAxios";
import { useState } from "react";

const useCart = () => {
  const [fetchCartData, setFetchCartData] = useState(false);

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
    enabled: !!fetchCartData,
  });
  if (error) {
    console.error(error);
    throw new Error(error?.message ? error.message : error);
  }

  return { cartItems, refetch, isLoading, setFetchCartData };
};

export default useCart;
