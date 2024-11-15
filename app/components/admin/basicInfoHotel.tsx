"use client";

import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useForm } from "antd/es/form/Form";
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

interface BasicInfoProps {
  setBasicInfoDestination: any;
  submitBasicInfoForm: any;
  // next: () => void;
  // data: any;
}

export default function BasicInfoHotel({
  setBasicInfoDestination,
  submitBasicInfoForm, // Tambahkan prop ini
}: BasicInfoProps) {
  const [form] = useForm();

  const onFinish = async (values: any) => {
    try {
      const dataBasicInfo = {
        name: values.name,
        roomType: values.roomType,
        rating: values.rating,
        description: values.description,
        // adultPrice: values.adultPrice,
        // childrenPrice: values.childrenPrice,
      };

      setBasicInfoDestination(dataBasicInfo);
    } catch (error) {
      console.error("Basic info failed:", error);
    }
  };

  useEffect(() => {
    if (submitBasicInfoForm) {
      form.submit();
    }
  }, [submitBasicInfoForm]);

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
              label="Name Hotel"
              name="name"
              className="w-full"
              rules={[
                { required: true, message: "Please input destination name!" },
              ]}
            >
              <Input placeholder="Enter destination name" />
            </Form.Item>

            <Form.Item
              label="Room Type"
              name="roomType"
              className="w-full"
              rules={[{ required: true, message: "Please input room type!" }]}
            >
              <Input
                min={1}
                max={5}
                placeholder="Enter room type"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              className="w-full"
              rules={[{ required: true, message: "Please input rating!" }]}
            >
              <InputNumber
                min={1}
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

          {/* <div className="flex justify-between gap-4">
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
          </div> */}

          {/* Tambahkan tombol submit yang tersembunyi */}
          <Button type="primary" htmlType="submit" style={{ display: "none" }}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
