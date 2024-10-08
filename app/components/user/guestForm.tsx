"use client";
import React, { useState } from "react"; // Import useState
import { Form, Input, Row, Col } from "antd";
import { Montserrat } from "next/font/google";
import { RiCircleLine, RiCircleFill } from "react-icons/ri";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function GuestForm() {
  const [form] = Form.useForm();
  const [isBookingForAnotherPerson, setIsBookingForAnotherPerson] = useState(false); // State to track selected option

  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className={`bg-white rounded-xl border-solid border-gray-200 border`}>
        <div className={`${mediumMontserrat.className} py-6 px-9`}>
          <span className="text-lg font-semibold">Guest Detailed</span>
        </div>
        <div className="h-px bg-gray-300"></div>
        {/* form */}
        <div className="px-9 py-5">
          <Form
            form={form}
            name="guest_form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Row gutter={24}>
              {/* Full Name */}
              <Col span={8}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: "Please enter your full name!" }]}
                >
                  <Input placeholder="Enter your full name" />
                </Form.Item>
              </Col>

              {/* Email */}
              <Col span={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </Col>

              {/* Phone Number */}
              <Col span={8}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: "Please enter your phone number!" },
                    { pattern: new RegExp(/^[0-9]+$/), message: "Please enter a valid phone number!" },
                  ]}
                >
                  <Input placeholder="Enter your phone number" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        {/* end form */}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-12">
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2 cursor-pointer`}
            onClick={() => setIsBookingForAnotherPerson(false)} // Set state for "I am the guest"
          >
            {isBookingForAnotherPerson ? (
              <RiCircleLine className="text-lg" />
            ) : (
              <RiCircleFill className="text-[#4F28D9] text-lg" />
            )}
            <span className="text-base">I am the guest</span>
          </div>
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2 cursor-pointer`}
            onClick={() => setIsBookingForAnotherPerson(true)} // Set state for "I am booking for another person"
          >
            {isBookingForAnotherPerson ? (
              <RiCircleFill className="text-[#4F28D9] text-lg" />
            ) : (
              <RiCircleLine className="text-lg" />
            )}
            <span className="text-base">I am booking for another person</span>
          </div>
        </div>

        {/* Conditional Form for Booking for Another Person */}
        {isBookingForAnotherPerson && (
          <div className="px-9 py-5 bg-white rounded-xl">
            <Form
              form={form}
              name="guest_form_another_person"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row gutter={24}>
                {/* Full Name */}
                <Col span={8}>
                  <Form.Item
                    label="Full Name"
                    name="fullNameAnother"
                    rules={[{ required: true, message: "Please enter your full name!" }]}
                  >
                    <Input placeholder="Enter your full name" />
                  </Form.Item>
                </Col>

                {/* Email */}
                <Col span={8}>
                  <Form.Item
                    label="Email"
                    name="emailAnother"
                    rules={[
                      { required: true, message: "Please enter your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>

                {/* Phone Number */}
                <Col span={8}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumberAnother"
                    rules={[
                      { required: true, message: "Please enter your phone number!" },
                      { pattern: new RegExp(/^[0-9]+$/), message: "Please enter a valid phone number!" },
                    ]}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
        {/* end form */}
      </div>
    </div>
  );
}
