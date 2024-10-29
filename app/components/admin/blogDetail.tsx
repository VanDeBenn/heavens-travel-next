"use client";
import React from "react";
import Image from "next/image"; // Import Image dari next/image

import { mediumMontserrat } from "#/app/components/user/myBooking";
import Link from "next/link";

const BlogDetail: React.FC = () => {
  return (
    <div className="">
      <div
        className={`${mediumMontserrat.className} flex items-center gap-2 mb-5`}
      >
        <Link href={"/admin/blog/"} className="no-underline text-black text-sm">
          Blog
        </Link>
        <span>/</span>
        <Link
          href={"/admin/blog/detail/"}
          className="no-underline text-black text-sm"
        >
          Detail
        </Link>
      </div>
      <div className="flex flex-col bg-white border-solid border-gray-200 border p-7 rounded-xl">
        {/* Basic Information Section */}
        <div className={` `}>
          
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
        <div className="">
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
      </div>

      <div className="pt-7 flex justify-end">
        <Link
          href={"/admin/blog"}
          className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white
             rounded-xl py-2 px-20 text-RoyalAmethyst-700 text-center font-semibold"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;

const basicInfo = [
  {
    label: "Blog Title",
    value: "Wahid Borobudur is a hotel located in Borobudur",
  },
  {
    label: "Description",
    value:
      "Wahid Borobudur is a hotel located in Borobudur, a 13-minute walk from the famous Borobudur Temple, a UNESCO World Heritage Site and one of the seven wonders of the world. The hotel provides accommodations with a terrace , free private parking, a restaurant, and a 24-hour front desk. The hotel also offers a tour desk and luggage storage for guests. The hotel's rooms are equipped with a desk, a flat-screen TV, a private bathroom, bed linen, and towels. Some rooms have a balcony with a garden view. The hotel serves a continental breakfast daily. The hotel is 1.4 miles from the Borobudur Temple and 1.7 miles from the Mendut Temple. The nearest airport is Yogyakarta International Airport, 22 miles from the hotel.",
  },
];

const photosPreview = [
  {
    value: "/images/illustration/bedroom-suite.jpg", // Path gambar
  },
];
