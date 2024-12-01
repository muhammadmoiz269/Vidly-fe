import React, { useEffect, useState } from "react";
import { getSpecificOrder } from "../../../../api";
import { useParams } from "react-router-dom";
import { Col, Empty, Row } from "antd";
import CardBox from "../../../common/CardBox";
import ReviewCard from "../../../common/ReviewCard";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState([]);

  const getOrderDetails = async () => {
    try {
      const payload = {
        orderId: id,
      };
      const resp = await getSpecificOrder(payload);
      setOrderDetail(resp?.data);
      console.log("respi", resp);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  console.log("order details", orderDetail);

  return (
    <div style={{ marginTop: "40px" }}>
      <Row gutter={[8, 8]}>
        {orderDetail?.length > 0 ? (
          orderDetail?.[0]?.items?.map((item) => (
            <Col lg={12} md={12} sm={12}>
              <ReviewCard
                item={item}
                orderId={id}
                userId={orderDetail[0]?.userId}
              />
            </Col>
          ))
        ) : (
          <Empty />
        )}
      </Row>
    </div>
  );
};

export default OrderDetail;
