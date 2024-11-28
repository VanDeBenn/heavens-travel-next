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
import Loading from "#/app/loading";

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

interface ComponentsProps {
  data: any;
}

export default function MyBooking({ data }: ComponentsProps) {
  if (!data) {
    return <Loading />;
  }
  const [bookingItems, setBookingItems] =
    useState<BookingItem[]>(initialBookingItems);

  const formatCurrency = (amount: number) => `Rp${amount.toLocaleString()}`;

  // Dropdown menu
  const menu = (
    <Menu
      items={[
        {
          key: "help",
          label: (
            <Link
              href="/help"
              className="no-underline hover:text-RoyalAmethyst-700 duration-300 transition-all"
            >
              Help
            </Link>
          ),
        },
      ]}
    />
  );

  return (
    <div className={`bg-white rounded-xl`}>
      {/* title */}
      <p className="text-xl font-semibold my-6 mx-9">My Booking</p>
      <div className="h-px bg-gray-300"></div>

      {/* grid */}
      <div className="px-8 py-6 grid grid-cols-1 gap-6">
        {data.map((booking: any) => {
          return (
            <div
              key={booking.id}
              className="p-3 border border-solid border-[#DBDBDB] rounded-xl"
            >
              <div className="flex justify-between items-center">
                {/* Title and Icon */}
                <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                  {booking.bookingdetails[0]?.cart?.destination ? (
                    <RiHome3Line size={18} color="#ffff" />
                  ) : (
                    <RiGlassesLine size={18} color="#ffff" />
                  )}
                  <span className="text-xs font-semibold text-white">
                    {booking.bookingdetails[0]?.cart?.destination
                      ? "Destination"
                      : "Hotel"}
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`border-2 border-solid border-[#DBDBDB] ${
                      booking.payment?.status === "PENDING"
                        ? "bg-[#FFD600] border-[#FFD600]"
                        : "bg-[#cbbef4] border-[#DBDBDB]"
                    } rounded-xl py-1 px-5 w-max mr-2`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        booking.payment?.status === "PENDING"
                          ? "text-InfernoEcho-600"
                          : "text-RoyalAmethyst-700"
                      }`}
                    >
                      {booking.payment?.status === "PENDING"
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
                <Link href={`${booking.id}`}>
                  {/* <Image
                    src={
                      booking.bookingdetails[0]?.cart?.destination
                        ?.pathLocation || ""
                    }
                    alt={
                      booking.bookingdetails[0]?.cart?.destination?.name ||
                      "Destination"
                    }
                    width={100}
                    height={100}
                    className="rounded-xl w-44"
                  /> */}
                  <Image
                    src={
                      "https://imgs.search.brave.com/hoIxdncmtwEaAIJzTZljZdl4LAfd52BAD3Bo_qMxTjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby90/dmxrL2Jsb2cvMjAy/MS8wMi9IdXRhbi1C/YW1idS1QZW5nbGlw/dXJhbi1zaHV0dGVy/c3RvY2tfMTAxMzEz/MTAwNi5qcGc_dHI9/ZHByLTEuNSxoLTQ4/MCxxLTQwLHctMTAy/NA"
                    }
                    alt={""}
                    width={100}
                    height={100}
                    className="rounded-xl w-44"
                  />
                </Link>
                <div className="flex flex-col gap-1 w-full">
                  <Link
                    href={`/`}
                    className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                  >
                    {booking.bookingdetails[0]?.cart?.destination?.name ||
                      "No Name"}
                  </Link>
                  <div className="flex items-center gap-1">
                    <RiCalendarLine size={16} color="#6b7280 " />
                    <span className="text-xs text-gray-500">
                      {booking.bookingdetails[0]?.cart?.startDate
                        ? `${new Date(
                            booking.bookingdetails[0].cart.startDate
                          ).toLocaleDateString()} - ${new Date(
                            booking.bookingdetails[0].cart.endDate
                          ).toLocaleDateString()}`
                        : "No Schedule"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex gap-1">
                      <RiTeamLine size={16} color="#6b7280" />
                      <span className="text-xs text-gray-500">
                        Guests:{" "}
                        {`${
                          booking.bookingdetails[0]?.cart?.quantityAdult || 0
                        } Adult - ${
                          booking.bookingdetails[0]?.cart?.quantityChildren || 0
                        } Children`}
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      {booking.bookingdetails[0]?.cart?.destination
                        ?.priceAdult && (
                        <span className="text-sm text-gray-500">
                          {booking.bookingdetails[0]?.cart?.quantityAdult || 0}{" "}
                          x{" "}
                          {formatCurrency(
                            booking.bookingdetails[0]?.cart?.destination
                              ?.priceAdult
                          )}
                        </span>
                      )}
                      {booking.bookingdetails[0]?.cart?.destination
                        ?.priceChildren && (
                        <span className="text-sm text-gray-500">
                          {booking.bookingdetails[0]?.cart?.quantityChildren ||
                            0}{" "}
                          x{" "}
                          {formatCurrency(
                            booking.bookingdetails[0]?.cart?.destination
                              ?.priceChildren
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-300"></div>
              <div className="pt-5 pb-3 flex justify-end w-full gap-2">
                <Link
                  href={`/`}
                  className="border border-solid border-RoyalAmethyst-700 rounded-xl py-2 px-5 w-max flex items-center gap-1 text-xs text-RoyalAmethyst-700 no-underline font-semibold"
                >
                  See booking details
                </Link>
                {booking.payment?.status !== "PENDING" && (
                  <Link
                    href={`/profile/review`}
                    className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-2 px-5 w-max flex items-center gap-1 text-xs text-white no-underline font-semibold"
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

// Interface for BookingItem
export interface BookingItem {
  category: "Hotel" | "Destination";
  name: string;
  HotelSchedule?: string; // Opsional
  DestinationSchedule?: string; // Opsional
  description: string;
  image: string;
  rating: number;
  link: string;
  guests: string;
  DestinationType?: string; // Properti baru untuk tipe destinasi
  HotelRoomType?: string;
  HotelPricePerAdult?: number;
  DestinationPriceAdults?: number;
  DestinationPriceChildren?: number;
  HotelTotalReviews?: number;
  DestinationTotalReviews?: number;
  HotelLocation?: string; // Lokasi hotel
  DestinationLocation?: string; // Lokasi destinasi
  status?: "Done" | "waiting for payment";
}

// Data array booking dan destination
export const initialBookingItems: BookingItem[] = [
  {
    category: "Hotel",
    name: "Mandarin Oriental",
    HotelSchedule: "5 Nov 2024 - 8 Nov 2024", // Properti HotelSchedule untuk kategori Hotel
    description:
      "Modern luxury and comfort with excellent service at Mandarin Oriental Jakarta.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 3,
    link: "/",
    guests: "2 adults",
    HotelRoomType: "Deluxe King Room",
    HotelPricePerAdult: 600999,
    HotelTotalReviews: 120,
    HotelLocation: "Jakarta, Indonesia", // Lokasi hotel
    status: "Done",
  },
  {
    category: "Destination",
    name: "Ubud Palace",
    DestinationSchedule: "1 Oct 2024 - 2 Oct 2024", // Properti DestinationSchedule untuk kategori Destination
    description:
      "Explore Ubud Palace, a historical and cultural landmark showcasing Bali’s traditional architecture and rich heritage.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 4,
    link: "/",
    guests: "1 adult, 2 children",
    DestinationType: "Ubud Palace Tour", // Tipe destinasi dengan akhiran 'Tour'
    DestinationPriceAdults: 200000,
    DestinationPriceChildren: 100000,
    DestinationTotalReviews: 85,
    DestinationLocation: "Bali, Indonesia", // Lokasi destinasi
    status: "Done",
  },
  {
    category: "Hotel",
    name: "Atlasong Hotel",
    HotelSchedule: "12 Oct 2024 - 15 Oct 2024", // Properti HotelSchedule untuk kategori Hotel
    description:
      "Luxury stay with stunning ocean views, offering top-notch service and unforgettable.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
    guests: "2 adults, 3 children",
    HotelRoomType: "Deluxe Double Room F",
    HotelPricePerAdult: 500999,
    HotelTotalReviews: 95,
    HotelLocation: "Bali, Indonesia", // Lokasi hotel
    status: "waiting for payment",
  },
  {
    category: "Hotel",
    name: "Sansoeong Hotel",
    HotelSchedule: "12 Oct 2024 - 15 Oct 2024", // Properti HotelSchedule untuk kategori Hotel
    description:
      "Luxury stay with stunning ocean views, offering top-notch service and unforgettable.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
    guests: "3 adults",
    HotelRoomType: "Deluxe Double Room F",
    HotelPricePerAdult: 500999,
    HotelTotalReviews: 77,
    HotelLocation: "Surabaya, Indonesia", // Lokasi hotel
    status: "waiting for payment",
  },
  {
    category: "Hotel",
    name: "Jiungo Tyuning Hotel",
    HotelSchedule: "5 Nov 2024 - 8 Nov 2024", // Properti HotelSchedule untuk kategori Hotel
    description:
      "Modern luxury and comfort with excellent service at Mandarin Oriental Jakarta.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 3,
    link: "/",
    guests: "2 adults, 3 children",
    HotelRoomType: "Deluxe King Room",
    HotelPricePerAdult: 600999,
    HotelTotalReviews: 120,
    HotelLocation: "Jakarta, Indonesia", // Lokasi hotel
    status: "Done",
  },
];
