"use client";
import React from "react";
import Image from "next/image"; // Import Image dari next/image

import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "#/app/components/user/myBooking";
import Link from "next/link";
import { Destination } from "#/app/types/Destinations";
import Loading from "#/app/loading";

interface ComponentsProps {
  destinationData: Destination;
}

export default function destinationDetail({
  destinationData,
}: ComponentsProps) {
  if (!destinationData) {
    return <Loading />;
  }

  // console.log(destinationData);
  const guestDetails = [
    { label: "Name Destination", value: destinationData?.name },
    { label: "Rating", value: destinationData?.rating },
    { label: "Description", value: destinationData?.description },
    { label: "Adult Price", value: `Rp${destinationData?.priceAdult}` },
    { label: "Children Price", value: `Rp${destinationData?.priceChildren}` },
  ];

  const guestDetails2 = [
    { label: "Address", value: destinationData?.address },
    { label: "Path Location", value: destinationData?.pathLocation },
    // {
    //   label: "District",
    //   value:
    //     //  destinationData?.disrict ||
    //     "",
    // },
    {
      label: "City",
      value: destinationData?.city?.name,
    },
    {
      label: "Province",
      value: destinationData?.city?.province?.name || "",
    },
    {
      label: "Country",
      value: destinationData?.city?.province?.country?.name || "",
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

  const photos: any[] = destinationData?.photodestinations;

  //  // // console.log(photos);
  return (
    <div>
      <div className={`${mediumMontserrat.className} py-6 px-7`}>
        <span className="text-lg font-semibold">Destination Detail</span>
      </div>
      <div className="bg-white rounded-xl border-solid border-gray-200 border p-7">
        {/* Basic Information Section */}
        <div className={` `}>
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
        <div className={` `}>
          <div className={`${mediumMontserrat.className} py-6`}>
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
                    <span className="font-semibold mr-2">: </span>
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {detail.value}
                    </div>
                  </div>
                  {detail.label === "Path Location" ? (
                    <div
                      className="w-full"
                      // dangerouslySetInnerHTML={{ __html: detail.value }}
                    />
                  ) : (
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {""}
                    </div>
                  )}
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        <div className={` `}>
          <div className={`${mediumMontserrat.className} py-6`}>
            <span className="text-lg font-semibold">Photos</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div
            className={`${mediumMontserrat.className} grid grid-cols-4 gap-4 pt-6`}
          >
            {photos?.map((item: any) => (
              <div key={item.id}>
                <div className="w-full">
                  <Image
                    src={`http://localhost:3222/photo-destinations/${item?.pathPhoto}`}
                    alt="Location Map"
                    width={400}
                    height={150}
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
            className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white
             rounded-xl py-2 px-20 text-RoyalAmethyst-700 text-center font-semibold"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

// const guestDetails = [
//   {
//     label: "Name Destination",
//     value: "Nusa Penuda iceland",
//   },
//   {
//     label: "Rating",
//     value: "4",
//   },
//   {
//     label: "Description",
//     value: "Nusa Penuda iceland the best in indonesian",
//   },
//   {
//     label: "Adult Price",
//     value: "Rp233.000",
//   },
//   {
//     label: "Children Price",
//     value: "Rp100.000",
//   },
// ];

// const guestDetails2 = [
//   {
//     label: "Address",
//     value: "Jl. Caman Raya No.23, RT.013/RW.008, Jatibening Baru",
//   },
//   {
//     label: "Path Location",
//     value: "/images/illustration/property-map-entry.png", // Path gambar
//   },
//   {
//     label: "District",
//     value: "Jatobenong Bawru",
//   },
//   {
//     label: "City",
//     value: "Bekasi",
//   },
//   {
//     label: "Province",
//     value: "West Java",
//   },
//   {
//     label: "Country",
//     value: "Indonesia",
//   },
// ];
// const guestDetails3 = [
//   {
//     value: "/images/illustration/bedroom-suite.jpg", // Path gambar
//   },
//   {
//     value: "/images/illustration/luxury-bedroom.jpg", // Path gambar
//   },
//   {
//     value: "/images/illustration/bedroom-suite.jpg", // Path gambar
//   },
//   {
//     value: "/images/illustration/luxury-bedroom.jpg", // Path gambar
//   },
// ];
