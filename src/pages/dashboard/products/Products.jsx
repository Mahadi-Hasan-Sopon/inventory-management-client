import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
const Products = () => {
  const { data: loadedProducts, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => axiosSecure.get("/products").then((res) => res.data),
  });

  const handleDeleteClick = (productId) => {
    toast((t) => (
      <div>
        <DeleteProductByToast
          productId={productId}
          onDelete={() => handleDeleteProduct(productId)}
          onCancel={() => toast.dismiss(t.id)}
        />
      </div>
    ));
  };

  const handleDeleteProduct = async (productId) => {
    const loadingToast = toast.loading("Deleting Product...");
    try {
      const response = await axiosSecure.delete(`/product/${productId}`);
      if (response?.data?.deletedCount > 0) {
        refetch();
        toast.success("Product Deleted Successfully.", { id: loadingToast });
      }
      toast.dismiss();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message, {
        id: loadingToast,
      });
      toast.dismiss();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

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
            {loadedProducts?.map((product, index) => (
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
                    <button
                      onClick={() => handleDeleteClick(product?._id)}
                      className="text-2xl font-bold bg-red-600 text-white p-2.5 rounded-lg text-center"
                    >
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

// eslint-disable-next-line react/prop-types
const DeleteProductByToast = ({ productId, onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete(productId);
    toast.dismiss();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium text-center">Are you sure!</h2>
      <p className="text-lg font-medium text-center">
        You want to delete this product ?
      </p>
      <div className="flex justify-between gap-8 items-center">
        <button
          className="btn btn-error px-6 py-2.5 text-base"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="btn btn-primary px-6 py-2.5 text-base"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
