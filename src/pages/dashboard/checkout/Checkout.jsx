import { axiosSecure } from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import jsPDF from "jspdf";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, refetch } = useCart();

  const pdf = new jsPDF();

  const handleGetPaidClick = async () => {
    const loadingToast = toast.loading("Adding to Sales Collection.");
    refetch();
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
    <div className="min-h-[62vh]">
      <Helmet>
        <title>Inventory || Checkout</title>
      </Helmet>
      <div className="flex justify-between w-full pe-4">
        <h1 className="text-3xl font-bold">
          Checkout: {cartItems?.soldQuantity}
        </h1>
        <button
          disabled={cartItems?.soldQuantity < 1}
          className="btn btn-info text-base"
          onClick={handleGetPaidClick}
        >
          Get Paid
        </button>
      </div>
      <div className="divider my-1"></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems?.totalItems.map((product) => (
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
