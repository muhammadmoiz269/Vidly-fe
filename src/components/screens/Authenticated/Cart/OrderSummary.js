import { Button } from "antd";
import React from "react";

const OrderSummary = ({ handleClick, total, loading }) => {
  return (
    <div>
      <h3>Order Summary</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "bold" }}> Item Total </p>
        <p style={{ fontWeight: "bold" }}> Rs. {total}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "bold" }}> Discount </p>
        <p style={{ fontWeight: "bold" }}> Rs. 0</p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "bold" }}> Total </p>
        <p style={{ fontWeight: "bold" }}> Rs. {total}</p>
      </div>

      <Button type="primary" block onClick={handleClick} loading={loading}>
        Proceed to checkout
      </Button>
    </div>
  );
};

export default OrderSummary;
