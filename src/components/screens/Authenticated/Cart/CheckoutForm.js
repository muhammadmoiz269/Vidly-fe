import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "antd";
import React from "react";
import { handleProcessOrder } from "../../../../api";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();

  const handleConfirmAndProcessOrder = async (orderId) => {
    if (!stripe || !elements) {
      console.error("Stripe has not loaded");
      return;
    }

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Update as needed
      },
      redirect: "if_required",
    });

    console.log("Order successfull", paymentIntent);

    if (error) {
      console.error("Payment confirmation error:", error);
      return;
    }

    console.log("PAYMENT INTENT", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      console.log("Payment successful:", paymentIntent);

      // Call backend to process order
      try {
        const response = await handleProcessOrder({
          orderId,
          paymentIntentId: paymentIntent.id,
        });
        console.log("Order processed successfully:", response.data);

        navigate("/product-listing");
      } catch (apiError) {
        console.error("Error processing order:", apiError.response.data);
      }
    } else {
      console.error("Payment was not successful");
    }
  };

  return (
    <div>
      <PaymentElement />
      <Button onClick={() => handleConfirmAndProcessOrder(orderId)}>
        Pay Now
      </Button>
    </div>
  );
};

export default CheckoutForm;
