"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

export default function InformationPersonal() {
  const [form] = useForm();
  const [id, setId] = useState("");

  // Nilai awal untuk form
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    country: "",
    province: "",
    city: "",
    district: "",
    streetAddress: "",
  };

  const [initialState, setInitialState] = useState(initialValues);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const json = await res.json();
      const userId = json.sub;
      setId(userId);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const fetchProfileData = async (userId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const profileData = await res.json();

      setInitialState({
        fullName: profileData.data.fullName,
        email: profileData.data.email,
        phoneNumber: profileData.data.phoneNumber,
        gender: profileData.data.gender,
        day: profileData.data.birthDate ? profileData.data.birthDate.day : "",
        month: profileData.data.birthDate
          ? profileData.data.birthDate.month
          : "",
        year: profileData.data.birthDate ? profileData.data.birthDate.year : "",
        country: profileData.data.country,
        province: profileData.data.province,
        city: profileData.data.city,
        district: profileData.data.district,
        streetAddress: profileData.data.address,
      });

      form.setFieldsValue({
        fullName: profileData.data.fullName,
        email: profileData.data.email,
        phoneNumber: profileData.data.phoneNumber,
        gender: profileData.data.gender,
        day: profileData.data.birthDate ? profileData.data.birthDate.day : "",
        month: profileData.data.birthDate
          ? profileData.data.birthDate.month
          : "",
        year: profileData.data.birthDate ? profileData.data.birthDate.year : "",
        country: profileData.data.country,
        province: profileData.data.province,
        city: profileData.data.city,
        district: profileData.data.district,
        streetAddress: profileData.data.address,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (id) {
      fetchProfileData(id);
    }
  }, [id]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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

  // Contoh daftar provinsi, kota, dan distrik
  const provinces = ["Jawa Barat", "DKI Jakarta", "Banten"];
  const cities = ["Bandung", "Jakarta", "Tangerang"];
  const districts = ["Cicendo", "Kebayoran", "Serpong"];

  return (
    <div className="bg-white rounded-xl w-full">
      <p className="text-xl font-semibold my-6 mx-9">Setting Account</p>
      <div className="h-px bg-gray-300"></div>

      <div className="px-9 py-6">
        <p className="text-base font-semibold">Profile</p>
        <span className="text-sm text-gray-500">
          This information is confidential, so be careful what you share
        </span>
        <div className="pt-4">
          <Form
            form={form}
            name="personal_info"
            initialValues={initialValues}
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
                <Input placeholder="Enter your full name" />
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
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@example\.com$/,
                    message: "Email must be in the format name@example.com",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
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
                  {
                    pattern: /^[0-9]+$/,
                    message: "Phone number must only contain digits!",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              {/* Gender */}
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
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
                      {
                        required: true,
                        message: "Please select your birth day!",
                      },
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
                      {
                        required: true,
                        message: "Please select your birth month!",
                      },
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
                      {
                        required: true,
                        message: "Please select your birth year!",
                      },
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
                <Select
                  showSearch
                  placeholder="Select your country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  <Option value="Indonesia">Indonesia</Option>
                  <Option value="United States">United States</Option>
                  <Option value="Canada">Canada</Option>
                  <Option value="Australia">Australia</Option>
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
                <Select
                  showSearch
                  placeholder="Select your province"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
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
                <Select
                  showSearch
                  placeholder="Select your city"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
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
                <Select
                  showSearch
                  placeholder="Select your district"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {districts.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Street Address (Full Width) */}
              <Form.Item
                label="Street Address"
                name="streetAddress"
                className="col-span-1 md:col-span-3"
                rules={[
                  {
                    required: true,
                    message: "Please enter your street address!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="e.g., Jl. Kebon Jeruk No. 123, RT 02 RW 03, Kelurahan Kebon Melati, Kecamatan Tanah Abang, Jakarta Pusat, DKI Jakarta 10230"
                  rows={3}
                />
              </Form.Item>
            </div>

            {/* Save Changes Button */}
            <Form.Item className="flex justify-end">
              <Button type="primary" htmlType="submit" className="w-max mt-6">
                Change Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
