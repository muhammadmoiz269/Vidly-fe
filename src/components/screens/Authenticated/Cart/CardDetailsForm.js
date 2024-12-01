import React from "react";
import InputField from "../../../common/InputField";
import { Button, Form } from "antd";

const CardDetailsForm = () => {
  const onFinish = (val) => {
    console.log("val", val);
  };

  const onFinishFailed = (e) => {
    console.log("Error", e);
  };
  return (
    <div>
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
        <InputField
          label="Card Number"
          name="card"
          rules={[
            {
              required: true,
              message: "Please input card number",
            },
          ]}
          type="input"
        />

        <Button type="primary" htmlType="submit">
          Pay Now
        </Button>
      </Form>
    </div>
  );
};

export default CardDetailsForm;
