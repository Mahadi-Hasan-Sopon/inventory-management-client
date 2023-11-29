import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import { Helmet } from "react-helmet";

const AdminSalesSummary = () => {
  const { data: allSales } = useQuery({
    queryKey: ["allSales", "admin"],
    queryFn: () => axiosSecure.get("/allSales").then((res) => res.data),
  });

  console.log({ allSales });

  return (
    <div>
      <Helmet>
        <title>Inventory || Admin Sales Summary</title>
      </Helmet>
      <h1 className="text-3xl font-bold"> Sales Summary - Admin </h1>
      {allSales?.length}
    </div>
  );
};

export default AdminSalesSummary;
