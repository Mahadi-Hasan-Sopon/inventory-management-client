import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import uploadImage from "../../../utils/uploadImage/uploadImage";
import toast from "react-hot-toast";
import { axiosSecure } from "../../../hooks/useAxios";

const ProductManagement = () => {
  const products = useLoaderData();
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const ownerEmail = user?.email;
    const ownerName = user?.displayName;
    const form = e.currentTarget;
    const productName = form.productName.value;
    const productLogo = form.productLogo.files[0];
    const productQuantity = form.productQuantity.value;
    const productCost = form.productCost.value;
    const profitMargin = form.profitMargin.value;
    const productDiscount = form.productDiscount.value;
    const productRating = form.productRating.value;
    const productLocation = form.productLocation.value;
    const productDescription = form.productDescription.value;

    let productLogoURL;

    if (productLogo) {
      const imageResponse = await uploadImage(productLogo);
      productLogoURL = imageResponse?.data?.display_url;
    }

    const productDetails = {
      productName,
      productCost: parseFloat(productCost),
      productQuantity: parseInt(productQuantity),
      profitMargin: parseFloat(profitMargin),
      productDiscount: parseFloat(productDiscount),
      productRating: parseFloat(productRating),
      productLocation,
      productDescription,
      ownerEmail,
      ownerName,
      productLogoURL: productLogoURL ? productLogoURL : "",
    };

    const loadingToast = toast.loading("Adding product, please wait...");

    try {
      const res = await axiosSecure.post("/products", productDetails);
      console.log(res.data);
      if (res.data?.acknowledged && res.data?.insertedId) {
        document.getElementById("addProductModal").close();
        toast.success("Product Added Successfully.", { id: loadingToast });
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
        document.getElementById("addProductModal").close();
        toast.error("You are not authorized for adding product", {
          id: loadingToast,
        });
        return;
      }

      if (
        error.response?.status == 403 &&
        error.response?.data?.message == "Product Limit reached."
      ) {
        document.getElementById("addProductModal").close();
        return navigate("/dashboard/subscription");
      }

      toast.error(error?.response?.data?.message || error?.message, {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="w-full">
      {products?.data?.length === 0 ? (
        <div className="flex flex-col justify-center gap-4 items-center h-[80vh]">
          <h2 className="text-2xl font-bold text-center">
            No Product Added yet!
          </h2>
          <button
            onClick={() =>
              document.getElementById("addProductModal").showModal()
            }
            className="btn btn-primary text-white px-8 py-2"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-2xl font-bold">
            Total {products?.data?.length} Product Added
          </h1>
          <button
            onClick={() =>
              document.getElementById("addProductModal").showModal()
            }
            className="btn btn-primary text-white px-8 py-2"
          >
            Add Product
          </button>
        </div>
      )}

      {/* modal */}
      <dialog
        id="addProductModal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="w-11/12 mx-auto">
          <form
            onSubmit={handleAddProduct}
            className="bg-slate-100 dark:bg-base-200 py-4 md:py-10 px-4 md:px-10 rounded"
          >
            <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-500 text-center mb-6">
              Add New Product
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
            <div className="grid md:grid-cols-3 md:gap-6 items-center mb-6">
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
                  id="productCost"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={"$120"}
                />
              </div>
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
                  id="profitMargin"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={"10%"}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 md:gap-6 mb-6">
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
                  id="productDiscount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="2%"
                  required
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="productRating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Rating{" "}
                  <span className="text-sm text-red-300 font-normal">
                    (out of 5)
                  </span>
                </label>
                <input
                  name="productRating"
                  type="text"
                  id="productRating"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="4.5"
                  pattern="[0-9]+([.][0-9]+)?"
                />
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="productLocation"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Location
                </label>
                <input
                  name="productLocation"
                  type="text"
                  id="productLocation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Palestine"
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
              Create Product
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductManagement;
