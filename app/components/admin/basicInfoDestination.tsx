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

const DestinationForm: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Basic Information</span>
      </div>

      {/* Form */}
      <Form layout="vertical">
        {/* Name Destination, Rating, Max Capacity */}
        <div className="flex justify-between gap-4">
          <Form.Item
            label="Name Destination"
            name="nameDestination"
            className="w-full"
            rules={[
              { required: true, message: "Please input destination name!" },
            ]}
          >
            <Input placeholder="Enter destination name" />
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

          <Form.Item
            label="Max Capacity/Book"
            name="maxCapacity"
            className="w-full"
            rules={[{ required: true, message: "Please input max capacity!" }]}
          >
            <InputNumber
              min={1}
              placeholder="Enter max capacity"
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

        {/* Adult Price, Children Price */}
        <div className="flex justify-between gap-4">
          <Form.Item
            label="Adult Price"
            name="adultPrice"
            className="w-full"
            rules={[{ required: true, message: "Please input adult price!" }]}
          >
            <InputNumber
              min={0}
              formatter={(value) =>
                `Rp${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(displayValue) =>
                displayValue!.replace(/\Rp\s?|(,*)/g, "") as unknown as 0
              }
              placeholder="Enter adult price"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Children Price"
            name="childrenPrice"
            className="w-full"
            rules={[
              { required: true, message: "Please input children price!" },
            ]}
          >
            <InputNumber
              min={0}
              formatter={(value) =>
                `Rp${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              // parser={(value) => value!.replace(/\Rp\s?|(,*)/g, "")}
              parser={(displayValue) =>
                displayValue!.replace(/\Rp\s?|(,*)/g, "") as unknown as 0
              }
              placeholder="Enter children price"
              className="w-full"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default DestinationForm;
