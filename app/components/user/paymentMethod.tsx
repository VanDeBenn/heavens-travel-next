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
  `Rp${amount?.toLocaleString("id-ID")?.replace(",", "?.")}`;

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
}

export default function PaymentMethod({
  dataBooking,
  dataBookingDetail,
}: ComponentsProps) {
  if (!dataBooking && !dataBookingDetail) {
    return;
  }
  const [bookingItems, setBookingItems] = useState(initialBookingItems);

  // Filter hotel dan destinasi untuk menampilkan hanya 1 hotel dan 1 destinasi
  const filteredBookingItems = [
    ...bookingItems?.filter((item) => item?.category === "Hotel")?.slice(0, 1),
    ...bookingItems
      ?.filter((item) => item?.category === "Destination")
      ?.slice(0, 1),
  ];

  const handleDelete = (indexToDelete: number) => {
    Modal?.confirm({
      title: "Are you sure?",
      content: "Do you want to remove this item from your cart?",
      okText: "Remove",
      cancelText: "Cancel",
      onOk: () => {
        const updatedItems = filteredBookingItems?.filter(
          (_, index) => index !== indexToDelete
        );
        setBookingItems(updatedItems);
      },
    });
  };
  console?.log(dataBooking);
  console?.log(dataBookingDetail);
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
          <div className={`${mediumMontserrat?.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Guest Detailed</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className="pb-7">
            {guestDetails?.map((detail, index) => (
              <div key={index}>
                <div className="flex items-center px-9 py-5 gap-2">
                  <div className="flex items-center">
                    <div
                      className={`text-black w-60 font-semibold ${mediumMontserrat}`}
                    >
                      {detail?.label}
                    </div>
                    <span className="font-semibold">:</span>
                  </div>
                  <div
                    className={`font-semibold text-black ${mediumMontserrat}`}
                  >
                    {detail?.value}
                  </div>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white w-full rounded-xl border-solid border-gray-200 border">
          <div className={`${mediumMontserrat?.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Your Booking</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          {dataBookingDetail?.length > 0 ? (
            dataBookingDetail?.map((item: any) => {
              const { cart } = item;
              const { destination, roomHotel } = cart;

              const formatDate = (dateString: string) =>
                new Date(dateString)?.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

              return (
                <div
                  key={item?.id}
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
                        {roomHotel ? "Hotel" : "Destination"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 py-3">
                    <Link href={""}>
                      <Image
                        src={
                          destination
                            ? `http://localhost:3222/photo-destinations/${destination?.photodestinations[0]?.pathPhoto}`
                            : `http://localhost:3222/photo-room-hotels/${roomHotel?.photoroomhotels[0]?.pathPhoto}`
                        }
                        alt={roomHotel?.roomType || destination?.name}
                        width={100}
                        height={100}
                        className="rounded-xl w-44"
                      />
                    </Link>
                    <div
                      className={`${mediumMontserrat?.className} flex flex-col gap-1 w-full`}
                    >
                      <Link
                        href={""}
                        className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                      >
                        {roomHotel?.hotel?.name || destination?.name}
                      </Link>
                      <div className="flex items-center gap-1">
                        <RiCalendarLine className="text-lg text-black" />
                        <span className="text-xs text-black">
                          {cart?.startDate && cart?.endDate
                            ? `${formatDate(cart?.startDate)} - ${formatDate(
                                cart?.endDate
                              )}`
                            : ""}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <RiTeamLine className="text-lg text-black" />
                        <span className="text-xs text-black">
                          {destination
                            ? `Guests: ${cart?.quantityAdult} Adult - ${cart?.quantityChildren} Children`
                            : `Rooms: ${cart?.quantityRoom}`}
                        </span>
                      </div>

                      <div className="flex justify-between w-full">
                        <div className="flex gap-1 w-full">
                          <span className="text-sm font-semibold text-RoyalAmethyst-700">
                            {destination
                              ? `${destination?.name} Tour`
                              : `${roomHotel?.roomType} Room`}
                          </span>
                        </div>

                        <div className="flex justify-end w-full gap-1 items-end">
                          {roomHotel?.price && (
                            <div className="text-sm text-black">
                              {cart?.quantityRoom} Room x{" "}
                              {formatCurrency(roomHotel?.price)}
                            </div>
                          )}

                          {destination?.priceAdult &&
                            cart?.quantityAdult > 0 && (
                              <div className="text-sm text-black">
                                {cart?.quantityAdult} {"Adult"} x{" "}
                                {formatCurrency(destination?.priceAdult)} <br />
                                {cart?.quantityChildren > 0 &&
                                  destination?.priceChildren && (
                                    <>
                                      {cart?.quantityChildren} {"Children"} x{" "}
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
                      className={`${mediumMontserrat?.className} flex flex-col gap-1`}
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
            })
          ) : (
            <div className="py-3 px-9 border border-solid border-[#DBDBDB] rounded-xl w-full">
              <div className="flex justify-between items-center">
                <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                  {dataBooking?.roomHotel || dataBooking?.roomhotel ? (
                    <RiHome3Line size={18} color="#ffff" />
                  ) : (
                    <RiGlassesLine size={18} color="#ffff" />
                  )}
                  <span className="text-xs font-semibold text-white">
                    {dataBooking?.roomHotel || dataBooking?.roomhotel
                      ? "Hotel"
                      : "Destination"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 py-3">
                <Link href={""}>
                  <Image
                    src={
                      dataBooking?.destination?.photodestinations?.[0]
                        ?.pathPhoto
                        ? `http://localhost:3222/photo-destinations/${dataBooking.destination.photodestinations[0].pathPhoto}`
                        : dataBooking?.roomHotel?.photoroomhotels?.[0]
                            ?.pathPhoto
                        ? `http://localhost:3222/photo-room-hotels/${dataBooking.roomHotel.photoroomhotels[0].pathPhoto}`
                        : dataBooking?.roomhotel?.photoroomhotels?.[0]
                            ?.pathPhoto
                        ? `http://localhost:3222/photo-room-hotels/${dataBooking.roomhotel.photoroomhotels[0].pathPhoto}`
                        : "http://localhost:3222/default-image.jpg"
                    }
                    alt={
                      dataBooking?.roomHotel?.roomType ||
                      dataBooking?.roomhotel?.roomType ||
                      dataBooking?.destination?.name
                    }
                    width={100}
                    height={100}
                    className="rounded-xl w-44"
                  />
                </Link>
                <div
                  className={`${mediumMontserrat?.className} flex flex-col gap-1 w-full`}
                >
                  <Link
                    href={""}
                    className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                  >
                    {dataBooking?.roomHotel?.hotel?.name ||
                      dataBooking?.roomhotel?.hotel?.name ||
                      dataBooking?.destination?.name}
                  </Link>
                  <div className="flex items-center gap-1">
                    <RiCalendarLine className="text-lg text-black" />
                    <span className="text-xs text-black">
                      {dataBooking?.startDate && dataBooking?.endDate
                        ? `${new Date(
                            dataBooking?.startDate
                          )?.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })} - ${new Date(
                            dataBooking?.endDate
                          )?.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}`
                        : ""}
                    </span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <RiTeamLine className="text-lg text-black" />
                    <span className="text-xs text-black">
                      {dataBooking?.destination
                        ? `Guests: ${dataBooking?.quantityAdult} Adult - ${dataBooking?.quantityChildren} Children`
                        : `Rooms: ${dataBooking?.quantityRoom}`}
                    </span>
                  </div>

                  <div className="flex justify-between w-full">
                    <div className="flex gap-1 w-full">
                      <span className="text-sm font-semibold text-RoyalAmethyst-700">
                        {dataBooking?.destination
                          ? `${dataBooking.destination.name} Tour`
                          : `${
                              dataBooking?.roomHotel?.roomType ||
                              dataBooking?.roomhotel?.roomType
                            } Room`}
                      </span>
                    </div>

                    <div className="flex justify-end w-full gap-1 items-end">
                      {dataBooking?.roomHotel?.price ? (
                        <div className="text-sm text-black">
                          {dataBooking?.quantityRoom} Room x{" "}
                          {formatCurrency(dataBooking?.roomHotel?.price)}
                        </div>
                      ) : dataBooking?.roomhotel?.price ? (
                        <div className="text-sm text-black">
                          {dataBooking?.quantityRoom} Room x{" "}
                          {formatCurrency(dataBooking?.roomhotel?.price)}
                        </div>
                      ) : null}

                      {dataBooking?.destination?.priceAdult &&
                        dataBooking?.quantityAdult > 0 && (
                          <div className="text-sm text-black">
                            {dataBooking?.quantityAdult} {"Adult"} x{" "}
                            {formatCurrency(
                              dataBooking?.destination?.priceAdult
                            )}{" "}
                            <br />
                            {dataBooking?.quantityChildren > 0 &&
                              dataBooking?.destination?.priceChildren && (
                                <>
                                  {dataBooking?.quantityChildren} {"Children"} x{" "}
                                  {formatCurrency(
                                    dataBooking?.destination?.priceChildren
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
                  className={`${mediumMontserrat?.className} flex flex-col gap-1`}
                >
                  <span className="font-semibold text-xs">Total Price</span>

                  <span className="text-sm font-semibold text-InfernoEcho-600">
                    {dataBooking?.destination &&
                      formatCurrency(
                        (dataBooking?.quantityAdult || 0) *
                          (dataBooking?.destination?.priceAdult || 0) +
                          (dataBooking?.quantityChildren || 0) *
                            (dataBooking?.destination?.priceChildren || 0)
                      )}
                    {dataBooking?.roomHotel ||
                      (dataBooking?.roomhotel &&
                        formatCurrency(
                          (dataBooking?.quantityRoom || 0) *
                            (dataBooking?.roomHotel?.price ||
                              dataBooking?.roomhotel?.price ||
                              0)
                        ))}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
