"use client";
import React from "react";
import Image from "next/image"; // Import Image dari next/image

import { mediumMontserrat } from "#/app/components/user/myBooking";
import Link from "next/link";

const roomHotelDetail: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-white rounded-xl border-solid border-gray-200 border p-7">
        <div className={`${mediumMontserrat.className}  pb-6`}>
          <span className="text-xl font-semibold">Room Detail</span>
        </div>
        {/* Basic Information Section */}
        <div className={` `}>
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
        <div className="pt-5">
          <div className={`${mediumMontserrat.className} py-6`}>
            <span className="text-xl font-semibold">Photos</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div
            className={`${mediumMontserrat.className} grid grid-cols-4 gap-4 pt-6`}
          >
            {photosPreview.map((detail, index) => (
              <div key={index}>
                <div className="w-full">
                  {/* Menggunakan next/image untuk gambar dengan ukuran w-full h-32 */}
                  <Image
                    src={detail.value}
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
        <div className="pt-5">
          <div className={`${mediumMontserrat.className} py-6`}>
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
          href={"/admin/hotels"}
          className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white
             rounded-xl py-2 px-20 text-RoyalAmethyst-700 text-center font-semibold"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default roomHotelDetail;

const basicInfo = [
  {
    label: "Room Type",
    value: "Deluxe king",
  },
  {
    label: "Price",
    value: "Rp1,299,000,00",
  },
  {
    label: "Adult",
    value: "4",
  },
  {
    label: "Childen Allowed",
    value: "4",
  },
  {
    label: "Bed Type",
    value: "2 Double bed and 1 King Bed",
  },
  {
    label: "Number Room",
    value: "5",
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
