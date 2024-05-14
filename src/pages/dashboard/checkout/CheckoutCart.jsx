import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { MdDelete } from "react-icons/md";
import UnitHandler from "../../../components/UnitHandler";

const CheckoutCart = () => {
  const { cartItems, isLoading } = useCart();

  console.log(cartItems?.totalItems);

  return (
    <div className="min-h-[62vh]">
      <Helmet>
        <title>Inventory || Cart</title>
      </Helmet>
      <div className="flex justify-between w-full pe-4">
        <h1 className="text-3xl font-bold">
          Cart Quantity: {cartItems?.soldQuantity}
        </h1>
        <button
          className={`btn btn-success text-white hover:text-black ${
            isLoading && "w-44 h-12"
          }`}
          disabled={isLoading || cartItems.soldQuantity < 1}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <Link to="/dashboard/checkout">Proceed to Checkout</Link>
          )}
        </button>
      </div>
      <div className="divider my-1"></div>
      <div className="action-center flex w-full justify-between gap-4 items-center">
        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              name="select-all"
              id="select-all"
              defaultChecked={false}
              className="checkbox checkbox-info"
            />
            <span className="label-text ps-2 text-base">
              Select All ({cartItems?.soldQuantity}){"items"}
            </span>
          </label>
        </div>
        <div className="delete text-2xl hover:text-red-400 cursor-pointer flex items-center">
          <MdDelete />
          <span className="text-base font-mono">DELETE</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SN</th>
              <th className="text-center">Item Details</th>

              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.totalItems?.map((product, idx) => (
              <tr key={product._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={product?.productLogoURL}
                          alt="Product Image"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product?.productName}</div>
                      <div className="text-sm opacity-50 w-9/12 text-justify">
                        <span>
                          Desc: {product?.productDescription}
                          {", "}
                        </span>
                        <span> From: {product?.productLocation} </span>
                      </div>
                    </div>
                  </div>
                </td>

                <td> ${product?.sellingPrice?.toFixed(2)} </td>
                <th>
                  <UnitHandler
                    productStockQuantity={product?.productQuantity}
                    defaultSelectedQuantity={product?.soldQuantity}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckoutCart;
