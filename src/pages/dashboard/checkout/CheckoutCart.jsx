import { Helmet } from "react-helmet";
import useCart from "../../../hooks/useCart";
// import { MdDelete } from "react-icons/md";
import UnitHandler from "../../../components/UnitHandler";
import { RxCross2, RxDoubleArrowRight } from "react-icons/rx";
import { TfiFaceSad } from "react-icons/tfi";
import { axiosSecure } from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import jsPDF from "jspdf";

const CheckoutCart = () => {
  const { cartItems, isLoading, refetchCartItems } = useCart();
  const { user } = useAuth();

  const pdf = new jsPDF();

  const handleGetPaidClick = async () => {
    const loadingToast = toast.loading("Adding to Sales Collection.");

    try {
      const response = await axiosSecure.post("/sales", {
        products: cartItems?.totalItems,
      });

      if (response?.data?.salesResult?.insertedCount > 0) {
        toast.success("Product Added to Sales Collection.", {
          id: `${loadingToast}-1`,
        });
      }

      if (response.status === 200) {
        pdf.setProperties({
          title: "Sales",
          subject: "Invoice",
          author: user?.displayName,
        });
        pdf.text("Invoice", 50, 10);
        let yPosition = 20;
        cartItems?.totalItems.forEach((product, index) => {
          yPosition += 10;
          pdf.text(`Product ${index + 1}`, 20, yPosition);
          yPosition += 5;
          pdf.text(`Title: ${product.productName}`, 30, yPosition);
          pdf.text(`Price: ${product.sellingPrice}`, 30, yPosition + 5);
          yPosition += 10;
        });
        pdf.autoPrint();
        pdf.save("Invoice.pdf");
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
      refetchCartItems();
      toast.dismiss(loadingToast);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message, {
        id: loadingToast,
      });
    }
  };

  const handleDeleteOneProductClick = async (productId) => {
    const deleteToast = toast.loading("Deleting Cart Item");

    try {
      const response = await axiosSecure.delete(`/carts/${productId}`);
      if (response.data.deletedCount > 0 && response.data.acknowledged) {
        toast.success("Cart Item deleted successfully", { id: deleteToast });
        refetchCartItems();
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || err, { id: deleteToast });
    }
  };

  return (
    <div className="min-h-[62vh]">
      <Helmet>
        <title>Inventory || Cart</title>
      </Helmet>
      <div className="flex justify-between w-full pe-4">
        <h1 className="text-3xl font-bold">Cart</h1>
        <div
          className={`btn text-[#FE9F43] border-2 border-[#FE9F43] hover:bg-[#FE9F43] bg-inherit hover:text-white hover:border-white ${
            isLoading && "w-32 h-12"
          }`}
          disabled={isLoading || cartItems.soldQuantity < 1}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <button
              className="flex items-center gap-1"
              onClick={handleGetPaidClick}
            >
              Get Paid
              <span>
                <RxDoubleArrowRight className="text-2xl" />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="divider my-1"></div>
      {/* <div className="header-action-center flex w-full justify-between gap-4 items-center">
        <div className="form-control">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              name="select-all"
              id="select-all"
              defaultChecked={false}
              className="checkbox checkbox-warning"
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
      </div> */}
      {isLoading ? (
        <div className="flex flex-col gap-4 w-full min-h-[60vh] items-center justify-center">
          <div className="skeleton h-12 w-full bg-slate-50"></div>
          <div className="skeleton h-12 w-full bg-slate-50"></div>
          <div className="skeleton h-12 w-full bg-slate-50"></div>
          <div className="skeleton h-12 w-full bg-slate-50"></div>
          <div className="skeleton h-12 w-full bg-slate-50"></div>
          <div className="flex flex-col items-end justify-center gap-4 w-10/12">
            <div className="skeleton h-6 w-52 bg-slate-50"></div>
            <div className="skeleton h-6 w-52 bg-slate-50"></div>
            <div className="skeleton h-6 w-52 bg-slate-50"></div>
          </div>
        </div>
      ) : cartItems.soldQuantity < 1 ? (
        <div className="flex flex-col gap-4 w-full min-h-[55vh] items-center justify-center">
          <div className="text-6xl text-[#FE9F43]">
            <TfiFaceSad />
          </div>
          <h2 className="text-2xl font-bold text-[#FE9F43]">
            No Items in Cart
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="table min-w-[705px] md:w-full">
            {/* head */}
            <thead>
              <tr>
                {/* <th></th> */}
                <th>SN</th>
                <th className="text-center">Item Details</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.totalItems?.map((product, idx) => (
                <tr key={product._id}>
                  {/* <td className="pl-1">
                  <label>
                    <input type="checkbox" className="checkbox checkbox-info" />
                  </label>
                </td> */}
                  <td className="text-center font-semibold">
                    {idx > 9 ? idx + 1 : `0${idx + 1}`}
                  </td>
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
                        <div className="text-sm opacity-50 md:w-10/12 text-justify">
                          <span>
                            Desc: {product?.productDescription}
                            {", "}
                          </span>
                          <span>
                            From: {product?.productLocation}
                            {", "}
                          </span>
                          <span> Stock: {product?.productQuantity} </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td> ${product?.sellingPrice} </td>
                  <td className="pr-1 flex justify-center items-center">
                    <UnitHandler
                      productStockQuantity={product?.productQuantity}
                      defaultSelectedQuantity={product?.soldQuantity}
                    />
                  </td>
                  <td className="p-0">
                    <button
                      className="flex justify-center items-center w-full"
                      onClick={() => handleDeleteOneProductClick(product._id)}
                    >
                      <RxCross2 className="text-2xl hover:text-red-500 hover:animate-pulse cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* table footer */}
            <tfoot className="border-t border-slate-100">
              <tr>
                <td
                  colSpan="2"
                  className="text-right text-lg font-bold p-0 pt-1"
                >
                  Total Amount =
                </td>
                <td className="text-center text-base font-bold p-0 pt-1">
                  {cartItems?.totalItems?.reduce(
                    (acc, cur) => acc + cur.sellingPrice * cur.soldQuantity,
                    0
                  )}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  className="text-right text-lg font-bold p-0 pl-0"
                >
                  Discount Applied =
                </td>
                <td className="text-center text-base font-bold p-0">
                  {cartItems?.totalItems?.reduce(
                    (acc, cur) => acc + cur.productDiscount,
                    0
                  )}
                  {"%"}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="2"
                  className="text-right text-lg font-bold p-0 pl-0"
                >
                  Shipping Charge =
                </td>
                <td className="text-center text-base font-bold p-0">free</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default CheckoutCart;
