"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiStarFill, RiDashboardHorizontalLine } from "react-icons/ri"; // Import ikon yang diinginkan
import { cardData } from "./news";

export default function NewsHighlight() {
  return (
    <div className="py-5 ">
      <div className="flex items-center mb-4">
        <RiDashboardHorizontalLine className="text-[#4F28D9] text-3xl mr-3" />
        <span className="text-xl font-bold">News Highlights</span>
      </div>

      <div className="bg-white rounded-xl">
        {cardData.slice(0, 1).map((card, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Link href={card.link} className="w-full no-underline">
              <Image
                src={"/images/illustration/hawaii-beach.jpg"}
                alt={card.title}
                width={800} // Ukuran gambar lebih besar
                height={400} // Ukuran gambar lebih besar
                objectFit="cover"
                className="w-full h-72 
rounded-l-xl"
              />
            </Link>

            <div className="w-full md:w-7/12 p-4 flex flex-col">
              <Link href={card.link} className="no-underline">
                <span className="text-2xl font-semibold mb-2 leading-7 text-black">
                  {card.title}
                </span>
              </Link>

              <span className="text-sm text-gray-600 pb-3">{card.date}</span>
              <Link href={card.link} className="no-underline">
                <span className="text-base text-gray-800">
                  {card.description}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Highlight utama */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {cardData.slice(0, 1).map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-lg no-underline"
          >
            <div className="w-full md:w-8/12">
              <Image
                src={card.imageSrc}
                alt={card.title}
                width={800}  // Ukuran gambar lebih besar
                height={400} // Ukuran gambar lebih besar
                objectFit="cover"
                className="w-full"
              />
            </div>
            <div className="w-full md:w-4/12 p-4 flex flex-col">
              <span className="text-2xl font-semibold mb-2 leading-7 text-black">
                {card.title}
              </span>
              <span className="text-sm text-gray-600 pb-3">
                {card.date}
              </span>
              <span className="text-base text-gray-800">
                {card.description}
              </span>
            </div>
          </Link>
        ))}
      </div> */}

      {/* Card News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {cardData.slice(0, 4).map((card, index) => (
          <Link
            key={index}
            href={card.link}
            //yang bener buat abang beckend
            // href={`/news/popular/${index}`}
          >
            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md transition-transform duration-300">
              <div className="relative w-full h-[400px]">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
                />
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-3 rounded-md shadow-md">
                <h2 className="text-base font-semibold mb-1 leading-4 text-black">
                  {card.title}
                </h2>
                <span className="text-xs text-gray-600">{card.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Button See More */}
      <div className="flex justify-center mt-6">
        <Link
          href={"/blog/list"}
          className="bg-[#ffffff] text-[#4F28D9] px-11 py-3 no-underline font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#4F28D9] hover:text-white shadow-lg"
        >
          See more
        </Link>
      </div>
    </div>
  );
}
