import { Card } from "antd";
import React from "react";
import Star from "../Star";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addProductsToCart } from "../../../api";
import { triggerNotification } from "../../../constants";

const CardBox = ({ item }) => {
  const rating = item?.review.reduce((acc, curr) => acc + curr.rating, 0);
  const arrayLength = item?.review?.length;

  const handleAdd = async () => {
    const userId = localStorage.getItem("userId");
    const cartPayload = {
      userId,
      items: [
        {
          productId: item._id,
          quantity: 1,
        },
      ],
    };
    console.log("cartPayload", cartPayload);
    const resp = await addProductsToCart(cartPayload);
    console.log("Item added to cart", resp);
    triggerNotification(
      "success",
      "Added",
      "Item successfully added to the cart!"
    );
  };
  return (
    <Card
      title={item.name}
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <div style={{ float: "right" }}>
        {item.category.map((cat) => (
          <p style={{ fontWeight: "bold" }}>{cat}</p>
        ))}
      </div>
      <p>{item.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Qty: {item.stock}</p>
        <p>Price: {item.price}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Star value={Math.ceil(rating / arrayLength)} disabled={true} />
        <ShoppingCartOutlined
          style={{ cursor: "pointer", color: "#eb2f96", fontSize: "16px" }}
          onClick={handleAdd}
        />
      </div>
    </Card>
  );
};

export default CardBox;
