import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { axiosSecure } from "./useAxios";

const useAdmin = () => {
  const { user } = useAuth();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: () =>
      axiosSecure.get(`/users/isAdmin/${user?.email}`).then((res) => res.data),
  });

  return { isAdmin, isLoading };
};

export default useAdmin;
