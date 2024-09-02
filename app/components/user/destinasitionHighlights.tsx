"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiNewspaperLine } from "react-icons/ri";
import { GiNewShoot } from "react-icons/gi";

import { RiStarFill, RiDashboardHorizontalLine } from "react-icons/ri"; // Import ikon yang diinginkan
import { cardData } from "./news";

export default function destinasitionHighlights() {
  return (
    <div>
      {/* Card News */}
      <div className="flex items-center mb-4">
        <GiNewShoot size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">Destination Highlights</span>
      </div>
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
    </div>
  );
}
