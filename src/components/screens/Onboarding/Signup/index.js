import { Button, Form, message } from "antd";
import React from "react";
import InputField from "../../../common/InputField";
import CheckBox from "../../../common/CheckBox";
import Heading from "../../../common/Heading";
import { postUserRegister } from "../../../../api";

const Signup = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      console.log("Success:", values);
      const userPayload = {
        ...values,
      };
      const response = await postUserRegister(userPayload);
      console.log("response", response);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "User created successfully",
        });
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
      <Heading headingText="Register form" />
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
            type="input"
          />
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
          <CheckBox label="Is Admin" name="isAdmin" />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
