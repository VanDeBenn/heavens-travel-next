"use client";
import React, { useState } from "react";
import {
  RiCalendarLine,
  RiTeamLine,
  RiHome3Line,
  RiGlassesLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { BookingItem, initialBookingItems } from "./myBooking";
import { Montserrat } from "next/font/google";

const formatCurrency = (amount: number) =>
  `Rp${amount.toLocaleString("id-ID").replace(",", ".")}`;

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

export default function YourBooking() {
  const [bookingItems, setBookingItems] = useState(initialBookingItems);

  // Filter hotel dan destinasi untuk menampilkan hanya 1 hotel dan 1 destinasi
  const filteredBookingItems = [
    ...bookingItems.filter((item) => item.category === "Hotel").slice(0, 1),
    ...bookingItems.filter((item) => item.category === "Destination").slice(0, 1),
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
    <div className="w-full">
      <div className="flex gap-5">
        <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Your Booking</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full ">
            {filteredBookingItems.map((item, index) => {
              const totalCost = item.HotelPricePerAdult
                ? Number(item.guests.match(/\d+/)?.[0]) *
                  item.HotelPricePerAdult
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
                    <div className="flex items-center">
                      <RiDeleteBin6Line
                        size={24}
                        color="#DC143C"
                        className="cursor-pointer"
                        onClick={() => handleDelete(index)}
                      />
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
                    <div className={`${mediumMontserrat.className} flex flex-col gap-1 w-full`}>
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
                              {item.guests.match(/\d+/)?.[0]} x{" "}
                              {formatCurrency(item.HotelPricePerAdult)}
                            </div>
                          )}

                          {item.DestinationPriceAdults && adultsCount > 0 && (
                            <div className="text-sm text-black">
                              {adultsCount} x{" "}
                              {formatCurrency(item.DestinationPriceAdults)}
                              {childrenCount > 0 && item.DestinationPriceChildren && (
                                <>
                                  {" - "}
                                  {childrenCount} x{" "}
                                  {formatCurrency(item.DestinationPriceChildren)}
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
                    <div className={`${mediumMontserrat.className} flex flex-col gap-1`}>
                      <span className="font-semibold text-xs">Total Price</span>
                      <span className="text-sm font-semibold text-[#DC143C]">
                        {item.category === "Hotel" &&
                          formatCurrency(
                            (Number(item.guests.match(/\d+/)?.[0]) || 1) *
                              (item.HotelPricePerAdult || 0)
                          )}
                        {item.category === "Destination" &&
                          formatCurrency(
                            adultsCount * (item.DestinationPriceAdults || 0) +
                              childrenCount *
                                (item.DestinationPriceChildren || 0)
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
