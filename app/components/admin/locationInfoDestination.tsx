"use client";

import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
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

interface LocationInfoProps {
  setLocationDestination: any;
  submitLocationForm: boolean;
  // setLocationInfo: (info: any) => void;
  // next: () => void;
  // data: any;
}

export default function LocationInfoDestination({
  setLocationDestination,
  submitLocationForm,
}: // next,
// data,
LocationInfoProps) {
  const [form] = useForm();

  // useEffect(() => {
  //   if (data) {
  //     form.setFieldsValue({
  //       address: data.address,
  //       pathLocation: data.pathLocation,
  //       district: data.district,
  //       city: data.city,
  //       province: data.province,
  //       country: data.country,
  //     });
  //   }
  // }, [data, form]);

  type LocationInfo = {
    address: string;
    pathLocation: string;
    district: string;
    city: string;
    province: string;
    country: string;
  };

  const onFinish = async (values: LocationInfo) => {
    try {
      const dataLocationInfo = {
        address: values.address,
        pathLocation: values.pathLocation,
        district: values.district,
        city: values.city,
        province: values.province,
        country: values.country,
      };

      // console.log("comp:", dataLocationInfo);
      setLocationDestination(dataLocationInfo);
      // next();
    } catch (error) {
      console.error("Location info failed:", error);
    }
  };

  useEffect(() => {
    if (submitLocationForm) {
      form.submit();
    }
  }, [submitLocationForm]);

  return (
    <>
      <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
        <div className={`${mediumMontserrat.className} pb-6`}>
          <span className="text-lg font-semibold">Location Information</span>
        </div>

        {/* Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Address */}
          <Form.Item
            label="Address"
            name="address"
            className="w-full"
            rules={[{ required: true, message: "Please input address!" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          {/* Path Location */}
          <Form.Item
            label="Path Location"
            name="pathLocation"
            className="w-full"
            rules={[{ required: true, message: "Please input path location!" }]}
          >
            <Input.TextArea rows={7} placeholder="Enter path location" />
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

          {/* Hidden submit button */}
          <Button type="primary" htmlType="submit" style={{ display: "none" }}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
