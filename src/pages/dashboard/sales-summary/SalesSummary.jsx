import { useLoaderData } from "react-router-dom";
import { IoBagCheck } from "react-icons/io5";
import { BiMoney, BiCartDownload } from "react-icons/bi";
import SalesChart from "./SalesChart";
import { axiosSecure } from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import RecentSales from "./RecentSales";
import { Helmet } from "react-helmet";

const SalesSummary = () => {
  const allSales = useLoaderData();
  // console.log(allSales?.data);

  const salesDetails = useQuery({
    queryKey: ["salesSummary"],
    queryFn: async () =>
      axiosSecure.get("/salesSummary").then((res) => res.data),
    initialData: [],
  });
  // console.log(salesDetails?.data);

  const totalSale = allSales?.data?.reduce(
    (acc, curr) => acc + parseInt(curr.soldQuantity * curr.sellingPrice),
    0
  );
  const totalProfit = allSales?.data?.reduce(
    (acc, curr) =>
      Math.ceil(acc + parseInt(curr.sellingPrice - curr.productCost) * 0.925),
    0
  );
  const totalCost = allSales?.data?.reduce(
    (acc, curr) => acc + parseInt(curr.productCost),
    0
  );

  const recentSales = allSales?.data
    ?.slice()
    .sort((a, b) => new Date(b.soldAt) - new Date(a.soldAt));

  return (
    <div>
      <Helmet>
        <title>Inventory || Sales Summary</title>
      </Helmet>
      <h1 className="text-3xl font-bold"> Sales Summary</h1>
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
            <h2 className="text-2xl font-bold">${totalSale}</h2>
            <p className="text-sm font-normal">Total Sales </p>
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
            <h2 className="text-2xl font-bold">${totalProfit}</h2>
            <p className="text-sm font-normal">
              Total Profit{" "}
              <span className="text-sm text-red-400">(without vat)</span>{" "}
            </p>
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
            <h2 className="text-2xl font-bold">${totalCost}</h2>
            <p className="text-sm font-normal">Total Cost </p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <div className="sale-summary border rounded w-full py-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6 px-4">
            Sales By Employee
          </h2>
          <SalesChart salesData={salesDetails?.data} />
        </div>
        <RecentSales data={recentSales} />
      </div>
    </div>
  );
};

export default SalesSummary;
