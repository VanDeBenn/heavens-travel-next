"use client";
import React from "react";
import Image from "next/image"; // Import Image dari next/image

import { mediumMontserrat } from "#/app/components/user/myBooking";
import Link from "next/link";
import Loading from "#/app/loading";

interface ComponentProps {
  data: any;
}

export default function RoomDetail({ data }: ComponentProps) {
  if (!data) {
    return <Loading />;
  }

  const basicInfo = [
    {
      label: "Room Type",
      value: data.roomType,
    },
    {
      label: "Price",
      value: `Rp${data.price}`,
    },
    {
      label: "Adult",
      value: data.adult,
    },
    {
      label: "Childen Allowed",
      value: data.children,
    },
    {
      label: "Bed Type",
      value: data?.singleBed
        ? "single bed"
        : data?.doubleBed
        ? "double bed"
        : data?.queenBed
        ? "queen bed"
        : data?.kingBed
        ? "king bed"
        : "no bed",
    },
    {
      label: "Number Room",
      value: data.numberRoom,
    },
  ];

  const photosPreview = [
    {
      value: "/images/illustration/bedroom-suite.jpg", // Path gambar
    },
    {
      value: "/images/illustration/luxury-bedroom.jpg", // Path gambar
    },
    {
      value: "/images/illustration/bedroom-suite.jpg", // Path gambar
    },
    {
      value: "/images/illustration/luxury-bedroom.jpg", // Path gambar
    },
  ];

  const facility = [
    {
      label: "Air Conditioning",
      value: "Available",
    },
    {
      label: "Shower",
      value: "Available",
    },
    {
      label: "Toilettries",
      value: "Available",
    },
    {
      label: "Towels",
      value: "Available",
    },
    {
      label: "Telephone",
      value: "Available",
    },
    {
      label: "Television",
      value: "Available",
    },
  ];

  return (
    <div className="">
      <div
        className={`${mediumMontserrat.className} flex items-center gap-2 mb-5`}
      >
        <Link
          href={"/admin/hotels/"}
          className="no-underline text-black text-sm"
        >
          Hotel
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/"}
          className="no-underline text-black text-sm"
        >
          Detail
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/room-list"}
          className="no-underline text-black text-sm"
        >
          Room Listing
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/room-list/room-detail"}
          className="no-underline text-black text-sm"
        >
          Detail
        </Link>
      </div>
      <div className="flex flex-col gap-5 ">
        {/* Basic Information Section */}
        <div
          className={`bg-white border-solid border-gray-200 border p-7 rounded-xl`}
        >
          <div className={`${mediumMontserrat.className}  pb-6`}>
            <span className="text-xl font-semibold">Room Detail</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} `}>
            {basicInfo.map((detail, index) => (
              <div key={index}>
                <div className="flex items-center py-5 gap-2">
                  <div className="flex items-center">
                    <div
                      className={`text-black w-60 font-semibold text-base ${mediumMontserrat}`}
                    >
                      {detail.label}
                    </div>
                    <span className="font-semibold">:</span>
                  </div>
                  <div className={`text-base text-black ${mediumMontserrat}`}>
                    {detail.value}
                  </div>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Photo */}
        <div className="  bg-white border-solid border-gray-200 border p-7 rounded-xl">
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-xl font-semibold">Photos</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div
            className={`${mediumMontserrat.className} grid grid-cols-4 gap-4 pt-6`}
          >
            {data?.photoroomhotels.map((item: any) => (
              <div key={item.id}>
                <div className="w-full">
                  {/* Menggunakan next/image untuk gambar dengan ukuran w-full h-32 */}
                  <Image
                    src={`http://localhost:3222/photo-room-hotels/${item.pathPhoto}`}
                    alt="Location Map"
                    width={400} // Lebar asli gambar
                    height={150} // Sesuaikan tinggi
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        <div className=" bg-white border-solid border-gray-200 border p-7 rounded-xl">
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-xl font-semibold">Facility</span>
          </div>
          <div className="h-px bg-gray-300"></div> {/* Facilities Section */}
          <div className=" ">
            <div className={`${mediumMontserrat.className} `}>
              {facility.map((detail, index) => (
                <div key={index}>
                  <div className="flex items-center py-5 gap-2">
                    <div className="flex items-center">
                      <div
                        className={`text-black w-60 font-semibold text-base ${mediumMontserrat}`}
                      >
                        {detail.label}
                      </div>
                      <span className="font-semibold">:</span>
                    </div>
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {detail.value}
                    </div>
                  </div>
                  <div className="h-px bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-7 flex justify-end">
        <Link
          href={"/admin/hotels/detail/room-list"}
          className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white
             rounded-xl py-2 px-20 text-RoyalAmethyst-700 text-center font-semibold"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
