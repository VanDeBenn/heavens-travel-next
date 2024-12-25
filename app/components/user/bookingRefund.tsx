"use client";
import React, { useState } from "react";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiBookmarkFill,
  RiBookmarkLine,
  RiCalendarLine,
  RiGlassesLine,
  RiHome3Line,
  RiTeamLine,
} from "react-icons/ri";
import { Form, Input, Row, Col, Button } from "antd";

import { Montserrat } from "next/font/google";

export const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});

export const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
export const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

import { Modal } from "antd";
import Image from "next/image";
import { BookingItem, initialBookingItems } from "./myBooking";
import Link from "next/link";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { RefundRepository } from "#/repository/refund";
import { useForm } from "antd/es/form/Form";

interface StepItem {
  date: string;
  time: string;
  description: string;
}

interface NoInvoiceInfo {
  invoiceNumber: string;
  orderDate: string;
  qrCodeImage: string;
  time: string;
}
interface detailGuest {
  fullName: string;
  email: string;
  numberPhone: string;
}
interface paymentDetailGuest {
  priceHotel: string;
  priceDesti: string;
}

interface ComponentProps {
  data: any;
  bookingId: any;
}

export default function BookingRefund({ data, bookingId }: ComponentProps) {
  if (!data) {
    return;
  }
  console.log("data: ", data);
  const [form] = useForm();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qrImage, setQrImage] = useState<string>("");
  const currentStep = 2;

  const handleDropdownToggle = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setTimeout(() => setIsDropdownVisible(true), 100);
    } else {
      setIsDropdownVisible(false);
      setTimeout(() => setIsDropdownOpen(false), 300);
    }
  };

  const handleOpenQrCode = (imagePath: string) => {
    setQrImage(imagePath);
    setIsModalVisible(true);
  };

  const handleCloseQrCode = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values: any) => {
    try {
      const data = {
        nameofBank: values?.nameofBank,
        bankAccountNumber: values?.bankAccountNumber,
        accountHolder: values?.accountHolder,
        refundReason: values?.refundReason,
        bookingId: bookingId,
      };
      const req = await RefundRepository.api.create(data);
      console.log(req);
    } catch (error) {
      console.error("Refund failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="py-6 px-9">
        <span className="text-xl font-semibold">Booking refund</span>
      </div>
      <div className="h-px bg-gray-300"></div>
      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-2`}
      >
        {/* Bagian untuk menampilkan invoice */}
        <span className="font-semibold text-base">Refund Policy</span>
        {invoiceInfo.map((invoice, index) => (
          <div key={index} className="  flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500  ">No.Invoice</span>
              <span className="text-base text-RoyalAmethyst-700 font-semibold">
                {data?.payment?.externalId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500  ">Data of Order</span>
              <span className="text-base text-gray-500  ">
                {new Date(data?.payment?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200"></div>
      <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
        <div className={`${mediumMontserrat.className} pt-6 px-9`}>
          <span className="text-lg font-semibold">Order</span>
        </div>

        <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full ">
          {data?.bookingdetails.map((item: any) => {
            const { cart } = item;
            const { destination, roomHotel } = cart;

            return (
              <div
                key={item?.id}
                className="p-3 border border-solid border-[#DBDBDB] rounded-xl w-full"
              >
                <div className="flex justify-between items-center">
                  <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                    {roomHotel ? (
                      <RiHome3Line size={18} color="#ffff" />
                    ) : (
                      <RiGlassesLine size={18} color="#ffff" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {roomHotel ? "Hotel" : "Destination"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-3">
                  <Link href={""}>
                    <Image
                      src={
                        destination?.photodestinations[0]?.pathPhoto
                          ? `http://localhost:3222/photo-destinations/${destination.photodestinations[0].pathPhoto}`
                          : roomHotel?.photoroomhotels[0]?.pathPhoto
                          ? `http://localhost:3222/photo-room-hotels/${roomHotel.photoroomhotels[0].pathPhoto}`
                          : item[0]?.cart?.destination?.photodestinations[0]
                              ?.pathPhoto
                          ? `http://localhost:3222/photo-destinations/${item[0].cart.destination.photodestinations[0].pathPhoto}`
                          : item[0]?.cart?.roomHotel?.photoroomhotels[0]
                              ?.pathPhoto
                          ? `http://localhost:3222/photo-room-hotels/${item[0].cart.roomHotel.photoroomhotels[0].pathPhoto}`
                          : ""
                      }
                      alt={destination?.name || roomHotel?.roomType}
                      width={100}
                      height={100}
                      className="rounded-xl w-44"
                    />
                  </Link>
                  <div
                    className={`${mediumMontserrat.className} flex flex-col gap-1 w-full`}
                  >
                    <Link
                      href={""}
                      className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                    >
                      {destination?.name || roomHotel?.hotel?.name}
                    </Link>
                    <div className="flex items-center gap-1">
                      <RiCalendarLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        {new Date(cart?.startDate).toLocaleDateString()} -
                        {new Date(cart?.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <RiTeamLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        {destination
                          ? `Guests: ${cart?.quantityAdult} Adult - ${cart?.quantityChildren} Children`
                          : `Rooms: ${cart?.quantityRoom} `}
                      </span>
                    </div>

                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-1 w-full">
                        <span className="text-sm font-semibold text-[#4F28D9]">
                          {roomHotel
                            ? `${roomHotel?.roomType} Room`
                            : `${destination?.name} Tour`}
                        </span>
                      </div>

                      <div className="flex justify-end w-full gap-1 items-end">
                        {roomHotel?.price && (
                          <div className="text-sm text-black">
                            {/* {item.guests.match(/\d+/)?.[0]} */}
                            {cart?.quantityRoom} x{" "}
                            {formatCurrency(roomHotel?.price)}
                          </div>
                        )}

                        {destination?.priceAdult && cart?.quantityAdult > 0 && (
                          <div className="text-sm text-black">
                            {cart?.quantityAdult} x{" "}
                            {formatCurrency(destination?.priceAdult)}
                            {cart?.quantityChildren > 0 &&
                              destination?.priceChildren && (
                                <>
                                  {" - "}
                                  {cart?.quantityChildren} x{" "}
                                  {formatCurrency(destination?.priceChildren)}
                                </>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-300"></div>
                <div className="pt-5 pb-3 flex justify-end w-full gap-2">
                  <div
                    className={`${mediumMontserrat.className} flex flex-col gap-1`}
                  >
                    <span className="font-semibold text-xs">Total Price</span>
                    <span className="text-sm font-semibold text-InfernoEcho-600">
                      {roomHotel &&
                        formatCurrency(cart?.quantityRoom * roomHotel?.price)}
                      {destination &&
                        formatCurrency(
                          cart?.quantityAdult * (destination?.priceAdult || 0) +
                            cart?.quantityChildren *
                              (destination?.priceChildren || 0)
                        )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Garis pemisah */}
      <div className="h-2 bg-gray-200"></div>
      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-3`}
      >
        <span className="font-semibold text-base">Detailed Guest</span>
        <div className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}>
          {/* {InfoDetailGuest.map((InfoDetail, index) => ( */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Full Name</span>
              <span className="text-base text-black">{data?.customerName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Email</span>
              <span className="text-base text-black">
                {data?.customerEmail}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Phone Number</span>
              <span className="text-base text-black">
                {data?.customerPhoneNumber}
              </span>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
      <div className="h-2 bg-gray-200"></div>{" "}
      {/* Bank Detail to Refund
       */}
      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-3`}
      >
        <span className="text-base font-semibold">Bank Detail to Refund</span>
        <span className="text-sm text-gray-500">
          please use full bank name and full name of bank account holder
        </span>

        <div className="flex flex-col ">
          <Form
            form={form}
            name="refund"
            layout="vertical"
            onFinish={handleFinish}
            autoComplete="off"
          >
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="Name of Bank"
                  name="nameofBank"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Name of Bank!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Name Bank" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Bank Account Number"
                  name="bankAccountNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Bank Account Number!",
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "Please enter a valid Bank Account Number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Bank Number" />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Account Holder"
                  name="accountHolder"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Account Holder!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Account Holder" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item
                  label="Refund Reason"
                  name="refundReason"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Refund Reason!",
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Enter your Reason" rows={3} />
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              style={{ display: "none" }}
            >
              Submit
            </Button>
          </Form>
        </div>
        {/* end form */}
      </div>
      {/* Bank Detail to Refund
       */}
      <div className="h-2 bg-gray-200"></div>
      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-3`}
      >
        <span className="text-base font-semibold">Heavens Travel Policy</span>
        <span className="text-sm">
          1. Cancellation may incur additional charges, depending on each
          hotel&apos;s policy and your refund method.
        </span>
        <span className="text-sm">
          2. The refund process for hotel bookings takes up to 5 days from the
          time we receive your complete refund request, and is subject to
          Heavens Travel&apos;s approval under the applicable refund conditions.
        </span>
        <span className="text-sm">
          3. Heavens Travel does not accept partial refunds; refunds for hotel
          bookings will be applied to the entire stay and all rooms listed on a
          single Order Number.
        </span>

        <div className="h-px bg-gray-300"></div>

        <div className="flex items-center gap-2">
          <div className={` `} onClick={() => setIsBookmarked(!isBookmarked)}>
            {isBookmarked ? (
              <MdCheckBox className="text-RoyalAmethyst-700 text-lg cursor-pointer    " />
            ) : (
              <MdCheckBoxOutlineBlank className="text-black text-lg cursor-pointer    " />
            )}
          </div>

          <span className="text-black text-sm font-semibold">
            I agree with the Refund Policy Heavens Travel
          </span>
        </div>
      </div>
      <div className="h-2 bg-gray-200"></div>
      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-3`}
      >
        <span className="font-semibold text-base">Refund Detail</span>
        <div className={`p-3 `}>
          {data?.bookingdetails.map((item: any) => {
            const { cart } = item;
            const { destination, roomHotel } = cart;
            return (
              <div key={item.id} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-base text-gray-500">
                    {destination?.name || roomHotel?.hotel?.name} (
                    {destination
                      ? `${cart?.quantityAdult} Adult, ${cart?.quantityChildren} Children`
                      : `${cart?.quantityRoom} room`}
                    )
                  </span>
                  <span className="text-base text-black">
                    {formatCurrency(
                      cart?.quantityAdult * destination?.priceAdult +
                        cart?.quantityChildren * destination?.priceChildren ||
                        cart?.quantityRoom * roomHotel?.price
                    )}
                  </span>
                </div>
              </div>
            );
          })}
          <span className="text-base text-gray-500">
            Amounts are subject to change according to refund policies and other
            additional fees.
          </span>
        </div>

        {/* Perhitungan Total Refund dan Fee */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-base text-black">Fee</span>
          <span className="text-base text-gray-500">
            {formatCurrency(
              data?.bookingdetails.reduce((acc: number, item: any) => {
                const { cart } = item;
                const totalItemPrice =
                  cart?.quantityAdult * (cart?.destination?.priceAdult || 0) +
                  cart?.quantityChildren *
                    (cart?.destination?.priceChildren || 0) +
                  cart?.quantityRoom * (cart?.roomHotel?.price || 0);
                const fee = totalItemPrice * 0.05;
                return acc + fee;
              }, 0)
            )}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-base text-black">
            Total Refund
          </span>
          <span className="font-semibold text-base text-InfernoEcho-600">
            {formatCurrency(
              data?.bookingdetails.reduce((acc: number, item: any) => {
                const { cart } = item;
                const totalItemPrice =
                  cart?.quantityAdult * (cart?.destination?.priceAdult || 0) +
                  cart?.quantityChildren *
                    (cart?.destination?.priceChildren || 0) +
                  cart?.quantityRoom * (cart?.roomHotel?.price || 0);
                const fee = totalItemPrice * 0.05;
                return acc + totalItemPrice - fee;
              }, 0)
            )}
          </span>
        </div>
      </div>
      <div className="h-2 bg-gray-200"></div>
      <div
        className={`${mediumMontserrat.className} py-8 px-9 flex justify-between items-center`}
      >
        <Link
          href={`/profile/bookings/detail/${bookingId}`}
          className="w-max cursor-pointer px-6 py-2 border border-solid rounded-xl border-RoyalAmethyst-700 font-semibold text-sm text-RoyalAmethyst-700"
        >
          Return
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href={`/profile/heavens-care?books=${bookingId}`}
            className="w-max cursor-pointer px-6 py-2 border border-solid rounded-xl border-RoyalAmethyst-700 font-semibold text-sm text-RoyalAmethyst-700"
          >
            Help
          </Link>
          <button
            onClick={form.submit}
            className="w-max cursor-pointer px-6 py-2 rounded-xl bg-RoyalAmethyst-700 font-semibold text-sm text-white"
          >
            Refund
          </button>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseQrCode}
        footer={null}
        centered
        className="p-4 h-[400px]"
      >
        <div className="flex justify-center items-center">
          <Image
            src={qrImage}
            alt="QR Code"
            width={200}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      </Modal>
    </div>
  );
}

export const InfoDetailGuest: detailGuest[] = [
  {
    fullName: "Douwer Jhonen",
    email: "ucussayursore@gmail.com",
    numberPhone: "08123456789",
  },
];
export const PayDetailGuest: paymentDetailGuest[] = [
  {
    priceHotel: "Rp1.200.000",
    priceDesti: "Rp455.000",
  },
];

export const invoiceInfo: NoInvoiceInfo[] = [
  {
    invoiceNumber: "INV-HT2024-09X834-YZ7",
    orderDate: "2023-09-10",
    qrCodeImage: "/images/payment/QR-codes.png",
    time: "16:30 WIB",
  },
];

export const steps: StepItem[] = [
  {
    date: "2023-09-10",
    time: "14:34 WIB",
    description: "Order completed",
  },
  {
    date: "2023-09-11",
    time: "10:21 WIB",
    description: "Voucher issued",
  },
  {
    date: "2023-09-12",
    time: "09:15 WIB",
    description: "Payment confirmed",
  },
  {
    date: "2023-09-13",
    time: "13:45 WIB",
    description: "Waiting for payment",
  },
  {
    date: "2023-09-14",
    time: "16:30 WIB",
    description: "Booking order created",
  },
];

const formatCurrency = (amount: number) =>
  `Rp${amount.toLocaleString("id-ID").replace(",", ".")}`;
