/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../hooks/useAxios";
import { Helmet } from "react-helmet";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiDelete, FiEdit } from "react-icons/fi";

const ManageShops = ({ itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedShopId, setDeletedShopId] = useState(null);

  const { data: allShop, refetch: refetchShops } = useQuery({
    queryKey: ["allShop"],
    queryFn: () => axiosSecure.get("/allShop").then((res) => res.data),
  });

  // console.log(allShop);

  // calculate index of shops to show current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allShop?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(allShop?.length / itemsPerPage);

  const handleDeleteShopClick = async () => {
    // console.log(deletedShopId);
    const toastId = toast.loading("Deleting shop...");

    try {
      const response = await axiosSecure.delete(
        `/admin/allShop/${deletedShopId}`
      );

      if (response.status === 200 && response.data?.deletedCount > 0) {
        toast.success("shop deleted successfully", { id: toastId });
        refetchShops();
        setDeletedShopId(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete shop", { id: toastId });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Inventory || Manage Shops</title>
      </Helmet>

      <div className="border rounded py-6 flex flex-col min-h-[65vh]">
        <h2 className="text-lg font-bold text-slate-800 mb-6 px-4">
          Manage Shops - {allShop?.length}
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-center">
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
              {currentItems?.map((shop) => (
                <tr
                  key={allShop.indexOf(shop) + 1}
                  className=" text-center text-base"
                >
                  <th>{allShop.indexOf(shop) + 1}</th>
                  <td className="p-2">
                    <img
                      className="w-20 max-h-20 object-contain"
                      src={shop.shopLogo}
                      alt="Shop Logo"
                    />
                  </td>
                  <td>{shop.shopName}</td>
                  <td>{shop.productLimit}</td>
                  <td>{shop.shopDescription}</td>
                  <td>
                    <div className="flex gap-2 justify-center items-center">
                      <button className="bg-[#FE9F43] py-2 text-lg px-3 rounded-md text-white hover:cursor-pointer hover:bg-primary group">
                        <FiEdit className="group-hover:scale-125" />
                      </button>
                      <button
                        className="bg-[#FE9F43] py-2 text-lg px-3 rounded-md text-white hover:cursor-pointer hover:bg-red-500 group"
                        onClick={() => {
                          document
                            .getElementById("delete_Confirmation_Modal")
                            .showModal();
                          setDeletedShopId(shop._id);
                        }}
                      >
                        <FiDelete className="group-hover:scale-150" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-grow"></div>
        <div className="divider"></div>

        {/* pagination */}
        <div className="flex justify-center w-full">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage - 1 <= 0}
              onClick={() => {
                if (currentPage - 1 > 0) {
                  setCurrentPage((curr) => curr - 1);
                }
              }}
            >
              «
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <input
                key={idx}
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label={idx + 1}
                checked={currentPage === idx + 1}
                readOnly
                onClick={() => handlePageChange(idx + 1)}
              />
            ))}
            <button
              className="join-item btn"
              disabled={currentPage + 1 > totalPages}
              onClick={() => {
                if (currentPage + 1 <= totalPages) {
                  setCurrentPage((curr) => curr + 1);
                }
              }}
            >
              »
            </button>
          </div>
        </div>
      </div>
      {/* delete confirmation modal */}
      <dialog
        id="delete_Confirmation_Modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete!</h3>
          <p className="py-4">Are you sure you want to delete the shop ?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <div className="flex gap-6 justify-end items-center">
                <button className="btn btn-sm btn-info">Cancel</button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={handleDeleteShopClick}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageShops;
