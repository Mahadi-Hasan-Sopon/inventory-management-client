import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { axiosSecure } from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const SalesCollection = () => {
  const loadedProducts = useLoaderData();

  const [products, setProducts] = useState(loadedProducts.data);

  const handleSearchTextChange = (text) => {
    if (text) {
      const filteredProducts = loadedProducts?.data.filter((product) =>
        product?._id.includes(text)
      );
      setProducts(filteredProducts);
      // console.log({ text, filteredProducts });
    } else {
      setProducts(loadedProducts?.data);
    }
  };

  const handleCheckoutClick = async (productId) => {
    const loadingToast = toast.loading("Adding to cart....");
    const product = loadedProducts?.data.find(
      (product) => product._id === productId
    );

    const updateProduct = {
      productName: product.productName,
      productCost: product.productCost,
      productQuantity: 1,
      profitMargin: product.profitMargin,
      productDiscount: product.productDiscount,
      productRating: product.productRating,
      productLocation: product.productLocation,
      productDescription: product.productDescription,
      ownerEmail: product.ownerEmail,
      ownerName: product.ownerName,
      productLogoURL: product.productLogoURL,
      shopId: product.shopId,
      shopName: product.shopName,
      sellingPrice: product.sellingPrice,
      salesCount: product.salesCount,
      createdAt: product.createdAt,
      productId: productId,
    };

    try {
      const response = await axiosSecure.put("/cart", updateProduct);
      console.log(response.data);
      if (response?.data?.acknowledged && response?.data?.insertedId) {
        toast.success("Product added to Cart", { id: loadingToast });
      } else if (response?.data?.modifiedCount > 0) {
        toast.success("Product Quantity Updated by 1", { id: loadingToast });
      } else {
        toast.error("Something went wrong!", { id: loadingToast });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message, {
        id: loadingToast,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between pe-4 pb-6">
        <h1 className="text-3xl font-bold w-full">
          Sales Collection {products?.length}
        </h1>
        <div className="flex justify-end w-full gap-2 items-center">
          <label
            htmlFor="search"
            className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <input
            type="text"
            className="input input-bordered input-md w-full max-w-xs"
            name="search"
            onChange={(e) => handleSearchTextChange(e.target.value)}
            placeholder="Search by id"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-lg text-center">
          {/* head */}
          <thead className="text-base">
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Selling Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product?._id} className="text-base text-slate-600">
                <td> {product?._id} </td>
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
                <td>$ {product?.productQuantity}</td>
                <td> {product?.productDiscount}% </td>
                <td>$ {product?.sellingPrice} </td>
                <td>
                  <button
                    onClick={() => handleCheckoutClick(product._id)}
                    className="btn btn-info"
                  >
                    CheckOut
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesCollection;
