"use client";
import React, { useState } from "react";
import {
  RiCalendarLine,
  RiTeamLine,
  RiHome3Line,
  RiMore2Fill,
  RiGlassesLine,
} from "react-icons/ri";
import { Modal, Button, Dropdown, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";

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

// Interface for BookingItem
interface BookingItem {
  category: "Hotel" | "Destination";
  name: string;
  schedule: string;
  description: string;
  image: string;
  rating: number;
  link: string;
  guests: string;
  HotelRoomType?: string;
  HotelPricePerAdult?: number;
  DestinationPriceAdults?: number;
  DestinationPriceChildren?: number;
  status?: "Done" | "waiting for payment"; // Tambahkan properti status brokk
}

// Data array booking ama destination
const initialBookingItems: BookingItem[] = [
  {
    category: "Hotel",
    name: "Atlasong Hotel",
    schedule: "12 Oct 2024 - 15 Oct 2024",
    description:
      "Luxury stay with stunning ocean views, offering top-notch service and unforgettable.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
    guests: "2 adults, 3 children",
    HotelRoomType: "Deluxe Double Room F",
    HotelPricePerAdult: 500999,
    status: "waiting for payment", // Contoh status
  },
  {
    category: "Destination",
    name: "Ubud Palace",
    schedule: "20 Oct 2024",
    description:
      "Explore Ubud Palace, a historical and cultural landmark showcasing Bali’s traditional architecture and rich heritage.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 4,
    link: "/",
    guests: "1 adult, 2 children",
    DestinationPriceAdults: 200000,
    DestinationPriceChildren: 100000,
    status: "Done",
  },
  {
    category: "Hotel",
    name: "Mandarin Oriental",
    schedule: "5 Nov 2024 - 8 Nov 2024",
    description:
      "Modern luxury and comfort with excellent service at Mandarin Oriental Jakarta.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 3,
    link: "/",
    guests: "2 adults",
    HotelRoomType: "Deluxe King Room",
    HotelPricePerAdult: 600999,
    status: "Done",
  },
  {
    category: "Hotel",
    name: "Sansoeong Hotel",
    schedule: "12 Oct 2024 - 15 Oct 2024",
    description:
      "Luxury stay with stunning ocean views, offering top-notch service and unforgettable.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
    guests: "3 adults",
    HotelRoomType: "Deluxe Double Room F",
    HotelPricePerAdult: 500999,
    status: "waiting for payment", // Contoh status
  },
];

export default function MyBooking() {
  const [bookingItems, setBookingItems] =
    useState<BookingItem[]>(initialBookingItems);

  const formatCurrency = (amount: number) => `Rp${amount.toLocaleString()}`;

  // Dropdown menu cuk
  const menu = (
    <Menu
      items={[
        {
          key: "help",
          label: (
            <Link
              href="/help"
              className="no-underline hover:text-[#4F28D9] duration-300 transition-all"
            >
              Help
            </Link>
          ),
        },
      ]}
    />
  );

  return (
    <div className={` bg-white rounded-xl font-sans`}>
      {/* title */}
      <p className="text-xl font-semibold my-6 mx-9">My Booking</p>
      <div className="h-px bg-gray-300"></div>

      {/* grid */}
      <div className="px-8 py-6 grid grid-cols-1 gap-6">
        {bookingItems.map((item, index) => {
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
              className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}
            >
              <div className="flex justify-between items-center">
                {/* title and icon */}
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
                <div
                  className={`${mediumMontserrat.className} flex items-center`}
                >
                  <div
                    className={`border-2 border-solid border-[#DBDBDB] ${
                      item.status === "waiting for payment"
                        ? "bg-[#FFD600] border-[#FFD600]"
                        : "bg-[#cbbef4] border-[#DBDBDB]"
                    } rounded-xl py-1 px-5 w-max mr-2`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        item.status === "waiting for payment"
                          ? "text-[#DC143C]"
                          : "text-[#4F28D9]"
                      }`}
                    >
                      {item.status === "waiting for payment"
                        ? "Waiting for Payment"
                        : "Done"}
                    </span>
                  </div>

                  {/* Three dots dropdown */}
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <RiMore2Fill
                      size={25}
                      color="#4F28D9"
                      className="cursor-pointer"
                    />
                  </Dropdown>
                </div>
              </div>

              <div className="py-3 flex items-center gap-2">
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
                  className={`${mediumMontserrat.className} flex flex-col gap-1 w-full `}
                >
                  <Link
                    href={item.link}
                    className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-1">
                    <RiCalendarLine size={16} color="#6b7280 " />
                    <span className="text-xs text-gray-500">
                      {item.schedule}
                    </span>
                  </div>

                  <div
                    className={`${mediumMontserrat.className} flex justify-between `}
                  >
                    <div className="flex  gap-1">
                      <RiTeamLine size={16} color="#6b7280" />
                      <span className="text-xs text-gray-500">
                        Guests: {item.guests}
                      </span>
                    </div>

                    <div className={`flex flex-col items-center gap-1 `}>
                      {item.DestinationPriceAdults && adultsCount > 0 && (
                        <span className="text-sm text-gray-500">
                          {adultsCount} x{" "}
                          {formatCurrency(item.DestinationPriceAdults)}
                        </span>
                      )}
                      {item.DestinationPriceChildren && childrenCount > 0 && (
                        <span className="text-sm text-gray-500">
                          {childrenCount} x{" "}
                          {formatCurrency(item.DestinationPriceChildren)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Harga hotel sama Type room */}
                  <div
                    className={`${mediumMontserrat.className} flex justify-between`}
                  >
                    {item.HotelRoomType && (
                      <span className="text-sm font-semibold text-gray-500">
                        {item.HotelRoomType}
                      </span>
                    )}
                    {item.HotelPricePerAdult && (
                      <span className="text-sm text-gray-500">
                        {item.guests.match(/\d+/)?.[0]} x{" "}
                        {formatCurrency(item.HotelPricePerAdult)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-300 "></div>
              <div className="pt-5 pb-3 flex justify-end w-full gap-2">
                <Link
                  href={"/"}
                  className="border border-solid border-[#4F28D9] rounded-xl py-2 px-5 w-max flex items-center gap-1 2xl:gap-2 text-xs text-[#4F28D9] no-underline font-semibold"
                >
                  See booking details
                </Link>
                {item.status !== "waiting for payment" && (
                  <Link
                    href={"/"}
                    className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-2 px-5 w-max flex items-center gap-1 2xl:gap-2 text-xs text-white no-underline font-semibold"
                  >
                    Review
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
