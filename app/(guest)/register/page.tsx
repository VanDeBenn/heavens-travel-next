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
import { authRepository } from "#/repository/auth";
import { TokenUtil } from "#/utils/token";

const { Text, Link } = Typography;

const Register = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  if (TokenUtil.accessToken && TokenUtil.refreshToken) {
    router.push("/profile");
  } else {
    router.push("/register");
  }

  type RegisterForm = {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    roleId: string;
  };

  const onFinish = async (values: RegisterForm) => {
    try {
      const dataRegister = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        confirmPassword: values.confirmPassword,
        roleId: "32a5bee8-e7a7-4631-9f6e-f394b519ae86",
      };
      const { confirmPassword, ...data } = dataRegister;

      await authRepository.api.register(data);
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleLoginGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-Lilac-50 px-16">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="relative w-full h-64 md:h-full">
          <Image
            src="/images/illustration/tourist-presenting-something.png"
            alt="Sign Up Illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center p-4">
        <Card className="w-full rounded-xl bg-white shadow-lg">
          <div className="text-center mb-4">
            <Typography.Title level={3} className="m-0">
              Create new account
            </Typography.Title>
            <Text type="secondary">
              Already a member?
              <Link href="/login" style={{ color: "#4F28D9" }}>
                Log in
              </Link>
            </Text>
          </div>
          <Form
            form={form}
            name="register"
            layout="vertical"
            initialValues={{ roleId: "73176062-1eda-44ca-9112-57f775f9affd" }}
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
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number!",
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

            <Form.Item name="roleId" hidden>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Register
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
            <Button icon={<FacebookOutlined />} shape="circle" />
            <Button icon={<AppleOutlined />} shape="circle" />
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Register;
