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

interface ComponentsProps {
  dataBooking: any;
  dataBookingDetail: any;
  setSubmit: any;
}

export default function PaymentMethod({
  dataBooking,
  dataBookingDetail,
  setSubmit,
}: ComponentsProps) {
  const [bookingItems, setBookingItems] = useState(initialBookingItems);
  setSubmit(false);

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
  //  // console.log(dataBooking);
  const guestDetails = [
    {
      label: "Full Name",
      value: dataBooking?.customerName || dataBooking?.guestName,
    },
    {
      label: "Email",
      value: dataBooking?.customerEmail || dataBooking?.guestEmail,
    },
    {
      label: "Phone Number",
      value: dataBooking?.customerPhoneNumber || dataBooking?.guestPhoneNumber,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5">
        <div
          className={`bg-white rounded-xl border-solid border-gray-200 border`}
        >
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Guest Detailed</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className="pb-7">
            {guestDetails.map((detail, index) => (
              <div key={index}>
                <div className="flex items-center px-9 py-5 gap-2">
                  <div className="flex items-center">
                    <div
                      className={`text-black w-60 font-semibold ${mediumMontserrat}`}
                    >
                      {detail.label}
                    </div>
                    <span className="font-semibold">:</span>
                  </div>
                  <div
                    className={`font-semibold text-black ${mediumMontserrat}`}
                  >
                    {detail.value}
                  </div>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Your Booking</span>
          </div>
          <div className="h-px bg-gray-300"></div>
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
                className="py-3 px-9 border border-solid border-[#DBDBDB] rounded-xl w-full"
              >
                <div className="flex justify-between items-center">
                  <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                    {roomHotel ? (
                      <RiHome3Line size={18} color="#ffff" />
                    ) : (
                      <RiGlassesLine size={18} color="#ffff" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {/* {roomHotel?. ? "Hotel" : "Destination"} */}
                      {roomHotel?.name || destination?.name}
                    </span>
                  </div>
                  {/* <div className="flex items-center">
                    <RiDeleteBin6Line
                      size={24}
                      color="#DC143C"
                      className="cursor-pointer"
                      // onClick={() => handleDelete(item.id)}
                    />
                  </div> */}
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
                      className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                    >
                      {roomHotel?.name || destination?.name}
                    </Link>
                    <div className="flex items-center gap-1">
                      <RiCalendarLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        {cart?.startDate && cart?.endDate
                          ? `${formatDate(cart.startDate)} - ${formatDate(
                              cart.endDate
                            )}`
                          : ""}
                      </span>
                    </div>
                    <div className="flex gap-1 items-center">
                      <RiTeamLine className="text-lg text-black" />
                      <span className="text-xs text-black">
                        Guests: {cart?.quantityAdult + cart?.quantityChildren}
                      </span>
                    </div>

                    <div className="flex justify-between w-full">
                      <div className="flex gap-1 w-full">
                        <span className="text-sm font-semibold text-RoyalAmethyst-700">
                          {roomHotel ||
                            (destination && `${destination?.name} Tour`)}
                        </span>
                      </div>

                      <div className="flex justify-end w-full gap-1 items-end">
                        {roomHotel?.priceAdult && (
                          <div className="text-sm text-black">
                            {cart?.quantityAdult + cart?.quantityChildren ||
                              cart?.quantityAdult +
                                cart?.quantityChildren.match(/\d+/)?.[0]}{" "}
                            x{formatCurrency(roomHotel?.priceAdult)}
                          </div>
                        )}

                        {destination?.priceAdult && cart?.quantityAdult > 0 && (
                          <div className="text-sm text-black">
                            {cart?.quantityAdult} {"Adult"} x{" "}
                            {formatCurrency(destination?.priceAdult)} <br />
                            {cart?.quantityChildren > 0 &&
                              destination?.priceChildren && (
                                <>
                                  {cart?.quantityChildren} {"Children"} x{" "}
                                  {formatCurrency(destination?.priceChildren)}
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
                          ((cart?.quantityAdult || 0) +
                            (cart?.quantityChildren || 0) || 1) *
                            (roomHotel?.priceAdult || 0)
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
  );
}
