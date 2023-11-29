import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";

const AdminSalesSummary = () => {
  const { data: allSales } = useQuery({
    queryKey: ["allSales", "admin"],
    queryFn: () => axiosSecure.get("/allSales").then((res) => res.data),
  });

  console.log({ allSales });

  return <div></div>;
};

export default AdminSalesSummary;
