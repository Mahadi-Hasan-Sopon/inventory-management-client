/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { axiosSecure } from "../../../hooks/useAxios";

const ManageUsers = ({ itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => axiosSecure.get("/admin/allUser").then((res) => res.data),
  });

  console.log({ users });

  // calculate index of users to show current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(users.length / itemsPerPage);

  /***
 * email
: 
"john@gmail.com"
image
: 
"https://i.ibb.co/gdqxKTt/avator1.jpg"
name
: 
"John Due"
role
: 
"manager"
shopId
: 
"65622789046e1c48d3ec315c"
shopLogo
: 
"https://i.ibb.co/2YxQ9TY/logo3.webp"
shopName
: 
"KC Trading"
 */

  return (
    <div>
      <Helmet>
        <title>Inventory || Manage Users</title>
      </Helmet>
      <div className="sold-products border rounded py-6 flex flex-col">
        <h2 className="text-lg font-bold text-slate-800 mb-6 px-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Shop Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems?.map((user, index) => (
                <tr
                  key={index + 1}
                  className="text-center hover hover:cursor-pointer"
                >
                  <td> {index + 1} </td>
                  <td> {user?.name} </td>
                  <td>{user?.email}</td>
                  <td> {user?.shopName ? user.shopName : "No Shop"} </td>
                  <td> {user?.role ? user.role : "User"} </td>
                  <td>
                    {!user?.role && !user.shopName ? (
                      <button className="bg-[#FE9F43] py-2 text-xs px-3 rounded-md text-white">
                        Send Offer
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-grow"></div>
        <div className="divider"></div>
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
    </div>
  );
};

export default ManageUsers;
