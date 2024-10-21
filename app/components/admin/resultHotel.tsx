"use client";

import React from "react";
import Image from "next/image"; // Import Image dari next/image
import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "#/app/components/user/myBooking";
import Link from "next/link";
const ResultHotel: React.FC = () => {
  return (
    <div>
      <div className={`${mediumMontserrat.className} py-6 px-7`}>
        <span className="text-lg font-semibold">Create Hotel Succes</span>
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
        {/* Facilities Section */}
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-5`}>
            <span className="text-lg font-semibold">Facilities</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Language Spoken</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {Language.map((detail, index) => (
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

          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Internet</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} `}>
            {Internet.map((detail, index) => (
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
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-5`}>
            <span className="text-lg font-semibold">Nearby Location</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Public Transportation</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {publicTrans.map((detail, index) => (
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

          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Hospital or Clinic</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} `}>
            {hosOrCli.map((detail, index) => (
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
        {/* Property Policies Section */}
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-5`}>
            <span className="text-lg font-semibold">Property Policies</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {pp.map((detail, index) => (
              <div key={index}>
                <div className="flex items-center py-5 gap-2">
                  <div className="flex items-center">
                    <div
                      className={`text-black font-semibold text-base ${mediumMontserrat}`}
                    >
                      {detail.label}
                    </div>
                  </div>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        {/* Facilities Section */}
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-5`}>
            <span className="text-lg font-semibold">Some Helpful Facts</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">
              Check-in/Check-out Time
            </span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {schedule.map((detail, index) => (
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

          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Getting Arround</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} `}>
            {GettingArround.map((detail, index) => (
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

        {/* Facilitie  */}
        <div
          className={` bg-white rounded-xl  border-solid border-gray-200 border  p-7 `}
        >
          <div className={`${mediumMontserrat.className} pb-5`}>
            <span className="text-lg font-semibold">Faqs</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Popular Destinations</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {PopularDesti.map((detail, index) => (
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

          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Popular Blog</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} `}>
            {Blog.map((detail, index) => (
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
      <div className="pt-7 flex justify-end">
        <Link
          href={"/admin/destinations"}
          className="bg-RoyalAmethyst-700 border-solid no-underline border transition-all duration-300 text-white
             rounded-xl py-2 px-20   text-center font-semibold"
        >
          Done
        </Link>
      </div>
    </div>
  );
};
export default ResultHotel;
const guestDetails = [
  {
    label: "Name Hotel",
    value: "Nusa Kambangan Cemara",
  },
  {
    label: "Rating",
    value: "4",
  },
  {
    label: "Description",
    value:
      "Hotel Nusa Kambangan Cemara offers comfortable and beautiful accommodation",
  },
];
const guestDetails2 = [
  {
    label: "Address",
    value:
      "Jl. Nusa Kambangan No. 123, RT 05/RW 08, Kelurahan Cemara Indah, Kecamatan Pantai Berbisik, Kabupaten Nusa Kambangan, Provinsi Nusa Selatan, 12345.",
  },
  {
    label: "Path Location",
    value:
      "https://chatgpt.com/c/6704d134-1684-8002-2321r-2323122332131321321331", // Path gambar
  },
  {
    label: "District",
    value: "Tomban Timor",
  },
  {
    label: "City",
    value: "Bekasi Timoer",
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

const Language = [
  {
    label: "English",
    value: "Available",
  },
  {
    label: "indonesia",
    value: "Available",
  },
  {
    label: "Malaysia",
    value: "Unavailable",
  },
];

const Internet = [
  {
    label: "Free WiFi",
    value: "Available",
  },
  {
    label: "WiFi in Public Areas",
    value: "Available",
  },
];

const pp = [
  {
    label:
      "When booking more than 5 rooms, different policies and additional supplements may apply.",
  },
  {
    label:
      "Infant 0-2 year(s) stay for free if using existing bedding, baby cot/crib may be requested directly from the property.",
  },
];

const schedule = [
  {
    label: "Check-in Time",
    value: "07:20 AM",
  },
  {
    label: "Check-out Time",
    value: "10:00 PM",
  },
];
const GettingArround = [
  {
    label: "Airport Transfer Fee",
    value: "Rp350.000",
  },
  {
    label: "Distance from City Center",
    value: "0,7 km",
  },
];

const PopularDesti = [
  {
    label: "Biuen komodo",
    value: "https://htrip.com/c/6715cb4c-52b0-800c-90a",
  },
  {
    label: "Jigow land",
    value: "https://htrip.com/c/6715cb4c-52b0-800c-90a",
  },
];
const Blog = [
  {
    label: "Kuadar island",
    value: "https://htrip.com/c/6715cb4c-52b0-800c-90a",
  },
  {
    label: "Polar Sintaurus",
    value: "https://htrip.com/c/6715cb4c-52b0-800c-90a",
  },
];

const publicTrans = [
  {
    label: "Terminal Tidar Magelang",
    value: "Available",
  },
  {
    label: "Terminal Bus Kebonpolo",
    value: "Available",
  },
];
const hosOrCli = [
  {
    label: "Kidungan Sehat Clinic",
    value: "Available",
  },
  {
    label: "Soerojo Hospital",
    value: "Available",
  },
];
