"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from 'next/navigation'; // Mengimpor useRouter dari Next.js

export default function ChangePassword() {
  const [form] = useForm();
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmNewPassword: false,
  });
  const router = useRouter(); // Menginisialisasi useRouter

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const togglePasswordVisibility = (
    field: "newPassword" | "confirmNewPassword"
  ) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleForgetPasswordClick = () => {
    router.push('/forgot-password'); // Navigasi ke halaman /forgot-password
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="px-9 py-6">
        <h1 className="text-lg font-semibold">Change Your Password</h1>
        <span className="text-sm text-gray-500">
          Make sure you remember your new password before changing it.
        </span>
        <div className="pt-4">
          <Form
            form={form}
            name="change_password"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <div className="grid grid-cols-1 gap-2">
              {/* Current Password */}
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: "Please enter your current password!" }]}
                className="col-span-1"
              >
                <Input.Password
                  placeholder="Enter your current password"
                  size="large"
                />
              </Form.Item>

              {/* New Password and Confirm New Password (Side by Side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[{ required: true, message: "Please enter your new password!" }]}
                  className="col-span-1"
                >
                  <Input.Password
                    placeholder="Enter your new password"
                    size="large"
                    type={showPassword.newPassword ? "text" : "password"}
                  />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  rules={[
                    { required: true, message: "Please confirm your new password!" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("The two passwords do not match!"));
                      },
                    }),
                  ]}
                  className="col-span-1"
                >
                  <Input.Password
                    placeholder="Confirm your new password"
                    size="large"
                    type={showPassword.confirmNewPassword ? "text" : "password"}
                  />
                </Form.Item>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Form.Item>
                  <Button
                    onClick={handleForgetPasswordClick} // Event handler untuk navigasi
                    className="w-max mt-6 bg-white text-[#4F28D9] border border-[#4F28D9] border-solid"
                  >
                    Forget Password
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-max mt-6"
                  >
                    Change Password
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
