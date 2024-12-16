"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  Space,
  Row,
  Col,
  message,
} from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { TokenUtil } from "#/utils/token";
import { authRepository } from "#/repository/auth";

const { Text } = Typography;

const Authenticator: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [form] = Form.useForm();
  const [timer, setTimer] = useState<number>(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const code = searchParams?.get("code");
  const resetToken = searchParams?.get("token");
  if (!resetToken) {
    return;
  }
  localStorage.setItem("reset_token", resetToken);

  useEffect(() => {
    if (code) {
      form.setFieldsValue({ code });

      onFinish({ code });
    }
  }, [code]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    // error localStorage is not defined
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = async () => {
    try {
      const email = localStorage.getItem("email");
      await authRepository.api.sendOtp(email);
      setTimer(60);
    } catch (error) {
      message.error("Failed to resend code.");
    }
  };

  const onFinish = async (values: any) => {
    try {
      const otp = values.code.split("").join("");
      const data = {
        token: resetToken,
        otp,
      };
      const req = await authRepository.api.verifyOtp(data);

      if (req.ok) {
        message.success("OTP verified successfully!");
        router.push("/reset-password");
      } else {
        message.error("Invalid OTP. Try again.");
        router.push("/authenticator");
      }
    } catch (error) {
      message.error("Something went wrong. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("Please input the code!");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && inputRefs.current[index]?.value === "") {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-Lilac-50 px-16">
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="relative w-full h-64 md:h-full">
          <Image
            src="/images/illustration/hipster-tourist-looking-map.png"
            alt="Authenticator Illustration"
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
              Two Factor Authentication
            </Typography.Title>
            <Text type="secondary">
              We have sent a
              <Text style={{ color: "#4F28D9", margin: "0 4px" }}>code</Text>
              to your email.
            </Text>
          </div>

          <Form
            form={form}
            name="authenticator"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Enter the code we have sent you"
              name="code"
              rules={[{ required: true, message: "Please input the code!" }]}
            >
              <Row gutter={8}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Col span={6} key={index}>
                    <Input
                      maxLength={1}
                      placeholder="#"
                      style={{
                        fontSize: "24px",
                        textAlign: "center",
                        padding: "10px",
                        borderRadius: "8px",
                      }}
                      inputMode="numeric"
                      ref={(el) =>
                        (inputRefs.current[index] =
                          (el as unknown as HTMLInputElement) || null)
                      }
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  </Col>
                ))}
              </Row>
            </Form.Item>
            <div className="text-center my-5 flex justify-between">
              <Text type="secondary">Didn't get a code?</Text>
              <div className="flex items-center">
                <Button
                  type="link"
                  onClick={handleResendCode}
                  disabled={timer > 0}
                >
                  Resend code
                </Button>
                {timer > 0 && (
                  <Text className="" type="secondary">
                    ({timer}s)
                  </Text>
                )}
              </div>
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

export default Authenticator;
