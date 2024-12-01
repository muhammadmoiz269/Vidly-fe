import React from "react";
import { Button, Form, message } from "antd";
import Heading from "../../../common/Heading";
import InputField from "../../../common/InputField";
import { postUserLogin } from "../../../../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  let navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log("Success:", values);
      const userPayload = {
        ...values,
      };
      const response = await postUserLogin(userPayload);
      console.log("response", response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.userPayload.token);
        localStorage.setItem("userId", response.data.userPayload._doc._id);

        messageApi.open({
          type: "success",
          content: "User logged in successfully",
        });
        navigate("/product-listing");
      } else {
        messageApi.open({
          type: "error",
          content: response.response.data,
        });
      }
    } catch (error) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: "Something went wrong",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      {contextHolder}
      <Heading headingText="Login" />
      <Form
        name="basic"
        style={{
          maxWidth: 600,
          gap: "20px",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item>
          <InputField
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
            type="input"
          />
          <InputField
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            type="password"
          />
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
