"use client";

import React from "react";
import Image from "next/image";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  Space,
  message,
} from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { authRepository } from "#/repository/auth";
import { TokenUtil } from "#/utils/token";

const { Text, Link } = Typography;

const Login = () => {
  const router = useRouter();
  try {
    if (TokenUtil.accessToken && TokenUtil.refreshToken) {
      router.push("/profile");
    } else {
    }
  } catch (error) {}

  type loginForm = {
    email: string;
    password: string;
  };

  const onFinish = async (values: loginForm) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const req = await authRepository.api.login(data);

      if (req.ok) {
        TokenUtil.setAccessToken(req.body.data.token.accessToken);
        TokenUtil.setRefreshToken(req.body.data.token.refreshToken);

        TokenUtil.persistToken();

        const dataUser = await authRepository.api.getUser();
        router.push("/profile");
      } else {
        throw new Error("Login failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.body?.error || "Login failed";
      message.error(errorMessage);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleLoginGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-Lilac-50 px-16">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="relative w-full h-64 md:h-full">
          <Image
            src="/images/illustration/login-hd.png"
            alt="Login Illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center p-4">
        <Card className="w-full bg-white">
          <div className="text-center mb-4">
            <Typography.Title level={3} className="m-0">
              Log in
            </Typography.Title>
            <Text type="secondary">
              Welcome back! Please enter your account!
            </Text>
          </div>
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email  "
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email  !",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.resolve();
                    }

                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phonePattern = /^[0-9]{10,15}$/;

                    if (
                      !emailPattern.test(value) &&
                      !phonePattern.test(value)
                    ) {
                      return Promise.reject(
                        new Error("Please enter a valid Email  !")
                      );
                    }

                    return Promise.resolve();
                  },
                }),
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

            <Form.Item>
              <Button
                type="link"
                onClick={handleForgotPassword}
                className="p-0"
              >
                Forgot password?
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>
          </Form>
          <Divider>Or continue with</Divider>
          <Space size="large" className="flex justify-center my-4">
            <Button
              onClick={handleLoginGoogle}
              icon={<GoogleOutlined />}
              shape="circle"
            />
            {/* <Button icon={<FacebookOutlined />} shape="circle" />
            <Button icon={<AppleOutlined />} shape="circle" /> */}
          </Space>
          <div className="text-center mt-4">
            <Text type="secondary">Don’t have an account? </Text>
            <Link href="/register" style={{ color: "#4F28D9" }}>
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
