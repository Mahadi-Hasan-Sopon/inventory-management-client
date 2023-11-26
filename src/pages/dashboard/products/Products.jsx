import { Link, useLoaderData } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const Products = () => {
  const loadedProducts = useLoaderData();
  // console.log(loadedProducts.data);

  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="overflow-x-auto">
        <table className="table table-lg text-center">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Sale</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadedProducts?.data?.map((product, index) => (
              <tr key={product?._id} className="text-base text-slate-600">
                <td> {index + 1} </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-20 h-20">
                        <img
                          src={product?.productLogoURL}
                          alt={product?.productName}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td> {product?.productName} </td>
                <td>{product?.productQuantity}</td>
                <td> {product?.totalSales ? product?.totalSales : 0} </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <Link
                      to={`/dashboard/product/update/${product._id}`}
                      className="text-2xl font-bold bg-blue-600 text-white p-2.5 rounded-lg text-center"
                    >
                      <FaEdit />
                    </Link>
                    <button className="text-2xl font-bold bg-red-600 text-white p-2.5 rounded-lg text-center">
                      <MdDeleteOutline />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
