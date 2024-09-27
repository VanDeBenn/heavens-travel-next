"use client";
import React, { useEffect, useState } from "react";
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
import { Montserrat } from "next/font/google";
import { Modal } from "antd";
import { usersRepository } from "#/repository/users";
import { cartRepository } from "#/repository/carts";

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
  const [bookingItems, setBookingItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [dataCart, setDataCart] = useState<any[]>([]);
  const [cartId, setCartId] = useState<string>("");

  const fetchCart = async () => {
    const id: any = localStorage.getItem("_id");
    try {
      const res = await usersRepository.api.getUser(id);
      setDataCart(res.body.data.carts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const hanndleDelete = async (id: string) => {
    try {
      await cartRepository.api.deleteCart(id);
      const updatedCart = dataCart.filter((item) => item.id !== id);
      setDataCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleDelete = (indexToDelete: number) => {
  //   Modal.confirm({
  //     title: "Are you sure?",
  //     content: "Do you want to remove this item from your cart?",
  //     onOk: () => {
  //       const updatedItems = bookingItems.filter(
  //         (_, index) => index !== indexToDelete
  //       );
  //       const updatedSelected = selectedItems.filter(
  //         (_, index) => index !== indexToDelete
  //       );
  //       setBookingItems(updatedItems);
  //       setSelectedItems(updatedSelected);
  //     },
  //   });
  // };

  const handleCheckboxChange = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    updatedSelectedItems[index] = !updatedSelectedItems[index];
    setSelectedItems(updatedSelectedItems);
  };

  // const getTotalPrice = () => {
  //   return bookingItems.reduce((total, item, index) => {
  //     if (selectedItems[index]) {
  //       if (item.category === "Hotel" && item.HotelPricePerAdult) {
  //         const guests = Number(item.guests.match(/\d+/)?.[0]) || 1;
  //         total += item.HotelPricePerAdult * guests;
  //       } else if (item.category === "Destination") {
  //         const adultsCount =
  //           Number(item.guests.match(/(\d+)\s*adult/)?.[1]) || 0;
  //         const childrenCount =
  //           Number(item.guests.match(/(\d+)\s*child/)?.[1]) || 0;

  //         total += (item.DestinationPriceAdults || 0) * adultsCount;
  //         total += (item.DestinationPriceChildren || 0) * childrenCount;
  //       }
  //     }
  //     return total;
  //   }, 0);
  // };

  if (!dataCart.length) {
    return <div className="">Loading...</div>;
  }

  console.log(dataCart);

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="bg-white w-full rounded-xl">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">My Cart</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full">
            {dataCart.map(
              ({ roomhotel, destination, id }: any, index: number) => {
                const isSelected = selectedItems[index];
                // const totalCost =
                //   roomhotel?.HotelPricePerAdult &&
                //   Number(roomhotel?.guests.match(/\d+/)?.[0]) *
                //     roomhotel?.HotelPricePerAdult;

                // const adultsCount =
                //   Number(destination?.guests.match(/(\d+)\s*adult/)?.[1]) || 0;
                // const childrenCount =
                //   Number(destination?.guests.match(/(\d+)\s*child/)?.[1]) || 0;

                return (
                  <div
                    key={id}
                    className="p-3 border border-solid border-[#DBDBDB] rounded-xl w-full"
                  >
                    <div className="flex justify-between items-center">
                      <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                        {roomhotel ? (
                          <RiHome3Line size={18} color="#ffff" />
                        ) : (
                          <RiGlassesLine size={18} color="#ffff" />
                        )}
                        <span className="text-xs font-semibold text-white">
                          {roomhotel ? "Hotel" : "Destination"}
                        </span>
                      </div>

                      <RiDeleteBin6Line
                        size={24}
                        color="#DC143C"
                        className="cursor-pointer"
                        onClick={() => hanndleDelete(id)}
                      />
                    </div>

                    <div className="flex items-center gap-2 py-3">
                      <Link
                        href={`/hotel/detail/${
                          roomhotel?.id || destination?.id
                        }`}
                      >
                        <Image
                          src={
                            roomhotel?.pathLocation || destination?.pathLocation
                          }
                          alt={roomhotel?.name || destination?.name}
                          width={100}
                          height={100}
                          className="rounded-xl w-44"
                        />
                      </Link>

                      <div className="flex flex-col gap-1 w-full">
                        <Link
                          href={roomhotel?.id || destination?.id}
                          className="font-semibold no-underline"
                        >
                          {roomhotel?.name || destination?.name}
                        </Link>

                        <div className="flex items-center gap-1">
                          <RiCalendarLine className="text-lg text-black" />
                          <span className="text-xs text-gray-400">
                            {roomhotel?.startDate ||
                              destination?.startDate ||
                              "1 January 2023"}{" "}
                            -{" "}
                            {roomhotel?.endDate ||
                              destination?.endDate ||
                              "3 January 2023"}
                          </span>
                        </div>

                        <div className="flex gap-1">
                          <RiTeamLine size={16} color="#6b7280" />
                          <span className="text-xs text-gray-500">
                            Guests:{" "}
                            {roomhotel?.guests || destination?.guests || 3}
                          </span>
                        </div>

                        <div className="flex justify-between w-full">
                          <div
                            className="flex gap-1 cursor-pointer"
                            onClick={() => handleCheckboxChange(index)}
                          >
                            {isSelected ? (
                              <RiCheckboxFill className="text-[#4F28D9] text-lg" />
                            ) : (
                              <RiCheckboxBlankLine className="text-gray-400 text-lg" />
                            )}
                            <span
                              className={`text-sm font-semibold ${
                                isSelected ? "text-[#4F28D9]" : "text-gray-400"
                              }`}
                            >
                              {roomhotel?.HotelRoomType ||
                                destination?.DestinationType ||
                                "deluxe"}
                            </span>
                          </div>

                          <div className="flex items-end gap-1">
                            {/* {roomhotel?.HotelPricePerAdult && (
                              <span className="text-sm text-gray-500">
                                {roomhotel?.guests.match(/\d+/)?.[0]} x{" "}
                                {formatCurrency(roomhotel.HotelPricePerAdult)}
                              </span>
                            )} */}
                            {/* {destination?.DestinationPriceAdults &&
                              adultsCount > 0 && (
                                <>
                                  <span className="text-sm text-gray-500">
                                    {adultsCount} x{" "}
                                    {formatCurrency(
                                      destination.DestinationPriceAdults
                                    )}
                                  </span>
                                  {childrenCount > 0 && (
                                    <span className="text-sm text-gray-500">
                                      {" - "}
                                      {childrenCount} x{" "}
                                      {formatCurrency(
                                        destination.DestinationPriceChildren
                                      )}
                                    </span>
                                  )}
                                </>
                              )} */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-gray-300"></div>

                    <div className="pt-5 pb-3 flex justify-end w-full gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-xs">
                          Total Price
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            isSelected ? "text-[#DC143C]" : "text-gray-400"
                          }`}
                        >
                          {/* {roomhotel
                            ? formatCurrency(totalCost)
                            : formatCurrency(
                                adultsCount *
                                  destination?.DestinationPriceAdults +
                                  childrenCount *
                                    destination?.DestinationPriceChildren
                              )} */}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="w-1/3 bg-white rounded-xl h-48 sticky top-4">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Price Details</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className="flex justify-between items-center py-6 px-9">
            <span className="text-gray-500">Total</span>
            <span className="font-semibold text-lg text-gray-900">
              {/* {formatCurrency(getTotalPrice())} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
