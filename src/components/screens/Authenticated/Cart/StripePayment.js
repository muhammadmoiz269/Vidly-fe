import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const StripePayment = ({ clientSecret, publishKey, orderId }) => {
  const [stripePromise, setStripePromise] = useState();

  useEffect(() => {
    setStripePromise(loadStripe(publishKey));
  }, []);

  return (
    <div>
      <p>React stripe and the payment element</p>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
