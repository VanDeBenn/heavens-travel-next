"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Row, Col, Button, message } from "antd";
import { Montserrat } from "next/font/google";
import { RiCircleLine, RiCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { bookingRepository } from "#/repository/bookings";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface ComponentsProps {
  dataUser: any;
  submit: any;
}

export default function GuestForm({ dataUser, submit }: ComponentsProps) {
  const router = useRouter();
  const [customerForm] = Form.useForm();
  const [guestForm] = Form.useForm();
  const [isBookingForAnotherPerson, setIsBookingForAnotherPerson] =
    useState(false);

  const bookingId = localStorage.getItem("_booking");
  const userId = localStorage.getItem("_id");
  const xendit = localStorage.getItem("_xendit");

  useEffect(() => {
    if (!isBookingForAnotherPerson && dataUser) {
      customerForm.setFieldsValue({
        customerName: dataUser.fullName,
        customerEmail: dataUser.email,
        customerPhoneNumber: dataUser.phoneNumber || "08",
      });
    } else {
      customerForm.resetFields();
    }
  }, [dataUser, customerForm, isBookingForAnotherPerson]);

  useEffect(() => {
    if (submit) {
      if (isBookingForAnotherPerson) {
        guestForm.submit();
      } else {
        customerForm.submit();
      }
      if (!xendit) {
        handleCheckout();
      }
    }
  }, [submit, xendit, isBookingForAnotherPerson, customerForm, guestForm]);

  const handleOptionChange = (isAnotherPerson: boolean) => {
    setIsBookingForAnotherPerson(isAnotherPerson);
  };

  const handleFormSubmit = async (values: any, isGuest: boolean) => {
    try {
      const data = isGuest
        ? {
            guestName: values.guestName,
            guestEmail: values.guestEmail,
            guestPhoneNumber: values.guestPhoneNumber,
            customerName: null,
            customerEmail: null,
            customerPhoneNumber: null,
          }
        : {
            customerName: values.customerName,
            customerEmail: values.customerEmail,
            customerPhoneNumber: values.customerPhoneNumber,
            guestName: null,
            guestEmail: null,
            guestPhoneNumber: null,
          };

      console.log(`${isGuest ? "Guest" : "Customer"} form submitted:`, data);

      await bookingRepository.api.updateBooking(bookingId || "", data);
    } catch (error) {
      console.error(
        `Error submitting ${isGuest ? "guest" : "customer"} form:`,
        error
      );
    }
  };

  const handleCheckout = async () => {
    try {
      const data = {
        bookingId,
        userId,
      };

      const req = await bookingRepository.api.checkout(data);
      localStorage.setItem("_xendit", req.body.redirect);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-xl border-solid border-gray-200 border">
        <div className={`${mediumMontserrat.className} py-6 px-9`}>
          <span className="text-lg font-semibold">Guest Detailed</span>
        </div>
        <div className="h-px bg-gray-300"></div>
        <div className="px-9 py-5">
          <Form
            form={customerForm}
            disabled={isBookingForAnotherPerson}
            name="guest_form"
            layout="vertical"
            onFinish={(values) => handleFormSubmit(values, false)}
            autoComplete="off"
          >
            <Row gutter={24}>
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
                      pattern: /^[0-9]+$/,
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
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-12">
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2 cursor-pointer`}
            onClick={() => handleOptionChange(false)}
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
            onClick={() => handleOptionChange(true)}
          >
            {isBookingForAnotherPerson ? (
              <RiCircleFill className="text-RoyalAmethyst-700 text-lg" />
            ) : (
              <RiCircleLine className="text-lg" />
            )}
            <span className="text-base">I am booking for another person</span>
          </div>
        </div>
        {isBookingForAnotherPerson && (
          <div className="px-9 py-5 bg-white rounded-xl">
            <Form
              form={guestForm}
              name="guest_form"
              layout="vertical"
              onFinish={(values) => handleFormSubmit(values, true)}
              autoComplete="off"
            >
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item
                    label="Full Name"
                    name="guestName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the guest's full name!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter the guest's full name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Email"
                    name="guestEmail"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the guest's email!",
                      },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input placeholder="Enter the guest's email" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Phone Number"
                    name="guestPhoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the guest's phone number!",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Please enter a valid phone number!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter the guest's phone number" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}
