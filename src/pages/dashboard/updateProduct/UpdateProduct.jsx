import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import uploadImage from "../../../utils/uploadImage/uploadImage";
import { axiosSecure } from "../../../hooks/useAxios";

const UpdateProduct = () => {
  const product = useLoaderData();
  const navigate = useNavigate();

  const {
    productName,
    productLogoURL,
    productQuantity,
    productCost,
    profitMargin,
    productDiscount,
    productDescription,
  } = product.data;

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const productName = form.productName.value;
    const productLogo = form.productLogo.files[0];
    const productQuantity = form.productQuantity.value;
    const productCost = form.productCost.value;
    const profitMargin = form.profitMargin.value;
    const productDiscount = form.productDiscount.value;
    const productDescription = form.productDescription.value;

    let productLogoURLUpdate;

    if (productLogo) {
      const imageResponse = await uploadImage(productLogo);
      productLogoURLUpdate = imageResponse?.data?.display_url;
    }

    const productDetails = {
      productName,
      productCost: parseFloat(productCost),
      productQuantity: parseInt(productQuantity),
      profitMargin: parseFloat(profitMargin),
      productDiscount: parseFloat(productDiscount),
      productDescription,
      productLogoURL: productLogoURLUpdate
        ? productLogoURLUpdate
        : productLogoURL,
    };

    const loadingToast = toast.loading("Adding product, please wait...");

    try {
      const res = await axiosSecure.put(
        `/product/${product?.data?._id}`,
        productDetails
      );
      console.log(res.data);
      if (res.data?.acknowledged && res.data?.modifiedCount > 0) {
        toast.success("Product Updated Successfully.", { id: loadingToast });
        navigate("/dashboard/products");
      } else {
        toast.error("Something went wrong, please try again", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.log(error);

      if (
        error.response?.status == 401 &&
        error?.response?.data?.message == "Not Authorized"
      ) {
        toast.error("You are not authorized for adding product", {
          id: loadingToast,
        });
        return;
      }

      toast.error(error?.response?.data?.message || error?.message, {
        id: loadingToast,
      });
    }
    };
    
  return (
    <form
      onSubmit={handleUpdateProduct}
      className="bg-slate-100 dark:bg-base-200 py-4 md:py-10 px-4 md:px-10 rounded"
    >
      <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-500 text-center mb-6">
        Update Product Info
      </h1>
      <div className="grid md:grid-cols-2 md:gap-6 mb-6">
        <div className="relative w-full group">
          <label
            htmlFor="productName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            name="productName"
            type="text"
            id="productName"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product Name"
            defaultValue={productName}
          />
        </div>
        <div className="form-control w-full">
          <label
            htmlFor="productLogo"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Logo
          </label>
          <input
            name="productLogo"
            type="file"
            className="file-input file-input-bordered file-input-primary w-full"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6 items-center mb-6">
        <div className="form-control w-full">
          <label
            htmlFor="productQuantity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Quantity
          </label>
          <input
            name="productQuantity"
            type="number"
            id="productQuantity"
            defaultValue={productQuantity}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={1}
          />
        </div>
        <div className="form-control w-full">
          <label
            htmlFor="productCost"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Production Cost{" "}
            <span className="text-sm text-red-300 font-normal">$</span>
          </label>
          <input
            name="productCost"
            type="number"
            defaultValue={productCost}
            id="productCost"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"$120"}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6 mb-6">
        <div className="form-control w-full">
          <label
            htmlFor="profitMargin"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
          >
            Profit Margin{" "}
            <span className="text-sm text-red-300 font-normal">%</span>
          </label>
          <input
            name="profitMargin"
            type="number"
            defaultValue={profitMargin}
            id="profitMargin"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"10%"}
          />
        </div>
        <div className="relative w-full">
          <label
            htmlFor="productDiscount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Discount{" "}
            <span className="text-sm text-red-300 font-normal">%</span>
          </label>
          <input
            name="productDiscount"
            type="number"
            defaultValue={productDiscount}
            id="productDiscount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="2%"
            required
          />
        </div>
      </div>
      <div className="grid mb-6">
        <div className="relative w-full group">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            name="productDescription"
            defaultValue={productDescription}
            id="productDescription"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product Description..."
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProduct;
