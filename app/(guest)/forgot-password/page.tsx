"use client";

import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";
import { Form, Input, Button, Card, Typography, Divider, Space } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Text, Link } = Typography;

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  type userForgotPassword = {
    email: string;
  };

  const initialState = {
    email: "",
  };

  const [state, setState] = useState<userForgotPassword>(initialState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    try {
      const forgotPassword = state;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          body: JSON.stringify(forgotPassword),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const json = await res.json();

        localStorage.setItem("reset-token", json.data.token.resetToken);
        router.push("/authenticator");
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  }

  const onFinish = () => {
    handleSubmit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8F8FF] px-16">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="relative w-full h-64 md:h-full">
          <Image
            src="/images/illustration/tourist-dancing-with-suitcase.png"
            alt="Forgot Password Illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center p-4">
        <Card
          className="w-full bg-white shadow-lg"
          style={{ maxWidth: "600px" }}
        >
          <div className="text-center mb-4">
            <Typography.Title level={3} className="m-0">
              Forgot Password?
            </Typography.Title>
            <Text type="secondary">
              Enter the email address associated with an account.
            </Text>
          </div>
          <Form
            name="forgot-password"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label={<span>Please enter Email or Number </span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email or Number!",
                },
                {
                  validator: (_, value) => {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phonePattern = /^[0-9]{10,15}$/;

                    if (!value) {
                      return Promise.reject(
                        "Please input your Email or Number!"
                      );
                    }

                    if (
                      !emailPattern.test(value) &&
                      !phonePattern.test(value)
                    ) {
                      return Promise.reject(
                        "Please enter a valid Email or Number!"
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input value={state.email} name="email" onChange={handleChange} />
            </Form.Item>
            <div className="text-center my-5">
              <Text type="secondary">
                Back to
                <Link
                  href="/login"
                  style={{ color: "#4F28D9" }}
                  className="ml-1"
                >
                  Sign in
                </Link>
              </Text>
            </div>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Next
              </Button>
            </Form.Item>
          </Form>
          <Divider>Or continue with</Divider>
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

export default ForgotPassword;
