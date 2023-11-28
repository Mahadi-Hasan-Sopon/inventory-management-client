/* eslint-disable react/prop-types */
import { useState } from "react";

const RecentSales = ({ data = [], itemsPerPage = 3 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // calculate index of items to show current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="sold-products border rounded py-6 flex flex-col">
      <h2 className="text-lg font-bold text-slate-800 mb-6 px-4">
        Recently Sold
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="text-center">
            <tr>
              <th>Name</th>
              <th>Selling Date</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((sale, index) => (
              <tr key={index + 1}>
                <td> {sale.productName} </td>
                <td>
                  {sale.soldAt
                    ? new Date(sale.soldAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Date Missing"}
                </td>
                <td> ${parseInt(sale.sellingPrice - sale.productCost)} </td>
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
  );
};

export default RecentSales;
