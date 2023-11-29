import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import { Helmet } from "react-helmet";

const ManageShops = () => {
  const { data: allShop } = useQuery({
    queryKey: ["allShop"],
    queryFn: () => axiosSecure.get("/allShop").then((res) => res.data),
  });

  //   console.log({ allShop });

  return (
    <div>
      <Helmet>
        <title>Inventory || Manage Shops</title>
      </Helmet>
      <h1 className="text-2xl font-bold">Manage Shops - {allShop?.length}</h1>
      <div className="overflow-x-auto my-10">
        <table className="table table-zebra">
          <thead className="text-center text-lg">
            <tr>
              <th>#</th>
              <th>Shop Logo</th>
              <th>Shop Name</th>
              <th>Product Limit</th>
              <th>Shop Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allShop?.map((shop, index) => (
              <tr key={index + 1} className=" text-center text-base">
                <th>{index + 1}</th>
                <td className="flex justify-center">
                  <img className="w-20" src={shop.shopLogo} alt="" />
                </td>
                <td> {shop.shopName} </td>
                <td>{shop.productLimit}</td>
                <td>{shop.shopDescription}</td>
                <td>
                  <button className="btn btn-info px-5">Send Notice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageShops;
