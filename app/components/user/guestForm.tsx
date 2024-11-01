"use client";
import React, { useEffect, useState } from "react"; // Import useState
import { Form, Input, Row, Col, Button } from "antd";
import { Montserrat } from "next/font/google";
import { RiCircleLine, RiCircleFill } from "react-icons/ri";
import { usersRepository } from "#/repository/users";
import { bookingRepository } from "#/repository/bookings";
import { useRouter } from "next/navigation";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface ComponentsProps {
  dataUser: any;
  next: () => void;
  submit: boolean;
  setSubmit: any;
}

export default function GuestForm({
  dataUser,
  next,
  submit,
  setSubmit,
}: ComponentsProps) {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isBookingForAnotherPerson, setIsBookingForAnotherPerson] =
    useState(false); // State to track selected option
  const bookingId = localStorage.getItem("_booking");
  const userId = localStorage.getItem("_id");

  useEffect(() => {
    if (dataUser) {
      form.setFieldsValue({
        customerName: dataUser?.fullName,
        customerEmail: dataUser?.email,
        customerPhoneNumber: dataUser?.phoneNumber || "08",
      });
    }
    if (submit) {
      form.submit();
      onFinish;
      setSubmit(false);
      handleCheckout();
    }
  }, [dataUser, form, submit]);

  const onFinish = async (values: any) => {
    try {
      const data = {
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhoneNumber: values.customerPhoneNumber,
        guestName: values.guestName,
        guestEmail: values.guestEmail,
        guestPhoneNumber: values.guestPhoneNumber,
      };

      const req = await bookingRepository.api.updateBooking(
        bookingId || "",
        data
      );
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  const handleCheckout = async () => {
    try {
      const data = {
        bookingId: bookingId,
        userId: userId,
      };
      const req = await bookingRepository.api.checkout(data);
      // console.log(req);
      localStorage.setItem("_xendit", req.body.redirect);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`bg-white rounded-xl border-solid border-gray-200 border`}
      >
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
                  name="customerName"
                  rules={[
                    { required: true, message: "Please enter your full name!" },
                  ]}
                >
                  <Input placeholder="Enter your full name" />
                </Form.Item>
              </Col>

              {/* Email */}
              <Col span={8}>
                <Form.Item
                  label="Email"
                  name="customerEmail"
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
                  name="customerPhoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number!",
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "Please enter a valid phone number!",
                    },
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
              <RiCircleFill className="text-RoyalAmethyst-700 text-lg" />
            )}
            <span className="text-base">I am the guest</span>
          </div>
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2 cursor-pointer`}
            onClick={() => setIsBookingForAnotherPerson(true)} // Set state for "I am booking for another person"
          >
            {isBookingForAnotherPerson ? (
              <RiCircleFill className="text-RoyalAmethyst-700 text-lg" />
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
                    name="guestName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your full name" />
                  </Form.Item>
                </Col>

                {/* Email */}
                <Col span={8}>
                  <Form.Item
                    label="Email"
                    name="guestEmail"
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
                    name="guestPhoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number!",
                      },
                      {
                        pattern: new RegExp(/^[0-9]+$/),
                        message: "Please enter a valid phone number!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="flex justify-end">
                <Button
                  onClick={next}
                  type="primary"
                  htmlType="submit"
                  style={{ display: "none" }}
                  className="w-max mt-6"
                >
                  submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {/* end form */}
      </div>
    </div>
  );
}
