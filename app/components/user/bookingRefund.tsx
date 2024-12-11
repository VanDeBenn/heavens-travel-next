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
// Step item type
interface StepItem {
  date: string;
  time: string;
  description: string;
}

// Interface untuk informasi nomor invoice, tanggal pemesanan, dan path gambar QR Code
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

export default function BookingRefund() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State untuk modal QR code
  const [qrImage, setQrImage] = useState<string>(""); // State untuk gambar QR code
  const currentStep = 2; // Contoh langkah saat ini

  const handleDropdownToggle = () => {
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
      setTimeout(() => setIsDropdownVisible(true), 100); // Delay sedikit untuk trigger animasi
    } else {
      setIsDropdownVisible(false);
      setTimeout(() => setIsDropdownOpen(false), 300); // Waktu harus sesuai dengan durasi animasi
    }
  };

  // Fungsi untuk membuka modal QR code
  const handleOpenQrCode = (imagePath: string) => {
    setQrImage(imagePath);
    setIsModalVisible(true);
  };

  // Fungsi untuk menutup modal QR code
  const handleCloseQrCode = () => {
    setIsModalVisible(false);
  };

  const [bookingItems, setBookingItems] = useState(initialBookingItems);

  // Filter hotel dan destinasi untuk menampilkan hanya 1 hotel dan 1 destinasi
  const filteredBookingItems = [
    ...bookingItems.filter((item) => item.category === "Hotel").slice(0, 1),
    ...bookingItems
      .filter((item) => item.category === "Destination")
      .slice(0, 1),
  ];

  const handleDelete = (indexToDelete: number) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you want to remove this item from your cart?",
      okText: "Remove",
      cancelText: "Cancel",
      onOk: () => {
        const updatedItems = filteredBookingItems.filter(
          (_, index) => index !== indexToDelete
        );
        setBookingItems(updatedItems);
      },
    });
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
                {invoice.invoiceNumber}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500  ">Data of Order</span>
              <span className="text-base text-gray-500  ">
                {invoice.orderDate} - {invoice.time}
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
          {filteredBookingItems.map((item, index) => {
            const totalCost = item.HotelPricePerAdult
              ? Number(item.guests.match(/\d+/)?.[0]) * item.HotelPricePerAdult
              : 0;
            const adultsCount =
              Number(item.guests.match(/(\d+)\s*adult/)?.[1]) || 0;
            const childrenCount =
              Number(item.guests.match(/(\d+)\s*child/)?.[1]) || 0;

            return (
              <div
                key={index}
                className="p-3 border border-solid border-[#DBDBDB] rounded-xl w-full"
              >
                <div className="flex justify-between items-center">
                  <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                    {item.category === "Hotel" ? (
                      <RiHome3Line size={18} color="#ffff" />
                    ) : (
                      <RiGlassesLine size={18} color="#ffff" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-3">
                  <Link href={item.link}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-xl w-44"
                    />
                  </Link>
                  <div
                    className={`${mediumMontserrat.className} flex flex-col gap-1 w-full`}
                  >
                    <Link
                      href={item.link}
                      className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-1">
                      <RiCalendarLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        {item.category === "Hotel"
                          ? item.HotelSchedule
                          : item.DestinationSchedule}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <RiTeamLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        Guests: {item.guests}
                      </span>
                    </div>

                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-1 w-full">
                        <span className="text-sm font-semibold text-[#4F28D9]">
                          {item.category === "Hotel" && item.HotelRoomType}
                          {item.category === "Destination" &&
                            item.DestinationType}
                        </span>
                      </div>

                      <div className="flex justify-end w-full gap-1 items-end">
                        {item.HotelPricePerAdult && (
                          <div className="text-sm text-black">
                            {item.guests.match(/\d+/)?.[0]} x
                            {formatCurrency(item.HotelPricePerAdult)}
                          </div>
                        )}

                        {item.DestinationPriceAdults && adultsCount > 0 && (
                          <div className="text-sm text-black">
                            {adultsCount} x
                            {formatCurrency(item.DestinationPriceAdults)}
                            {childrenCount > 0 &&
                              item.DestinationPriceChildren && (
                                <>
                                  {" - "}
                                  {childrenCount} x
                                  {formatCurrency(
                                    item.DestinationPriceChildren
                                  )}
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
                      {item.category === "Hotel" &&
                        formatCurrency(
                          (Number(item.guests.match(/\d+/)?.[0]) || 1) *
                            (item.HotelPricePerAdult || 0)
                        )}
                      {item.category === "Destination" &&
                        formatCurrency(
                          adultsCount * (item.DestinationPriceAdults || 0) +
                            childrenCount * (item.DestinationPriceChildren || 0)
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
          {InfoDetailGuest.map((InfoDetail, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-500">Full Name</span>
                <span className="text-base text-black">
                  {InfoDetail.fullName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-500">Email</span>
                <span className="text-base text-black">{InfoDetail.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-500">Phone Number</span>
                <span className="text-base text-black">
                  {InfoDetail.numberPhone}
                </span>
              </div>
            </div>
          ))}
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
          <Form layout="vertical" autoComplete="off">
            <Row gutter={24}>
              {/* Name of Bank */}
              <Col span={8}>
                <Form.Item
                  label="Name of Bank"
                  name="NameOfBank"
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

              {/* Bank Acccount Number */}
              <Col span={8}>
                <Form.Item
                  label="Bank Acccount Number"
                  name="BankAcccountNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Bank Acccount Number!",
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: "Please enter a valid Bank Acccount Number!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Bank Number" />
                </Form.Item>
              </Col>

              {/* Account Holder */}
              <Col span={8}>
                <Form.Item
                  label="Account Holder"
                  name="AccountHolder"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Account Holder!",
                    },
                    {
                      message: "Please enter a valid Account Holder!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your Account Holder" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Form layout="vertical" autoComplete="off">
            <Row gutter={24}>
              {/* Refund Reason */}
              <Col span={24} className="w-full">
                <Form.Item
                  label="Refund Reason"
                  name="RefundReason"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Refund Reason!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter your Reason"
                    rows={3}
                    className="w-full"
                  />
                </Form.Item>
              </Col>
            </Row>
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
          {PayDetailGuest.map((pay, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-500">
                  Mandarin Oriental (2 room)
                </span>
                <span className="text-base text-black">{pay.priceHotel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-gray-500">Ubud Palace</span>

                <span className="text-base text-black">{pay.priceDesti}</span>
              </div>
              <span className="text-base text-gray-500">
                Amounts are subject to change according to refund policies and
                other additional fees.
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-base text-black">
            Total Refund
          </span>
          <span className="font-semibold text-base text-InfernoEcho-600">
            Rp2.000.000
          </span>
        </div>
      </div>
      <div className="h-2 bg-gray-200"></div>
      <div
        className={`${mediumMontserrat.className} py-8 px-9 flex justify-between items-center`}
      >
        <div className="w-max cursor-pointer px-6 py-2 border border-solid rounded-xl border-RoyalAmethyst-700 font-semibold text-sm text-RoyalAmethyst-700">
          Return
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-max cursor-pointer px-6 py-2 border border-solid rounded-xl border-RoyalAmethyst-700 font-semibold text-sm text-RoyalAmethyst-700">
            Help
          </div>
          <div className="w-max cursor-pointer px-6 py-2 rounded-xl bg-RoyalAmethyst-700 font-semibold text-sm text-white">
            Refund
          </div>
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

// interface detailGuest {
//   fullName: string;
//   email: string;
//   numberPhone: number;
// }

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

// Data untuk informasi nomor invoice, tanggal pemesanan, dan path gambar QR Code
export const invoiceInfo: NoInvoiceInfo[] = [
  {
    invoiceNumber: "INV-HT2024-09X834-YZ7",
    orderDate: "2023-09-10",
    qrCodeImage: "/images/payment/QR-codes.png",
    time: "16:30 WIB",
  },
];

// Dummy data untuk langkah-langkah (step) dengan waktu
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
