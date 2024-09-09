"use client";

import React, { SyntheticEvent, useState } from "react";
import Image from "next/image";
import { Form, Input, Button, Card, Typography, Divider, Space } from "antd";
import { useRouter } from "next/navigation";

const { Text } = Typography;

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const refreshToken = localStorage.getItem("refresh-token");
  type reset = {
    newPassword: string;
    confirmNewPassword: string;
  };

  const initialState = {
    newPassword: "",
    confirmNewPassword: "",
  };
  const [state, setState] = useState<reset>(initialState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const { confirmNewPassword, ...reset } = state;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "PUT",
          body: JSON.stringify({ ...reset, refreshToken }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("");
      }
    } catch (error) {
      console.error("Request failed", error);
    }
  }

  const onFinish = (values: any) => {
    handleSubmit(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#F8F8FF] px-16">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="relative w-full h-64 md:h-full">
          <Image
            src="/images/illustration/tourist-running-fast.png"
            alt="Reset Password Illustration"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center p-4">
        <Card
          className="w-full rounded-xl bg-white shadow-lg"
          style={{ maxHeight: "calc(100vh - 4rem)" }}
        >
          <div className="text-center mb-4">
            <Typography.Title level={3} className="m-0">
              Password
            </Typography.Title>
            <Text type="secondary">
              Choose a{" "}
              <Text style={{ color: "#4F28D9", fontWeight: 500 }}>
                strong password
              </Text>{" "}
              and don&apos;t reuse it for other accounts.
            </Text>
          </div>
          <Form
            form={form}
            name="reset-password"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password
                value={state.newPassword}
                onChange={handleChange}
              />
            </Form.Item>
            <div className="text-left pb-2">
              <span>Password strength:</span>
              <Text
                type="secondary"
                style={{
                  fontSize: "14px",
                  display: "block",
                  marginTop: "8px",
                  color: "#6c757d", // Slightly different gray for better contrast
                }}
              >
                Use at least{" "}
                <Text style={{ color: "#4F28D9", fontWeight: 500 }}>
                  9 characters
                </Text>
                . Don&apos;t use a password from another site, or something too
                obvious like your pet&apos;s name.
              </Text>
            </div>

            <Form.Item
              label="Confirm New Password"
              name="confirmNewPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Passwords don't match!");
                  },
                }),
              ]}
            >
              <Input.Password
                value={state.confirmNewPassword}
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                onClick={handleSubmit}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
