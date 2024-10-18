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

const HotelForm: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Basic Information</span>
      </div>

      {/* Form */}
      <Form layout="vertical">
        {/* Name Hotel, Room Type, Rating */}
        <div className="flex justify-between gap-4">
          <Form.Item
            label="Name Hotel"
            name="nameHotel"
            className="w-full"
            rules={[
              { required: true, message: "Please input hotel name!" },
            ]}
          >
            <Input placeholder="Enter hotel name" />
          </Form.Item>

          <Form.Item
            label="Room Type"
            name="roomType"
            className="w-full"
            rules={[{ required: true, message: "Please input room type!" }]}
          >
            <Input placeholder="Enter room type" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            className="w-full"
            rules={[{ required: true, message: "Please input rating!" }]}
          >
            <InputNumber
              min={1}
              max={5}
              placeholder="Enter rating"
              className="w-full"
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          className="w-full"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input.TextArea
            rows={12}
            placeholder="Enter destination description"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default HotelForm;
