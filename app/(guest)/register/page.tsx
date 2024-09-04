"use client";

import React from "react";
import Image from "next/image";
import { Form, Input, Button, Card, Typography, Divider, Space } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text, Link } = Typography;

const Register: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm(); // Inisialisasi Form instance

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8F8FF] px-16">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="relative w-full h-64 md:h-full">
          <Image
            src="/images/illustration/tourist-presenting-something.png" // Update path if needed
            alt="Sign Up Illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center p-4">
        <Card
          className="w-full rounded-xl bg-white shadow-lg"
          style={{ maxHeight: "calc(100vh - 4rem)" }} // Pendekkan card
        >
          <div className="text-center mb-4">
            <Typography.Title level={3} className="m-0">
              Create new account
            </Typography.Title>
            <Text type="secondary">
              Already a member?{" "}
              <Link href="/login" style={{ color: "#4F28D9" }}>
                Log in
              </Link>
            </Text>
          </div>
          <Form
            form={form}
            name="register"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Number"
              name="number"
              rules={[
                { required: true, message: "Please input your number!" },
                {
                  pattern: /^[0-9]{10,15}$/,
                  message: "Please enter a valid number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords don't match!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Register
              </Button>
            </Form.Item>
          </Form>
          <Divider>Or continue with</Divider>{" "}
          {/* Divider dengan teks di tengah */}
          <Space size="large" className="flex justify-center my-4">
            <Button icon={<GoogleOutlined />} shape="circle" />
            <Button icon={<FacebookOutlined />} shape="circle" />
            <Button icon={<AppleOutlined />} shape="circle" />
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Register;
