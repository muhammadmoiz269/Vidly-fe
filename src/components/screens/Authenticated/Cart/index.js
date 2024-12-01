import React, { useEffect, useState } from "react";
import {
  addProductsToCart,
  getUserCart,
  handleCheckout,
  removeProductFromCart,
} from "../../../../api";
import CartList from "../../../common/CartList";
import { Button, Col, Empty, Row } from "antd";
import StripePayment from "./StripePayment";
import OrderSummary from "./OrderSummary";
import CardDetailsForm from "./CardDetailsForm";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [intentDetails, setIntentDetails] = useState();
  const total = cart?.reduce(
    (acc, curr) => curr.quantity * curr.productPrice + acc,
    0
  );

  const getCartDetails = async () => {
    const userId = localStorage.getItem("userId");
    const resp = await getUserCart({ userId });
    console.log("response", resp);
    setCart(resp?.data[0]?.items);
  };

  const updateCartDetails = async (prodId, quantity) => {
    const userId = localStorage.getItem("userId");
    const cartPayload = {
      userId,
      items: [
        {
          productId: prodId,
          quantity: quantity,
        },
      ],
    };
    console.log("cartPayload", cartPayload);
    const resp = await addProductsToCart(cartPayload);
    console.log("Item added to cart", resp);
  };

  const removeCartItem = async (prodId) => {
    const userId = localStorage.getItem("userId");
    const payload = {
      userId,
      productId: prodId,
    };
    console.log("cartPayload", payload);
    const resp = await removeProductFromCart(payload);

    if (resp.status === 200) {
      getCartDetails();
    }
    console.log("Item deleted to cart", resp);
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  console.log("cartlist", cart);

  const handleClick = async () => {
    console.log("handle click");
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");

      const response = await handleCheckout({ userId });
      console.log("response", response);
      if (response.status === 201) {
        setIntentDetails(response.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h3>Checkout details</h3>

      <Row gutter={[16, 16]}>
        <Col lg={12} md={12}>
          <Row gutter={[8, 8]}>
            {cart?.length > 0 ? (
              cart?.map((item) => (
                <Col lg={24} md={24} sm={24}>
                  <CartList
                    item={item}
                    updateCartDetails={updateCartDetails}
                    removeCartItem={removeCartItem}
                  />
                </Col>
              ))
            ) : (
              <Empty />
            )}
          </Row>
        </Col>
        <Col lg={12} md={12}>
          <div
            style={{
              border: "1px solid #dddd",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            {intentDetails ? (
              <StripePayment
                clientSecret={intentDetails?.clientSecret}
                orderId={intentDetails?.orderId}
                publishKey="pk_test_51K1OxsLJ6MfCVSfKtMbb0LusMZjrQEksG7hURY9at7Jq9iPcbwkTJOdCLab71SkuBuxb61sVtYOUAqnzigGYZTIB002eGDMMcL"
              />
            ) : (
              <OrderSummary
                handleClick={handleClick}
                total={total}
                loading={loading}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
