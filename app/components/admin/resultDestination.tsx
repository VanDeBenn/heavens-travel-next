"use client";
import React from "react";
import Image from "next/image"; // Import Image dari next/image

import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "#/app/components/user/myBooking";
import Link from "next/link";

const resultDestination: React.FC = () => {
  return (
    <div>
      <div className={`${mediumMontserrat.className} py-6 px-7`}>
        <span className="text-lg font-semibold">Create Destination Succes</span>
      </div>
      <div className="flex flex-col gap-5">
        {/* Basic Information Section */}
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-lg font-semibold">Basic information</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {guestDetails.map((detail, index) => (
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

        {/* Location Section */}
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-lg font-semibold">Location</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {guestDetails2.map((detail, index) => (
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
                  <div className="w-full">
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {detail.value}
                    </div>
                  </div>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-lg font-semibold">Photos</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div
            className={`${mediumMontserrat.className} grid grid-cols-4 gap-4 pt-6`}
          >
            {guestDetails3.map((detail, index) => (
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
        <div className="pt-7 flex justify-end">
          <Link
            href={"/admin/destinations"}
            className="bg-[#4F28D9] border-solid no-underline border transition-all duration-300 text-white
             rounded-xl py-2 px-20   text-center font-semibold"
          >
            Done
          </Link>
        </div>
      </div>{" "}
    </div>
  );
};

export default resultDestination;

const guestDetails = [
  {
    label: "Name Destination",
    value: "Nusa Penuda iceland",
  },
  {
    label: "Rating",
    value: "4",
  },
  {
    label: "Description",
    value: "Nusa Penuda iceland the best in indonesian",
  },
  {
    label: "Adult Price",
    value: "Rp233.000",
  },
  {
    label: "Children Price",
    value: "Rp100.000",
  },
];

const guestDetails2 = [
  {
    label: "Address",
    value: "Jl. Caman Raya No.23, RT.013/RW.008, Jatibening Baru",
  },
  {
    label: "Path Location",
    value:
      "https://chatgpt.com/c/6704d134-1684-8002-2321r-2323122332131321321331", // Path gambar
  },
  {
    label: "District",
    value: "Jatobenong Bawru",
  },
  {
    label: "City",
    value: "Bekasi",
  },
  {
    label: "Province",
    value: "West Java",
  },
  {
    label: "Country",
    value: "Indonesia",
  },
];
const guestDetails3 = [
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
