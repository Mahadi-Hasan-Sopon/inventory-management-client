import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// eslint-disable-next-line react/prop-types
const Stripe = ({ selectedPlan }) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm selectedPlan={selectedPlan} />
    </Elements>
  );
};

export default Stripe;
