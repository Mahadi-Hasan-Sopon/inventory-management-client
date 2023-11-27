import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isError, setIsError] = useState("");

  const handleCheckoutSubmit = async (event) => {
    event.preventDefault();

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
            disabled={!stripe}
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
