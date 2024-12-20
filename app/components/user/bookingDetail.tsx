"use client";
import React, { useState } from "react";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiCalendarLine,
  RiGlassesLine,
  RiHome3Line,
  RiTeamLine,
} from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { mediumMontserrat } from "./myBooking";
import { Modal } from "antd";
import Image from "next/image";
import { BookingItem, initialBookingItems } from "./myBooking";
import Link from "next/link";
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
  price: string;
  fee: string;
}

interface ComponentProps {
  data: any;
}

export default function BookingDetail({ data }: ComponentProps) {
  if (!data) {
    return;
  }
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
        <span className="text-xl font-semibold">Booking detail</span>
      </div>
      <div className="h-px bg-gray-300"></div>

      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-6`}
      >
        {/* <div className="">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-base">Order Completed</span>
            <div
              className="flex items-center cursor-pointer"
              onClick={handleDropdownToggle}
            >
              <span className="text-lg font-medium text-RoyalAmethyst-700">
                See detail
              </span>
              {isDropdownOpen ? (
                <RiArrowDropUpLine className="text-2xl ml-2 text-RoyalAmethyst-700" />
              ) : (
                <RiArrowDropDownLine className="text-2xl ml-2 text-RoyalAmethyst-700" />
              )}
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isDropdownVisible
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {isDropdownOpen && (
              <div className="mt-7 p-5 border border-solid border-[#DBDBDB] rounded-xl w-full flex flex-col items-center gap-6">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 items-center gap-6 w-full"
                  >
                    <div className="text-left flex items-center gap-2">
                      <span>{step.date}</span>
                      <span className="text-gray-500">{step.time}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          index <= currentStep
                            ? "bg-RoyalAmethyst-700"
                            : "bg-gray-300"
                        }`}
                      />
                      {index < steps.length - 1 && (
                        <div className="w-px h-full bg-gray-300"></div>
                      )}
                    </div>
                    <div
                      className={`text-right ${
                        index <= currentStep ? "text-black" : "text-gray-500"
                      }`}
                    >
                      {step.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> */}

        {/* Bagian untuk menampilkan invoice */}
        <div>
          {/* {invoiceInfo.map((invoice, index) => ( */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500  ">No.Invoice</span>
              <span className="text-base text-RoyalAmethyst-700 font-semibold">
                {/* {invoice.invoiceNumber} */} {data?.payment?.externalId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500  ">Data of Order</span>
              <span className="text-base text-gray-500  ">
                {/* {invoice.orderDate} - {invoice.time} */}{" "}
                {new Date(data?.payment?.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500  ">Ticket Code</span>
              <span
                className="text-base text-RoyalAmethyst-700 font-semibold cursor-pointer"
                // onClick={() => handleOpenQrCode(invoice.qrCodeImage)}
              >
                See QR Code
              </span>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
      {/* Garis pemisah */}
      <div className="h-2 bg-gray-200"></div>
      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-6`}
      >
        <span className="font-semibold text-base">Detailed Guest</span>
        <div className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}>
          {/* {InfoDetailGuest.map((InfoDetail, index) => ( */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Full Name</span>
              <span className="text-base text-black">
                {/* {InfoDetail.fullName} */} {data?.customerName}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Email</span>
              <span className="text-base text-black">
                {/* {InfoDetail.email} */} {data?.customerEmail}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Phone Number</span>
              <span className="text-base text-black">
                {/* {InfoDetail.numberPhone} */} {data?.customerPhoneNumber}
              </span>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
      <div className="h-2 bg-gray-200"></div>

      <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
        <div className={`${mediumMontserrat.className} pt-6 px-9`}>
          <span className="text-lg font-semibold">Order</span>
        </div>

        <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full ">
          {/* {filteredBookingItems.map((item, index) => {
            const totalCost = item.HotelPricePerAdult
              ? Number(item.guests.match(/\d+/)?.[0]) * item.HotelPricePerAdult
              : 0;
            const adultsCount =
              Number(item.guests.match(/(\d+)\s*adult/)?.[1]) || 0;
            const childrenCount =
              Number(item.guests.match(/(\d+)\s*child/)?.[1]) || 0; */}
          {data?.bookingdetails.map((item: any) => {
            const { cart } = item;
            const { destination, roomHotel } = cart;
            return (
              <div
                key={item.id}
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
                  <Link href={`/profile/bookings/detail/${item.id}/review`}>
                    <SlOptionsVertical />
                  </Link>
                </div>

                <div className="flex items-center gap-2 py-3">
                  <Link href={""}>
                    <Image
                      src={
                        "https://imgs.search.brave.com/hoIxdncmtwEaAIJzTZljZdl4LAfd52BAD3Bo_qMxTjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby90/dmxrL2Jsb2cvMjAy/MS8wMi9IdXRhbi1C/YW1idS1QZW5nbGlw/dXJhbi1zaHV0dGVy/c3RvY2tfMTAxMzEz/MTAwNi5qcGc_dHI9/ZHByLTEuNSxoLTQ4/MCxxLTQwLHctMTAy/NA"
                      }
                      alt={roomHotel?.name || destination?.name}
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
                      {roomHotel?.name || destination?.name}
                    </Link>
                    <div className="flex items-center gap-1">
                      <RiCalendarLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        {new Date(cart.startDate).toLocaleDateString()} -{" "}
                        {new Date(cart.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <RiTeamLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        Guests: {cart.quantityAdult} adults,{" "}
                        {cart.quantityChildren} children
                      </span>
                    </div>

                    <div className="flex justify-between w-full">
                      <div className="flex items-center gap-1 w-full">
                        <span className="text-sm font-semibold text-[#4F28D9]">
                          {/* {roomHotel && item.HotelRoomType} */}
                          {destination && destination.name} Tour
                        </span>
                      </div>

                      <div className="flex justify-end w-full gap-1 items-end">
                        {/* {item.HotelPricePerAdult && ( */}
                        <div className="text-sm text-black">
                          {/* {item.guests.match(/\d+/)?.[0]} */}
                          Rp{cart?.quantityAdult * destination?.priceAdult} - Rp
                          {cart?.quantityChildren * destination?.priceChildren}
                          {/* {formatCurrency(item.HotelPricePerAdult)} */}
                        </div>
                        {/* )} */}

                        {/* {item.DestinationPriceAdults && adultsCount > 0 && (
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
                        )} */}
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
                      Rp
                      {cart?.quantityAdult * destination?.priceAdult +
                        cart?.quantityChildren * destination?.priceChildren}
                      {/* {roomHotel &&
                        formatCurrency(
                          (Number(item.guests.match(/\d+/)?.[0]) || 1) *
                            (item.HotelPricePerAdult || 0)
                        )}
                      {destination &&
                        formatCurrency(
                          adultsCount * (item.DestinationPriceAdults || 0) +
                            childrenCount * (item.DestinationPriceChildren || 0)
                        )} */}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-2 bg-gray-200"></div>

      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-6`}
      >
        <span className="font-semibold text-base">Payment Details</span>
        <div className={`px-3 `}>
          {/* {PayDetailGuest.map((pay, index) => ( */}
          <div className="flex flex-col gap-2">
            {data?.bookingdetails?.map((item: any) => {
              const { cart } = item;
              const { destination, roomHotel } = cart;
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <span className="text-base text-gray-500">
                    {/* Mandarin Oriental */}
                    {destination?.name}
                    {/* <span>(2 room)</span> */}
                  </span>
                  <span className="text-base text-black">
                    Rp
                    {cart?.quantityAdult * destination?.priceAdult +
                      cart?.quantityChildren * destination?.priceChildren}
                  </span>
                </div>
              );
            })}
            <div className="flex justify-between items-center">
              <span className="text-base text-gray-500">Booking Fees</span>
              <span className="text-base text-black">Free</span>
            </div>
          </div>
          {/* ))} */}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-base text-black">
            Total Price
          </span>
          <span className="font-semibold text-base text-InfernoEcho-600">
            Rp{data?.payment?.amount}
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
          <Link href={`/profile/heavens-care?books=${data.id}`}>
            <div className="w-max cursor-pointer px-6 py-2 border border-solid rounded-xl border-RoyalAmethyst-700 font-semibold text-sm text-RoyalAmethyst-700">
              Help
            </div>
          </Link>
          <Link href={`/profile/bookings/detail/${data.id}/refund`}>
            <div className="w-max cursor-pointer px-6 py-2 rounded-xl bg-RoyalAmethyst-700 font-semibold text-sm text-white">
              Refund
            </div>
          </Link>
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
    fullName: "Douwer Jhonen", // Nomor Invoice
    email: "ucussayursore@gmail.com", // Tanggal Pemesanan
    numberPhone: "08123456789",
  },
];
export const PayDetailGuest: paymentDetailGuest[] = [
  {
    price: "Rp1.200.000", // Nomor Invoice
    fee: "Rp25.000", // Tanggal Pemesanan
  },
];

// Data untuk informasi nomor invoice, tanggal pemesanan, dan path gambar QR Code
export const invoiceInfo: NoInvoiceInfo[] = [
  {
    invoiceNumber: "INV-HT2024-09X834-YZ7", // Nomor Invoice
    orderDate: "2023-09-10", // Tanggal Pemesanan
    qrCodeImage: "/images/payment/QR-codes.png",
    time: "16:30 WIB", // Path Gambar QR Code
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
