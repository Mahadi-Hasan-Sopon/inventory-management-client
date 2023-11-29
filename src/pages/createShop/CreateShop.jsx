import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import uploadImage from "../../utils/uploadImage/uploadImage";
import { axiosSecure } from "../../hooks/useAxios";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useHasShop from "../../hooks/useHasShop";
import useAdmin from "../../hooks/useAdmin";

const CreateShop = () => {
  const { user, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const { hasShop } = useHasShop();
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex flex-col mt-20 gap-4 w-full h-full justify-center items-center">
        <div className="flex w-full gap-6">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
        <div className="flex w-full gap-6 my-6">
          <div className="skeleton h-12 w-full"></div>
          <div className="skeleton h-12 w-full"></div>
        </div>
        <div className="skeleton h-12 w-full"></div>
        <div className="flex w-full gap-6">
          <div className="skeleton h-40 w-full"></div>
        </div>
      </div>
    );

  if (!loading && !user) {
    return navigate("/login");
  }

  if (!loading && hasShop && !isAdmin) {
    return <Navigate to="/dashboard/sales-summary" />;
  }

  if (!loading && isAdmin) {
    return <Navigate to="/dashboard/admin/sales-summary" />;
  }

  const handleCreateShop = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const shopName = form.shopName.value;
    const shopLogo = form.shopLogo.files[0];
    const ownerName = form.ownerName.value;
    const ownerEmail = form.ownerEmail.value;
    const shopLocation = form.shopLocation.value;
    const shopDescription = form.shopDescription.value;
    const loadingToast = toast.loading("creating shop....");
    try {
      // upload logo and get url
      const imageResponse = await uploadImage(shopLogo);
      const logoURL = imageResponse.data?.display_url;

      const shopDetails = {
        shopName,
        ownerEmail,
        ownerName,
        shopLocation,
        shopDescription,
        shopLogo: logoURL,
      };

      // create shop
      const res = await axiosSecure.post("/shops", shopDetails);
      if (res.data?.acknowledged && res.data?.insertedId) {
        const updateUserInfo = {
          role: "manager",
          shopId: res?.data?.insertedId,
          shopName: shopName,
          shopLogo: logoURL,
        };
        const { data } = await axiosSecure.put(
          "/user/addShopInfo",
          updateUserInfo
        );

        if (data?.modifiedCount > 0) {
          toast.success("Shop created successfully.", { id: loadingToast });
          navigate("/dashboard");
        } else {
          toast.error("Something went wrong", { id: loadingToast });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message, {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="py-6">
      <Helmet>
        <title>Inventory || Create Shop</title>
      </Helmet>
      <form
        onSubmit={handleCreateShop}
        className="bg-slate-100 dark:bg-base-200 py-4 md:py-10 px-4 md:px-10 rounded"
      >
        <h1 className="text-3xl font-bold text-slate-700 dark:text-slate-500 text-center mb-6">
          Register Your Shop
        </h1>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="shopName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shop Name
            </label>
            <input
              name="shopName"
              type="text"
              id="shopName"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Shop Name"
            />
          </div>
          <div className="form-control w-full">
            <label
              htmlFor="shopLogo"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shop Logo
            </label>
            <input
              name="shopLogo"
              type="file"
              className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="ownerName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Owner Name
            </label>
            <input
              name="ownerName"
              type="text"
              id="ownerName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              defaultValue={user?.displayName}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="ownerEmail"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Owner Email
            </label>
            <input
              name="ownerEmail"
              type="email"
              id="ownerEmail"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readOnly
              defaultValue={user?.email}
              required
            />
          </div>
        </div>

        <div className="grid">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="shopLocation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Shop Location
            </label>
            <input
              name="shopLocation"
              type="text"
              id="shopLocation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Dhanmondi, Dhaka, Bangladesh"
              required
            />
          </div>
        </div>
        <div className="grid">
          <div className="relative z-0 w-full mb-6 group">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              name="shopDescription"
              id="shopDescription"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Shop Description..."
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          disabled={!user}
          className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Shop
        </button>
      </form>
    </div>
  );
};

export default CreateShop;
