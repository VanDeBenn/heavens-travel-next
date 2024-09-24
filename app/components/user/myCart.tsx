"use client";
import React, { useState } from "react";
import {
  RiCalendarLine,
  RiTeamLine,
  RiHome3Line,
  RiGlassesLine,
  RiDeleteBin6Line,
  RiCheckboxFill,
  RiCheckboxBlankLine,
} from "react-icons/ri";

import Image from "next/image";
import Link from "next/link";
import { BookingItem, initialBookingItems } from "./myBooking";
import { Montserrat } from "next/font/google";
import { Modal } from "antd";

const formatCurrency = (amount: number) =>
  `Rp${amount.toLocaleString("id-ID").replace(",", ".")}`;
// Mengimpor font Montserrat dari Google Fonts
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

export default function MyCart() {
  const [bookingItems, setBookingItems] = useState(initialBookingItems);
  const [selectedItems, setSelectedItems] = useState<boolean[]>(
    Array(initialBookingItems.length).fill(false)
  );

  const handleDelete = (indexToDelete: number) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "Do you want to remove this item from your cart?",
      onOk: () => {
        const updatedItems = bookingItems.filter(
          (_, index) => index !== indexToDelete
        );
        const updatedSelected = selectedItems.filter(
          (_, index) => index !== indexToDelete
        );
        setBookingItems(updatedItems);
        setSelectedItems(updatedSelected);
      },
    });
  };

  const handleCheckboxChange = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index];
    setSelectedItems(updatedSelectedItems);
  };

  const getTotalPrice = () => {
    return bookingItems.reduce((total, item, index) => {
      if (selectedItems[index]) {
        // For Hotel calculation
        if (item.category === "Hotel" && item.HotelPricePerAdult) {
          const guests = Number(item.guests.match(/\d+/)?.[0]) || 1;
          total += item.HotelPricePerAdult * guests;
        }

        // For Destination calculation
        if (item.category === "Destination") {
          const adultsCount =
            Number(item.guests.match(/(\d+)\s*adult/)?.[1]) || 0;
          const childrenCount =
            Number(item.guests.match(/(\d+)\s*child/)?.[1]) || 0;

          if (item.DestinationPriceAdults && adultsCount > 0) {
            total += item.DestinationPriceAdults * adultsCount;
          }

          if (item.DestinationPriceChildren && childrenCount > 0) {
            total += item.DestinationPriceChildren * childrenCount;
          }
        }
      }
      return total;
    }, 0);
  };

  return (
    <div className="w-full">
      {/* title */}
      <div className="flex gap-5">
        <div className="bg-white w-full rounded-xl">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className={`text-lg font-semibold`}>My Cart</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full ">
            {bookingItems.map((item, index) => {
              const isSelected = selectedItems[index];
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
                  className={`p-3 border border-solid border-[#DBDBDB] rounded-xl w-full`}
                >
                  {/* Bagian atas: kategori dan delete icon */}
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

                    {/* Delete icon */}
                    <div className="flex items-center">
                      <RiDeleteBin6Line
                        size={24}
                        color="#DC143C"
                        className="cursor-pointer"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </div>

                  {/* Bagian tengah: gambar dan detail */}
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
                        className={`font-semibold no-underline ${
                          isSelected ? "text-black" : "text-gray-400"
                        } hover:text-[#4F28D9] duration-300 transition-all`}
                      >
                        {item.name}
                      </Link>

                      <div className="flex items-center gap-1">
                        <RiCalendarLine className="text-lg text-black" />
                        <span
                          className={`text-xs ${
                            isSelected
                              ? "text-black duration-300 transition-all"
                              : "text-gray-400"
                          }`}
                        >
                          {item.category === "Hotel"
                            ? item.HotelSchedule
                            : item.DestinationSchedule}
                        </span>
                      </div>

                      {/* Guests */}
                      <div
                        className={`${mediumMontserrat.className} flex justify-between`}
                      >
                        <div className="flex gap-1">
                          <RiTeamLine size={16} color="#6b7280" />
                          <span className="text-xs text-gray-500">
                            Guests: {item.guests}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`${mediumMontserrat.className} flex justify-between w-full`}
                      >
                        <div
                          className="flex gap-1 cursor-pointer"
                          onClick={() => handleCheckboxChange(index)}
                        >
                          {isSelected ? (
                            <RiCheckboxFill className="text-[#4F28D9] text-lg duration-300 transition-all" />
                          ) : (
                            <RiCheckboxBlankLine className="text-gray-400 text-lg" />
                          )}

                          {item.category === "Hotel" && item.HotelRoomType && (
                            <span
                              className={`text-sm font-semibold whitespace-nowrap ${
                                isSelected
                                  ? "text-[#4F28D9] duration-300 transition-all"
                                  : "text-gray-400"
                              }`}
                            >
                              {item.HotelRoomType}
                            </span>
                          )}

                          {item.category === "Destination" &&
                            item.DestinationType && (
                              <span
                                className={`text-sm font-semibold whitespace-nowrap ${
                                  isSelected
                                    ? "text-[#4F28D9] duration-300 transition-all"
                                    : "text-gray-400"
                                }`}
                              >
                                {item.DestinationType}
                              </span>
                            )}
                        </div>

                        {/* Harga hotel */}
                        {item.HotelPricePerAdult && (
                          <div className="flex justify-end w-full">
                            <span
                              className={`text-sm ${
                                isSelected ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              {item.guests.match(/\d+/)?.[0]} x{" "}
                              {formatCurrency(item.HotelPricePerAdult)}
                            </span>
                          </div>
                        )}

                        {/* Harga destinasi */}
                        <div className={`flex items-end gap-1`}>
                          {item.DestinationPriceAdults && adultsCount > 0 && (
                            <>
                              <span className="text-sm text-gray-500">
                                {adultsCount} x{" "}
                                {formatCurrency(item.DestinationPriceAdults)}
                              </span>
                              {/* Tanda "-" hanya jika ada harga destinasi untuk anak */}
                              {item.DestinationPriceChildren &&
                                childrenCount > 0 && (
                                  <span className="text-sm text-gray-500">
                                    {" - "}
                                    {childrenCount} x{" "}
                                    {formatCurrency(
                                      item.DestinationPriceChildren
                                    )}
                                  </span>
                                )}
                            </>
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
                      <span
                        className={`text-sm font-semibold ${
                          isSelected
                            ? "text-[#DC143C] duration-300 transition-all"
                            : "text-gray-400"
                        }`}
                      >
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

        {/* Bagian kanan: total keseluruhan cuk */}
        <div className="w-1/3 bg-white rounded-xl h-48 sticky top-20">
          <div
            className={`${mediumMontserrat.className} py-6 px-5 text-center`}
          >
            <span className={`text-lg font-semibold`}>Total Price</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className="my-6 px-5 w-full flex-col flex gap-3">
            <div
              className={`${mediumMontserrat.className} flex justify-between`}
            >
              <span className="font-semibold text-base">
                {selectedItems.filter(Boolean).length} item
              </span>
              <span className="text-[#DC143C] font-semibold text-base duration-300 transition-all">
                {formatCurrency(getTotalPrice())}
              </span>
            </div>

            <Link
              href={""}
              className="w-full bg-[#4F28D9] text-center py-2 text-white text-sm no-underline font-semibold rounded-xl"
            >
              <span className="">Book now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
