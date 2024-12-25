"use client";
import React, { useState } from "react";
import {
  RiCalendarLine,
  RiTeamLine,
  RiHome3Line,
  RiMore2Fill,
  RiGlassesLine,
} from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
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

  console.log(data);
  return (
    <div className={`bg-white rounded-xl`}>
      {/* title */}
      <p className="text-xl font-semibold my-6 mx-9">My Booking</p>
      <div className="h-px bg-gray-300"></div>

      {/* grid */}
      <div className="px-8 py-6 grid grid-cols-1 gap-6">
        {data.map((booking: any, index: number) => {
          const { roomhotel, destination, payment, bookingdetails } = booking;

          const menu = (
            <Menu
              items={[
                {
                  key: "help",
                  label: (
                    <Link
                      href={`/profile/heavens-care?books=${booking?.id}`}
                      className="no-underline hover:text-RoyalAmethyst-700 duration-300 transition-all"
                    >
                      Help
                    </Link>
                  ),
                },
              ]}
            />
          );

          const bookingTitle =
            destination?.name ||
            roomhotel?.hotel?.name ||
            (payment?.externalId
              ? `${payment.externalId.slice(0, 7)}...${payment.externalId.slice(
                  -3
                )} (${
                  bookingdetails?.filter(
                    (detail: any) => detail.cart?.destination
                  ).length
                } destination, ${bookingdetails
                  ?.filter((detail: any) => detail.cart?.roomHotel)
                  .reduce(
                    (total: number, item: any) =>
                      total + (item.cart?.quantityRoom || 0),
                    0
                  )} room)`
              : "Unknown");

          return (
            <div
              key={booking.id}
              className="p-3 border border-solid border-[#DBDBDB] rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                  <FiBookOpen size={18} color="#ffff" />
                  <span className="text-xs font-semibold text-white">
                    Booking #{index + 1}
                  </span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`border-2 border-solid border-[#DBDBDB] ${
                      payment?.status === "PENDING"
                        ? "bg-[#FFD600] border-[#FFD600]"
                        : "bg-[#cbbef4] border-[#DBDBDB]"
                    } rounded-xl py-1 px-5 w-max mr-2`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        payment?.status === "PENDING"
                          ? "text-InfernoEcho-600"
                          : "text-RoyalAmethyst-700"
                      }`}
                    >
                      {payment?.status === "PENDING"
                        ? "Waiting for Payment"
                        : "Done"}
                    </span>
                  </div>

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
                <Link href={`bookings/detail/${booking.id}`}>
                  <Image
                    src={
                      destination?.photodestinations[0]?.pathPhoto
                        ? `http://localhost:3222/photo-destinations/${destination.photodestinations[0].pathPhoto}`
                        : roomhotel?.photoroomhotels[0]?.pathPhoto
                        ? `http://localhost:3222/photo-room-hotels/${roomhotel.photoroomhotels[0].pathPhoto}`
                        : bookingdetails[0]?.cart?.destination
                            ?.photodestinations[0]?.pathPhoto
                        ? `http://localhost:3222/photo-destinations/${bookingdetails[0].cart.destination.photodestinations[0].pathPhoto}`
                        : bookingdetails[0]?.cart?.roomHotel?.photoroomhotels[0]
                            ?.pathPhoto
                        ? `http://localhost:3222/photo-room-hotels/${bookingdetails[0].cart.roomHotel.photoroomhotels[0].pathPhoto}`
                        : ""
                    }
                    alt={""}
                    width={100}
                    height={100}
                    className="rounded-xl w-44"
                  />
                </Link>
                <div className="flex flex-col gap-1 w-full">
                  <Link
                    href={`bookings/detail/${booking.id}`}
                    className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                  >
                    {bookingTitle}
                  </Link>
                  <div className="flex items-center gap-1">
                    <RiCalendarLine size={16} color="#6b7280 " />
                    <span className="text-xs text-gray-500">
                      {bookingdetails[0]?.cart?.startDate
                        ? `${new Date(
                            bookingdetails[0].cart.startDate
                          ).toLocaleDateString()} - ${new Date(
                            bookingdetails[0].cart.endDate
                          ).toLocaleDateString()}`
                        : "No Schedule"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex gap-1">
                      <RiTeamLine size={16} color="#6b7280" />
                      <span className="text-xs text-gray-500 flex">
                        Guests:{" "}
                        <div className="flex-col">
                          <div>
                            {`${
                              bookingdetails[0]?.cart?.quantityAdult || 0
                            } Adult - ${
                              bookingdetails[0]?.cart?.quantityChildren || 0
                            } Children`}
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-300"></div>
              <div className="pt-5 pb-3 flex justify-end w-full gap-2">
                <Link
                  href={`bookings/detail/${booking.id}`}
                  className="border border-solid border-RoyalAmethyst-700 rounded-xl py-2 px-5 w-max flex items-center gap-1 text-xs text-RoyalAmethyst-700 no-underline font-semibold"
                >
                  See booking details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface BookingItem {
  category: "Hotel" | "Destination";
  name: string;
  HotelSchedule?: string;
  DestinationSchedule?: string;
  description: string;
  image: string;
  rating: number;
  link: string;
  guests: string;
  DestinationType?: string;
  HotelRoomType?: string;
  HotelPricePerAdult?: number;
  DestinationPriceAdults?: number;
  DestinationPriceChildren?: number;
  HotelTotalReviews?: number;
  DestinationTotalReviews?: number;
  HotelLocation?: string;
  DestinationLocation?: string;
  status?: "Done" | "waiting for payment";
}

export const initialBookingItems: BookingItem[] = [
  {
    category: "Hotel",
    name: "Mandarin Oriental",
    HotelSchedule: "5 Nov 2024 - 8 Nov 2024",
    description:
      "Modern luxury and comfort with excellent service at Mandarin Oriental Jakarta.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 3,
    link: "/",
    guests: "2 adults",
    HotelRoomType: "Deluxe King Room",
    HotelPricePerAdult: 600999,
    HotelTotalReviews: 120,
    HotelLocation: "Jakarta, Indonesia",
    status: "Done",
  },
  {
    category: "Destination",
    name: "Ubud Palace",
    DestinationSchedule: "1 Oct 2024 - 2 Oct 2024",
    description:
      "Explore Ubud Palace, a historical and cultural landmark showcasing Bali’s traditional architecture and rich heritage.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 4,
    link: "/",
    guests: "1 adult, 2 children",
    DestinationType: "Ubud Palace Tour",
    DestinationPriceAdults: 200000,
    DestinationPriceChildren: 100000,
    DestinationTotalReviews: 85,
    DestinationLocation: "Bali, Indonesia",
    status: "Done",
  },
  {
    category: "Hotel",
    name: "Atlasong Hotel",
    HotelSchedule: "12 Oct 2024 - 15 Oct 2024",
    description:
      "Luxury stay with stunning ocean views, offering top-notch service and unforgettable.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
    guests: "2 adults, 3 children",
    HotelRoomType: "Deluxe Double Room F",
    HotelPricePerAdult: 500999,
    HotelTotalReviews: 95,
    HotelLocation: "Bali, Indonesia",
    status: "waiting for payment",
  },
  {
    category: "Hotel",
    name: "Sansoeong Hotel",
    HotelSchedule: "12 Oct 2024 - 15 Oct 2024",
    description:
      "Luxury stay with stunning ocean views, offering top-notch service and unforgettable.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
    guests: "3 adults",
    HotelRoomType: "Deluxe Double Room F",
    HotelPricePerAdult: 500999,
    HotelTotalReviews: 77,
    HotelLocation: "Surabaya, Indonesia",
    status: "waiting for payment",
  },
  {
    category: "Hotel",
    name: "Jiungo Tyuning Hotel",
    HotelSchedule: "5 Nov 2024 - 8 Nov 2024",
    description:
      "Modern luxury and comfort with excellent service at Mandarin Oriental Jakarta.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 3,
    link: "/",
    guests: "2 adults, 3 children",
    HotelRoomType: "Deluxe King Room",
    HotelPricePerAdult: 600999,
    HotelTotalReviews: 120,
    HotelLocation: "Jakarta, Indonesia",
    status: "Done",
  },
];
