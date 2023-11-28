import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";

const SalesSummary = () => {
  const salesDetails = useQuery({
    queryKey: ["salesSummary"],
    queryFn: async () =>
      axiosSecure.get("/salesSummary").then((res) => res.data),
    initialData: [],
  });

  console.log(salesDetails?.data);

  return (
    <div>
      <h1 className="text-3xl font-bold"> Sales Summary</h1>
      <div className="divider my-2"></div>
      <h1 className="text-2xl font-bold"> Sales Chart</h1>
    </div>
  );
};

export default SalesSummary;
