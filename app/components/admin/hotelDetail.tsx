"use client";
import React from "react";
import Image from "next/image"; // Import Image dari next/image

import { mediumMontserrat } from "#/app/components/user/myBooking";
import Link from "next/link";

const hotelDetail: React.FC = () => {
  return (
    <div className="flex flex-col ">
      <div className={`${mediumMontserrat.className} flex items-center gap-2 mb-5`}>
        <Link href={"/"} className="no-underline text-black text-sm">
          Hotel
        </Link>
        <span>/</span>
        <Link href={"/"} className="no-underline text-black text-sm">
          Detail
        </Link>
      </div>

      <div className="bg-white rounded-xl border-solid border-gray-200 border p-7">
        <div className={`${mediumMontserrat.className}  pb-6`}>
          <span className="text-xl font-semibold">Hotel Detail</span>
        </div>
        {/* Basic Information Section */}
        <div className={` `}>
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-xl font-semibold">Basic information</span>
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
        {/* Location Section */}
        <div className="pt-5">
          <div className={`${mediumMontserrat.className} py-6`}>
            <span className="text-xl font-semibold">Location</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {locationDetail.map((detail, index) => (
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
                  {detail.label === "Path Location" ? (
                    <div className="w-full">
                      {/* Menggunakan next/image untuk gambar dengan ukuran w-full h-32 */}
                      <Image
                        src={detail.value}
                        alt="Location Map"
                        width={400} // Lebar asli gambar
                        height={128} // Sesuaikan tinggi
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {detail.value}
                    </div>
                  )}
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
            <span className="text-xl font-semibold">Facilities</span>
          </div>
          <div className="h-px bg-gray-300"></div> {/* Facilities Section */}
          <div className=" ">
            <div className={`${mediumMontserrat.className} py-3`}>
              <span className="text-lg font-semibold">Language Spoken</span>
            </div>
            <div className="h-px bg-gray-300"></div>

            <div className={`${mediumMontserrat.className} `}>
              {languageSpoken.map((detail, index) => (
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
          {/* Facilities Section */}
          <div className={` `}>
            <div className={`${mediumMontserrat.className} py-6`}>
              <span className="text-lg font-semibold">Nearby Location</span>
            </div>
            <div className="h-px bg-gray-300"></div>
            <div className={`${mediumMontserrat.className} py-3`}>
              <span className="text-lg font-semibold">
                Public Transportation
              </span>
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
          <div className={` `}>
            <div className={`${mediumMontserrat.className} py-6`}>
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
          <div className={` `}>
            <div className={`${mediumMontserrat.className} py-6`}>
              <span className="text-lg font-semibold">Nearby Location</span>
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
        </div>
        {/* Recommend Destination Nearby Section */}
        <div className="pt-5">
          <div className={`${mediumMontserrat.className} py-6`}>
            <span className="text-xl font-semibold">
              Recommend Destination Nearby
            </span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {RecommendDestinationNearby.map((detail, index) => (
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
                  {detail.label === "Photo" ? (
                    <div className="w-full">
                      {/* Menggunakan next/image untuk gambar dengan ukuran w-full h-32 */}
                      <Image
                        src={detail.value}
                        alt="Location Map"
                        width={400} // Lebar asli gambar
                        height={128} // Sesuaikan tinggi
                        className="w-72 h-48 object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {detail.value}
                    </div>
                  )}
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        {/* Faq Section */}
        <div className="pt-5">
          <div className={`${mediumMontserrat.className} py-6`}>
            <span className="text-xl font-semibold">Faq</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} py-3`}>
            <span className="text-lg font-semibold">Popular Destinations</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className={`${mediumMontserrat.className} `}>
            {PopularDestinations.map((detail, index) => (
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
            <span className="text-lg font-semibold">Popular Attraction</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} `}>
            {PopularAttraction.map((detail, index) => (
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

      <div
        className={`${mediumMontserrat.className}> bg-white rounded-xl border-solid border-gray-200 border px-7 py-4 flex justify-between items-center mt-5`}
      >
        <span className="text-lg font-semibold">Room Listing</span>
        <Link
          href={"/admin/hotels/detail/room-list"}
          className="bg-RoyalAmethyst-700 px-12 py-2 rounded-xl no-underline "
        >
          <span className="text-base font-semibold text-white">
            See room listing
          </span>
        </Link>
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

export default hotelDetail;

const basicInfo = [
  {
    label: "Name Hotel",
    value: "Grand Caman",
  },
  {
    label: "Rating",
    value: "4",
  },
  {
    label: "Description",
    value: "Grand caman the best in indonesian",
  },
];

const locationDetail = [
  {
    label: "Address",
    value: "Jl. Caman Raya No.23, RT.013/RW.008, Jatibening Baru",
  },
  {
    label: "Path Location",
    value: "/images/illustration/property-map-entry.png", // Path gambar
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

const languageSpoken = [
  {
    label: "Indonesia",
    value: "Available",
  },
  {
    label: "English",
    value: "Available",
  },
  {
    label: "Malaysia",
    value: "Available",
  },
];
const Internet = [
  {
    label: "Free WiFi",
    value: "Available",
  },
  {
    label: "WiFi in Public Area",
    value: "Available",
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

const RecommendDestinationNearby = [
  {
    label: "Name",
    value: "Taman Burung Jatibening Estate",
  },
  {
    label: "Photo",
    value: "/images/illustration/rainbow-appearing-sky.jpg", // Path gambar
  },
  {
    label: "Rating",
    value: "4",
  },
  {
    label: "District",
    value: "Jatobenong Bawru",
  },

  {
    label: "Review",
    value: "Good, Recommend!!",
  },
  {
    label: "Price",
    value: "Rp500.000",
  },
  {
    label: "URL",
    value: "https://htrip.com/destinations/tamanBurungJatibeningEstate/details",
  },
];

const PopularDestinations = [
  {
    label: "Urumqi Travel",
    value: "https://htrip.com/destinations/tamanBurungJatibeningEstate/",
  },
  {
    label: "Kauai Travel",
    value: "https://htrip.com/destinations/tamanBurungJatibeningEstate/",
  },
];
const PopularAttraction = [
  {
    label: "Kecak Bali",
    value: "https://htrip.com/destinations/tamanBurungJatibeningEstate/",
  },
  {
    label: "Calonarang",
    value: "https://htrip.com/destinations/tamanBurungJatibeningEstate/",
  },
];
