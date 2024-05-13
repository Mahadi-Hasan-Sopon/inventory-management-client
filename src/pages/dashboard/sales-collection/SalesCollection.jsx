import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { axiosSecure } from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet";
import { MdShoppingCart } from "react-icons/md";

const SalesCollection = () => {
  const loadedProducts = useLoaderData();
  const { user } = useAuth();

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
      productQuantity: product.productQuantity,
      soldQuantity: 1,
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
      soldBy: { email: user?.email, name: user?.displayName },
      productId: productId,
    };

    try {
      const response = await axiosSecure.put("/carts", updateProduct);
      // console.log(response.data);
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
    <div className="min-h-[62vh]">
      <Helmet>
        <title>Inventory || Sales Collection</title>
      </Helmet>
      <div className="flex justify-between pe-4 pb-6">
        <h1 className="text-3xl font-bold w-full">
          Available Products: {products?.length}
        </h1>
        <div className="flex justify-end w-full gap-4 items-center">
          <div className="flex gap-4 items-center justify-start">
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
          <div className="cartIcon relative">
            <MdShoppingCart className="text-3xl text-[#FE9F43]" />
            <div className="absolute w-5 h-5 rounded-full -bottom-2 -right-2 bg-[#FE9F43] flex justify-center items-center text-white font-medium text-xs">
              0
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto max-w-full">
        <table className="table table-lg text-center p-0">
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
                <td className="p-2"> {product?._id} </td>
                <td className="p-0">
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
                <td className="p-0"> {product?.productName} </td>
                <td className="p-0">$ {product?.productQuantity}</td>
                <td className="p-0"> {product?.productDiscount}% </td>
                <td className="p-0"> ${product?.sellingPrice} </td>
                <td className="p-0">
                  <button
                    onClick={() => handleCheckoutClick(product._id)}
                    className="btn btn-info inline-block px-3"
                  >
                    Add to Cart
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
