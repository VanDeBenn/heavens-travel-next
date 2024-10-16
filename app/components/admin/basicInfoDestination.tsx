"use client";

import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { Montserrat } from "next/font/google";
import { useForm } from "antd/es/form/Form";

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

interface BasicInfoProps {
  setBasicInfo: (info: any) => void;
  next: () => void;
  data: any;
}

export default function BasicInfoDestination({
  setBasicInfo,
  next,
  data,
}: BasicInfoProps) {
  const [form] = useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        nameDestination: data.nameDestination,
        rating: data.rating,
        maxCapacity: data.maxCapacity,
        description: data.description,
        adultPrice: data.adultPrice,
        childrenPrice: data.childrenPrice,
      });
    }
  }, [data, form]);

  type BasicInfo = {
    nameDestination: string;
    rating: number;
    maxCapacity: number;
    description: string;
    adultPrice: number;
    childrenPrice: number;
  };

  const onFinish = async (values: BasicInfo) => {
    try {
      const dataBasicInfo = {
        nameDestination: values.nameDestination,
        rating: values.rating,
        maxCapacity: values.maxCapacity,
        description: values.description,
        adultPrice: values.adultPrice,
        childrenPrice: values.childrenPrice,
      };

      console.log("comp:", dataBasicInfo);
      setBasicInfo(dataBasicInfo);
      next();
    } catch (error) {
      console.error("Basic info failed:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
        <div className={`${mediumMontserrat.className} pb-6`}>
          <span className="text-lg font-semibold">Basic Information</span>
        </div>

        {/* Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              rules={[
                { required: true, message: "Please input max capacity!" },
              ]}
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
                parser={(displayValue) =>
                  displayValue!.replace(/\Rp\s?|(,*)/g, "") as unknown as 0
                }
                placeholder="Enter children price"
                className="w-full"
              />
            </Form.Item>
          </div>

          {/* Tambahkan tombol submit yang tersembunyi */}
          <Button type="primary" htmlType="submit" style={{ display: "none" }}>
            Submit
          </Button>
        </Form>
      </div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => form.submit()}
          className="bg-[#4F28D9] text-center w-32 text-white text-sm rounded-xl cursor-pointer"
        >
          Next
        </Button>
      </div>
    </>
  );
}
