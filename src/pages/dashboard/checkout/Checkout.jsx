import { axiosSecure } from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Checkout = () => {
  // const loadedProducts = useLoaderData();
  // console.log(loadedProducts?.data)

  const { data: loadedProducts, refetch } = useQuery({
    queryKey: ["checkoutProducts"],
    queryFn: async () =>
      await axiosSecure.get("/carts").then((res) => res.data),
  });

  const handleGetPaidClick = async () => {
    const loadingToast = toast.loading("Adding to Sales Collection.");
    try {
      const response = await axiosSecure.post("/sales", {
        products: loadedProducts,
      });

      if (response?.data?.salesResult?.insertedCount > 0) {
        toast.success("Product Added to Sales Collection.", {
          id: `${loadingToast}-1`,
        });
      }

      if (response?.data?.updateStatus?.length > 0) {
        toast.success(
          `Products Sales Count and Quantity Updated ${response?.data?.updateStatus?.length}`,
          {
            id: `${loadingToast}-2`,
          }
        );
      }

      if (response?.data?.deleteStatus?.length > 0) {
        toast.success("Cart Cleared.", { id: `${loadingToast}-3` });
      }
      refetch();
      toast.dismiss(loadingToast);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message, {
        id: loadingToast,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between w-full pe-4">
        <h1 className="text-3xl font-bold">
          Checkout: {loadedProducts?.data?.length}
        </h1>
        <button className="btn btn-info text-base" onClick={handleGetPaidClick}>
          Get Paid
        </button>
      </div>
      <div className="divider my-1"></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loadedProducts?.map((product) => (
          <div
            key={product._id}
            className="card card-compact w-full bg-base-100 shadow-xl"
          >
            <figure>
              <img src={product?.productLogoURL} alt="Product image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title"> {product?.productName} </h2>
              <p className="text-base font-semibold">
                Price: $ {product?.sellingPrice?.toFixed(2)}
              </p>
              <p className="text-base font-medium">
                Stock: {product?.productQuantity}pcs
              </p>
              <p className="text-base font-medium">
                InCart: {product?.soldQuantity}pcs
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
