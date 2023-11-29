import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import { Helmet } from "react-helmet";
import { BiCartDownload, BiMoney } from "react-icons/bi";
import { IoBagCheck } from "react-icons/io5";

const AdminSalesSummary = () => {
  const { data: allSales } = useQuery({
    queryKey: ["allSales", "admin"],
    queryFn: () =>
      axiosSecure.get("/admin/salesSummary").then((res) => res.data),
  });

  return (
    <div>
      <Helmet>
        <title>Inventory || Admin Sales Summary</title>
      </Helmet>
      <h1 className="text-3xl font-bold"> Sales View </h1>
      <div className="divider my-2"></div>
      <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 justify-center sm:justify-between items-center gap-6 my-6 me-4">
        {/* Total Sale */}
        <div className="totalSale flex gap-5 p-5 items-center border rounded-lg w-full">
          <div className="icon">
            <span className="block bg-[#f96e6f1f] p-3.5 rounded-full">
              <IoBagCheck className="text-2xl text-[#FE9F43]" />
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">${allSales?.totalSales}</h2>
            <p className="text-sm font-normal">Total Product Sales </p>
          </div>
        </div>
        {/* Total Profit */}
        <div className="totalProfit flex p-5 gap-5 items-center border rounded-lg w-full">
          <div className="icon">
            <span className="block bg-[#28c76f1f] p-3.5 rounded-full">
              <BiMoney className="text-2xl text-[#28c76f]" />
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">${allSales?.adminIncome}</h2>
            <p className="text-sm font-normal">Admin Income</p>
          </div>
        </div>
        {/* Total Cost */}
        <div className="totalCost flex p-5 gap-5 items-center border rounded-lg w-full">
          <div className="icon">
            <span className="block  bg-[#ea54551f] p-3.5 rounded-full">
              <BiCartDownload className="text-2xl text-[#ea5455]" />
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">${allSales?.totalProducts}</h2>
            <p className="text-sm font-normal">Total Products </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesSummary;
