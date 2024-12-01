import { Card } from "antd";
import React, { useState } from "react";
import Star from "../Star";
import { DoubleRightOutlined } from "@ant-design/icons";
import { addReviewToProd } from "../../../api";

const ReviewCard = ({ item, orderId, userId }) => {
  const [value, setValue] = useState(0);

  const handleSubmit = async () => {
    if (item.isReviewed) return;
    const payload = {
      orderId,
      productId: item.productId,
      rating: Number(value),
      userId,
    };
    const resp = await addReviewToProd(payload);
    console.log("resp", resp);
  };

  return (
    <Card
      title={item.productName}
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <div style={{ float: "right" }}>
        {item.productCategory.map((cat) => (
          <p style={{ fontWeight: "bold" }}>{cat}</p>
        ))}
      </div>
      <p>{item.productDescription}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Price: {item.productPrice}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Star value={value} setValue={setValue} disabled={item.isReviewed} />
        <DoubleRightOutlined onClick={handleSubmit} />
      </div>
    </Card>
  );
};

export default ReviewCard;
