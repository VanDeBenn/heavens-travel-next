"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiPuzzleLine } from "react-icons/ri";
import { GiNewShoot } from "react-icons/gi";

import { RiStarFill, RiDashboardHorizontalLine } from "react-icons/ri"; // Import ikon yang diinginkan
import { cardData } from "./news";

export default function moreNews() {
  return (
    <div className="pt-5">
      <div className="flex items-center mb-4">
        <RiPuzzleLine size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">More News</span>
      </div>

      <div>
        <div className=" grid grid-cols-2 gap-5">
          {cardData.slice(0, 8).map((card, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 items-center bg-white rounded-xl "
            >
              <Link href={card.link} className="w-full ">
                <Image
                  src={"/images/illustration/hawaii-beach.jpg"}
                  alt={card.title}
                  width={800}
                  height={400}
                  objectFit="cover"
                  className="w-full h-40 
rounded-xl"
                />
              </Link>
              <div className="w-full flex flex-col">
                <Link
                  href={card.link}
                  className="text-black hover:text-[#4F28D9] transition-all duration-300 no-underline text-xl font-semibold leading-6"
                >
                  {card.title}
                </Link>

                <span className="text-sm text-gray-600 my-1">{card.date}</span>
                <span className="text-sm text-gray-600">
                  {card.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Link
          href={"/blog/list"}
          className="bg-[#ffffff] text-[#4F28D9] px-11 py-3 no-underline font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#4F28D9] hover:text-white shadow-lg"
        >
          Load more
        </Link>
      </div>
    </div>
  );
}
