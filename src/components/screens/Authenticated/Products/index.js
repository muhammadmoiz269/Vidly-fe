import React from "react";
import { Button, Form, message } from "antd";
import Heading from "../../../common/Heading";
import InputField from "../../../common/InputField";
import SelectBar from "../../../common/SelectBar";
import { productCategories } from "../../../../constants";
import { createProduct, getAllProducts } from "../../../../api";

const Products = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    console.log("val", values);
    try {
      console.log("Success:", values);
      const productPayload = {
        ...values,
      };
      const response = await createProduct(productPayload);
      console.log("response", response);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "Product created successfully",
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

  const onFinishFailed = (error) => {
    console.log(error);
  };
  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      {contextHolder}
      <Heading headingText="Product Creation" />
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
                message: "Please input product name",
              },
            ]}
            type="input"
          />
          <SelectBar
            label="Category"
            name="category"
            mode="multiple"
            options={productCategories}
          />
          <InputField label="Description" name="description" type="input" />

          <InputField
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input product price",
              },
            ]}
            type="number"
          />

          <InputField
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input product price",
              },
            ]}
            type="number"
          />

          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Products;
