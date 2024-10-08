"use client";

import React from "react";
import { Form, Input, InputNumber } from "antd";
import { Montserrat } from "next/font/google";

const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const locationInfoDestination: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Location information</span>
      </div>

      {/* Form */}
      <Form layout="vertical">
        {/* Address */}
        <div className="w-full">
          <Form.Item
            label="Address"
            name="address"
            className="w-full"
            rules={[
              { required: true, message: "Please input address!" },
            ]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
        </div>

        {/* Path Location */}
        <Form.Item
          label="Path Location"
          name="pathLocation"
          className="w-full"
          rules={[{ required: true, message: "Please input path location!" }]}
        >
          <Input.TextArea
            rows={7}
            placeholder="Enter path location"
          />
        </Form.Item>

        {/* District, City */}
        <div className="flex justify-between gap-5">
          <Form.Item
            label="District"
            name="district"
            className="w-full"
            rules={[{ required: true, message: "Please input district!" }]}
          >
            <Input placeholder="Enter district" className="w-full" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            className="w-full"
            rules={[{ required: true, message: "Please input city!" }]}
          >
            <Input placeholder="Enter city" className="w-full" />
          </Form.Item>
        </div>

        {/* Province, Country */}
        <div className="flex justify-between gap-5">
          <Form.Item
            label="Province"
            name="province"
            className="w-full"
            rules={[{ required: true, message: "Please input province!" }]}
          >
            <Input placeholder="Enter province" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            className="w-full"
            rules={[{ required: true, message: "Please input country!" }]}
          >
            <Input placeholder="Enter country" className="w-full" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default locationInfoDestination;
