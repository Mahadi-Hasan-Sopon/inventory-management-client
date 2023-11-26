import { useLoaderData } from "react-router-dom";
import { axiosSecure } from "../../../hooks/useAxios";

const Checkout = () => {
  const loadedProducts = useLoaderData();
  // console.log(loadedProducts?.data)

  const handleGetPaidClick = async () => {
    try {
      const response = await axiosSecure.post("/sales", {
        products: loadedProducts.data,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
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
        {loadedProducts?.data?.map((product) => (
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
                Qty: {product?.productQuantity}pcs
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
