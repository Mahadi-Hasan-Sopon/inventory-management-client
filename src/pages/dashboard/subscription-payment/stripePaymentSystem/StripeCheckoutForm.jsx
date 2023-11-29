/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { axiosSecure } from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";

const StripeCheckoutForm = ({ selectedPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const [isError, setIsError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  //   console.log(selectedPlan, " in checkout form");

  useEffect(() => {
    if (selectedPlan.price == 0) return;
    axiosSecure
      .post("/create-payment-intent", { price: parseFloat(selectedPlan.price) })
      .then((res) => {
        //   console.log(res.data);
        setClientSecret(res.data?.clientSecret);
      });
  }, [selectedPlan.price]);

  const handleCheckoutSubmit = async (event) => {
    event.preventDefault();

    const loadingToast = toast.loading("Trying to pay, please wait....");

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setIsError(error?.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setIsError("");
      document.getElementById("purchaseModal").close();
    }

    // confirm payment
    const { paymentIntent, error: paymentConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (paymentConfirmError) {
      console.log({ paymentConfirmError });
      toast.error(paymentConfirmError?.message, { id: loadingToast });
    } else {
      console.log({ paymentIntent });
      document.getElementById("purchaseModal").close();
      if (paymentIntent.status === "succeeded") {
        const result = await axiosSecure.put("/shops/increaseProductLimit", {
          productLimit: selectedPlan.productLimit,
        });
        // console.log(result.data, "in successful payment");
        if (result.data?.modifiedCount > 0) {
          toast.success("Product Limit increased.");
          const adminIncome = await axiosSecure.put("/admin/increaseIncome", {
            income: selectedPlan.price,
          });
          // console.log(adminIncome.data);
          if (adminIncome.data?.modifiedCount > 0) {
            toast.success("Admin Income added.");
          }
        }
        toast.success("Payment Successful", {
          id: loadingToast,
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleCheckoutSubmit}>
        <div className="border py-3 px-4 rounded w-full max-w-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <p className="text-red-500 font-bold text-lg my-4">{isError}</p>
        <div className="flex justify-center gap-6 w-full max-w-lg">
          <button
            type="submit"
            className="btn px-16 py-2 mt-4 text-lg bg-blue-600 text-white text-center"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <button
            type="button"
            onClick={() => document.getElementById("purchaseModal").close()}
            className="btn px-16 py-2 mt-4 text-lg bg-red-600 text-white text-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StripeCheckoutForm;
