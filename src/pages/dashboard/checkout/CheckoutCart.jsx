import { Helmet } from "react-helmet";
import { Link, useLoaderData } from "react-router-dom";

const CheckoutCart = () => {
  const loadedProducts = useLoaderData();
  // console.log(loadedProducts?.data);
  return (
    <div className="min-h-[62vh]">
      <Helmet>
        <title>Inventory || Checkout Cart</title>
      </Helmet>
      <div className="flex justify-between w-full pe-4">
        <h1 className="text-3xl font-bold">
          Checkout Cart: {loadedProducts?.data?.length}
        </h1>
        <button
          className="btn btn-success text-base"
          disabled={loadedProducts.data.length < 1}
        >
          <Link to="/dashboard/checkout">Proceed Checkout</Link>
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

export default CheckoutCart;
