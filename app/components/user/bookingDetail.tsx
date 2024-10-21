"use client";
import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { mediumMontserrat } from "./myBooking";
import { Modal } from "antd";
import Image from "next/image";

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

export default function BookingDetail() {
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

  return (
    <div className="bg-white rounded-xl">
      <div className="py-6 px-9">
        <span className="text-xl font-semibold">Booking detail</span>
      </div>
      <div className="h-px bg-gray-300"></div>

      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-6`}
      >
        <div className="">
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

          {/* Step-by-step tracking with dates and descriptions */}
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
                          index <= currentStep ? "bg-RoyalAmethyst-700" : "bg-gray-300"
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
        </div>

        {/* Bagian untuk menampilkan invoice */}
        <div>
          {invoiceInfo.map((invoice, index) => (
            <div key={index} className="mt-6 flex flex-col gap-2">
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

              <div className="flex justify-between items-center">
                <span className="text-base text-gray-500  ">Ticket Code</span>
                <span
                  className="text-base text-RoyalAmethyst-700 font-semibold cursor-pointer"
                  onClick={() => handleOpenQrCode(invoice.qrCodeImage)}
                >
                  See QR Code
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Garis pemisah */}
      <div className="h-2 bg-gray-200"></div>
      <div
        className={`${mediumMontserrat.className} py-6 px-9 flex flex-col gap-6`}
      >
        <span className="font-semibold text-base">
          Simple Information Guest
        </span>
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
      <div className="h-2 bg-gray-200"></div>

          

      {/* Modal untuk menampilkan QR code */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseQrCode}
        footer={null}
        centered
        className="p-4"
      >
        <Image
          src={qrImage}
          alt="QR Code"
          width={200}
          height={200}
          className="rounded-lg object-cover w-64 h-64"
        />
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
