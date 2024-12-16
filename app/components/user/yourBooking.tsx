"use client";
import React, { useEffect, useState } from "react";
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

interface ComponentsProps {
  dataBookingDetail: any;
}

export default function YourBooking({ dataBookingDetail }: ComponentsProps) {
  // const [bookingItems, setBookingItems] = useState(initialBookingItems);
  // setSubmit(false);
  // Filter hotel dan destinasi untuk menampilkan hanya 1 hotel dan 1 destinasi
  // const filteredBookingItems = [
  //   ...bookingItems.filter((item) => roomHotel || destination === "Hotel").slice(0, 1),
  //   ...bookingItems
  //     .filter((item) => roomHotel || destination === "Destination")
  //     .slice(0, 1),
  // ];

  // const handleDelete = (indexToDelete: number) => {
  //   Modal.confirm({
  //     title: "Are you sure?",
  //     content: "Do you want to remove this item from your cart?",
  //     okText: "Remove",
  //     cancelText: "Cancel",
  //     onOk: () => {
  //       const updatedItems = filteredBookingItems.filter(
  //         (_, index) => index !== indexToDelete
  //       );
  //       setBookingItems(updatedItems);
  //     },
  //   });
  // };

  const allDestinations = dataBookingDetail.flatMap(
    (item: any) =>
      // item.cart.map((item: any) => item.destination?.name)
      item.cart.destination?.name
  );

  if (!dataBookingDetail) {
    return;
  }

  // console.log("com", dataBookingDetail);

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Your Booking</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full ">
            {dataBookingDetail.map((item: any) => {
              const { cart } = item;
              const { destination, roomHotel } = cart;

              const formatDate = (dateString: string) =>
                new Date(dateString).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

              // const totalCost = roomHotel?.priceAdult
              //   ? Number(
              //       cart?.quantityAdult cart?.quantityChildren ||
              //         cart?.quantityAdult +
              //           cart?.quantityChildren.match(/\d+/)?.[0]
              //     ) * roomHotel?.priceAdult
              //   : 0;
              // const adultsCount =
              //   Number(
              //     cart?.quantityAdult cart?.quantityChildren ||
              //       cart?.quantityAdult +
              //         cart?.quantityChildren.match(/(\d+)\s*adult/)?.[1]
              //   ) || 0;
              // const childrenCount =
              //   Number(
              //     cart?.quantityAdult cart?.quantityChildren ||
              //       cart?.quantityAdult +
              //         cart?.quantityChildren.match(/(\d+)\s*child/)?.[1]
              //   ) || 0;

              return (
                <div
                  key={item.id}
                  className="p-3 border border-solid border-[#DBDBDB] rounded-xl w-full"
                >
                  <div className="flex justify-between items-center">
                    <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                      {roomHotel ? (
                        <RiHome3Line size={18} color="#ffff" />
                      ) : (
                        <RiGlassesLine size={18} color="#ffff" />
                      )}
                      <span className="text-xs font-semibold text-white">
                        {roomHotel ? "Hotel" : "Destination"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <RiDeleteBin6Line
                        size={24}
                        color="#DC143C"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <Link href={""}>
                      <Image
                        src={
                          destination
                            ? `http://localhost:3222/photo-destinations/${destination.photodestinations[0]?.pathPhoto}`
                            : `http://localhost:3222/photo-room-hotels/${roomHotel.photoroomhotels[0].pathPhoto}`
                        }
                        alt={roomHotel?.roomType || destination?.name}
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
                        className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                      >
                        {roomHotel?.roomType || destination?.name}
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
                          Guests:{" "}
                          {destination
                            ? `${cart?.quantityAdult} Adult, ${cart?.quantityChildren} Children`
                            : `${roomHotel?.adult} Adult, ${roomHotel?.children} Children`}
                        </span>
                      </div>

                      <div className="flex justify-between w-full">
                        <div className="flex gap-1 w-full">
                          <span className="text-sm font-semibold text-RoyalAmethyst-700">
                            {destination
                              ? `${destination.name} Tour`
                              : `${roomHotel.roomType} Tour`}
                          </span>
                        </div>

                        <div className="flex justify-end w-full gap-1 items-end">
                          {roomHotel?.price && (
                            <div className="text-sm text-black">
                              {cart?.quantityRoom} Room x
                              {formatCurrency(roomHotel?.price)}
                            </div>
                          )}

                          {destination?.priceAdult &&
                            cart?.quantityAdult > 0 && (
                              <div className="text-sm text-black">
                                {cart?.quantityAdult} {"Adult"} x
                                {formatCurrency(destination?.priceAdult)} <br />
                                {cart?.quantityChildren > 0 &&
                                  destination?.priceChildren && (
                                    <>
                                      {cart?.quantityChildren} {"Children"} x
                                      {formatCurrency(
                                        destination?.priceChildren
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
                        {destination &&
                          formatCurrency(
                            (cart?.quantityAdult || 0) *
                              (destination?.priceAdult || 0) +
                              (cart?.quantityChildren || 0) *
                                (destination?.priceChildren || 0)
                          )}
                        {roomHotel &&
                          formatCurrency(
                            (cart?.quantityRoom || 0) * (roomHotel?.price || 0)
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* {dataBookingDetail.map((item: any) => {
              const { cart } = item;
              const { destination, roomHotel } = cart;
              //  // // console.log(item.id);
              return (
                <div className="" key={item.id}>
                  <div className="">{destination?.name}</div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </div>
  );
}
