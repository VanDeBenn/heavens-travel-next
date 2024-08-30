"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiStarFill, RiDashboardHorizontalLine } from "react-icons/ri"; // Import ikon yang diinginkan
import { cardData } from "./news";

export default function NewsHighlight() {
  return (
    <div className="py-5">
      <div className="flex items-center mb-4">
        <RiDashboardHorizontalLine className="text-[#4F28D9] text-3xl mr-3" />
        <span className="text-2xl font-bold">News Highlights</span>
      </div>

      {/* Highlight utama */}
      <div className="grid grid-cols-1 gap-4">
        {cardData.slice(0, 1).map((card, index) => (
          <div
            key={index}
            className="relative flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg items-center gap-4"
            style={{ minHeight: "300px" }}
          >
            <div className="relative w-3/5 h-full overflow-hidden">
              <Image
                src={card.imageSrc}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300"
              />
            </div>
            <div className="flex-1 p-4">
              <h2 className="text-2xl font-semibold mb-2 leading-7">
                {card.title}
              </h2>
              <p className="text-sm text-gray-600 mb-3">{card.date}</p>
              <p className="text-base text-gray-800">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Card News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {cardData.slice(0, 4).map((card, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg transition-transform duration-300"
          >
            <div className="relative w-full h-[450px] overflow-hidden">
              <Image
                src={card.imageSrc}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-lg transform translate-y-4">
              <h2 className="text-lg font-semibold mb-1 leading-tight">
                {card.title}
              </h2>
              <span className="text-sm text-gray-600">{card.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Button See More */}
      <div className="flex justify-center mt-6">
        <Link
          href={"/"}
          className="bg-[#ffffff] text-[#4F28D9] px-11 py-3 no-underline font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#4F28D9] hover:text-white shadow-lg"
        >
          See more
        </Link>
      </div>
    </div>
  );
}
