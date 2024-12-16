"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { authRepository } from "#/repository/auth";
import { usersRepository } from "#/repository/users";

const { Option } = Select;

interface ComponentsProps {
  id: string;
  data: any;
}

export default function InformationAdmin({ id, data }: ComponentsProps) {
  const router = useRouter();
  const [form] = useForm();
  const [userId, setUserId] = useState<string>("");

  type InitialValues = {
    fullName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    day: string;
    month: string;
    year: string;
    country: string;
    province: string;
    city: string;
    district: string;
    streetAddress: string;
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        birthdate: data.birtDate,
        country: data.country,
        province: data.province,
        city: data.city,
        district: data.district,
        streetAddress: data.address,
      });
    }
  }, [data, form]);

  const onFinish = async (values: InitialValues) => {
    // // console.log("Form submitted with values:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    // // console.log("Failed:", errorInfo);
  };

  // Generate options for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);

  // Example province, city, and district lists
  const provinces = ["Jawa Barat", "DKI Jakarta", "Banten"];
  const cities = ["Bandung", "Jakarta", "Tangerang"];
  const districts = ["Cicendo", "Kebayoran", "Serpong"];

  return (
    <div className="bg-white rounded-xl w-full">
      <p className="text-xl font-semibold my-6 mx-9">Setting Account</p>
      <div className="h-px bg-gray-300"></div>

      <div className="px-9 py-6">
        <p className="text-base font-semibold">Admin Profile</p>
        <span className="text-sm text-gray-500">
          This information is confidential, so be careful what you share
        </span>
        <div className="pt-4">
          <Form
            form={form}
            name="admin_info"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Full Name */}
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <Input placeholder="Enter admin's full name" />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                ]}
              >
                <Input placeholder="Enter admin's email" />
              </Form.Item>

              {/* Phone Number */}
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <Input placeholder="Enter admin's phone number" />
              </Form.Item>

              {/* Gender */}
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>

              {/* Birthdate */}
              <Form.Item label="Birthdate" required>
                <div className="grid grid-cols-3 gap-2">
                  <Form.Item
                    name="day"
                    rules={[
                      { required: true, message: "Please select birth day!" },
                    ]}
                    noStyle
                  >
                    <Select placeholder="Day">
                      {days.map((day) => (
                        <Option key={day} value={day.toString()}>
                          {day}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="month"
                    rules={[
                      { required: true, message: "Please select birth month!" },
                    ]}
                    noStyle
                  >
                    <Select placeholder="Month">
                      {months.map((month, index) => (
                        <Option
                          key={index + 1}
                          value={(index + 1).toString().padStart(2, "0")}
                        >
                          {month}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="year"
                    rules={[
                      { required: true, message: "Please select birth year!" },
                    ]}
                    noStyle
                  >
                    <Select placeholder="Year">
                      {years.map((year) => (
                        <Option key={year} value={year.toString()}>
                          {year}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Form.Item>

              {/* Country */}
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country!" },
                ]}
              >
                <Select placeholder="Select country">
                  <Option value="Indonesia">Indonesia</Option>
                  <Option value="United States">United States</Option>
                </Select>
              </Form.Item>

              {/* Province */}
              <Form.Item
                label="Province"
                name="province"
                rules={[
                  { required: true, message: "Please select your province!" },
                ]}
              >
                <Select placeholder="Select province">
                  {provinces.map((province) => (
                    <Option key={province} value={province}>
                      {province}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* City */}
              <Form.Item
                label="City"
                name="city"
                rules={[
                  { required: true, message: "Please select your city!" },
                ]}
              >
                <Select placeholder="Select city">
                  {cities.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* District */}
              <Form.Item
                label="District"
                name="district"
                rules={[
                  { required: true, message: "Please select your district!" },
                ]}
              >
                <Select placeholder="Select district">
                  {districts.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Street Address */}
              <Form.Item
                label="Street Address"
                name="streetAddress"
                className="col-span-1 md:col-span-3"
                rules={[
                  { required: true, message: "Please enter street address!" },
                ]}
              >
                <Input.TextArea
                  placeholder="Enter admin's street address"
                  rows={3}
                />
              </Form.Item>
            </div>

            {/* Save Changes Button */}
            <Form.Item className="flex justify-end">
              <Button type="primary" htmlType="submit" className="w-max mt-6">
                Update Admin Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
