import React, { useEffect, useState } from "react";
import { fetchUserOrders } from "../../../../api";
import TableBox from "../../../common/TableBox";
import { Space } from "antd";
import { formatDateTime } from "../../../../constants";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  let navigate = useNavigate();

  const columns = [
    {
      title: "Order no",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <a style={{ color: "green" }}>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => <p>{formatDateTime(date)}</p>,
    },

    {
      title: "No of items",
      dataIndex: "items",
      key: "items",
      render: (text) => <a>{text.length}</a>,
    },
    {
      title: "Total amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/order-detail/${record._id}`)}>
            View items
          </a>
        </Space>
      ),
    },
  ];

  const getUserOrders = async () => {
    const userId = localStorage.getItem("userId");

    console.log("user id", userId);
    try {
      const payload = {
        userId,
      };
      const resp = await fetchUserOrders(payload);
      setOrders(resp?.data?.userOrders);
      console.log("respi", resp);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      {orders?.length > 0 ? (
        <TableBox columns={columns} data={orders} />
      ) : (
        "No orders found"
      )}
    </div>
  );
};

export default Orders;
