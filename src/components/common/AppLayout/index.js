import React from "react";
import { Layout, Menu, message } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { postUserLogout } from "../../../api";

const { Header, Content, Footer, Sider } = Layout;

const items1 = ["Orders", "Cart", "Logout"].map((key) => ({
  key,
  label: key,
}));

const sideItems = ["Product", "Cart", "Payout"].map((key) => ({
  key,
  label: key,
  children: [
    {
      key: "product",
      label: `Create product`,
    },
    {
      key: "product-listing",
      label: `Product Listing`,
    },
  ],
}));

function AppLayout() {
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resp = await postUserLogout();
      localStorage.clear();
      if (resp.status === 200) {
        messageApi.open({
          type: "success",
          content: "Successfully logged out",
        });
        navigate("/login");
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Logout failed. Try again.",
      });
    }
  };

  const handleMenuClick = (e) => {
    if (e.key === "Cart") {
      navigate("/cart");
    }
    if (e.key === "Orders") {
      navigate("/orders");
    }
    if (e.key === "Logout") {
      handleLogout();
    }
  };

  const handleSubMenuClick = (e) => {
    console.log("e", e);
    navigate(`/${e.key}`);
  };

  return (
    <>
      {contextHolder}
      <Layout>
        <Header className="header">
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            items={items1}
            onClick={handleMenuClick}
          />
        </Header>
        <Content>
          <Layout>
            <Sider width={200}>
              <Menu
                mode="inline"
                items={sideItems}
                onClick={handleSubMenuClick}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: "100vh" }}>
              <Outlet />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Powered by Techburners</Footer>
      </Layout>
    </>
  );
}

export default AppLayout;
