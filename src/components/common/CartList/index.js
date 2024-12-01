import { Button } from "antd";
import Paragraph from "antd/es/skeleton/Paragraph";
import React, { useState } from "react";

const CartList = ({ item, updateCartDetails, removeCartItem }) => {
  const [qty, setQty] = useState(item.quantity);

  console.log("item", item);

  const handleUpdateQty = (e, action) => {
    const newQty = action === "add" ? qty + 1 : qty - 1;
    setQty(newQty);
    updateCartDetails(item.productId, newQty);
  };

  return (
    <div
      style={{
        border: "1px solid #dddd",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
      }}
    >
      <div style={{ width: "60%" }}>
        <p style={{ fontWeight: "bold" }}>{item.productName}</p>
        <p>{item.productDescription}</p>
        <p style={{ fontWeight: "bold" }}>Rs. {item.productPrice}</p>
      </div>

      <div
        style={{
          width: "40%",
        }}
      >
        <div style={{ marginBottom: "10px" }}>Qty:</div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "space-around",
            border: "1px solid #dddd",
            width: "120px",
            height: "50px",
            borderRadius: "10px",
          }}
        >
          <button
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={(e) => handleUpdateQty(e, "subract")}
          >
            -
          </button>
          <p style={{ fontSize: "15px" }}>{qty}</p>
          <button
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={(e) => handleUpdateQty(e, "add")}
          >
            +
          </button>
        </div>
        <div>
          <p
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => removeCartItem(item.productId)}
          >
            {" "}
            Remove Item
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartList;
