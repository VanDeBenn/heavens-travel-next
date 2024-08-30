"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiNewspaperLine, RiFireLine } from "react-icons/ri";

export default function News() {
  return (
    <div className="py-5 flex flex-col items-center">
      {/* News Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
        <div className="lg:col-span-4">
          <div className="flex items-center mb-4">
            <RiNewspaperLine size={26} color="#4F28D9" className="mr-2" />
            <span className="text-2xl font-semibold">News</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
            {cardData.slice(0, 8).map((card, index) => (
              <Link key={index} href={`/news/${index}`}>
                {/* Tambahkan Link di sekitar card */}
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

        {/* Popular News Section */}
        <div className="lg:col-span-1">
          <div className="flex items-center mb-4">
            <RiFireLine size={26} color="#4F28D9" className="mr-2" />
            <span className="text-xl font-semibold">Popular</span>
          </div>
          <div className="space-y-2 bg-white rounded-xl">
            {popularNewsData.slice(0, 3).map((news, index) => (
              <Link
                key={index}
                href={`/news/popular/${index}`}
                className="no-underline"
              >
                {/* Tambahkan Link di sekitar news card */}
                <div className="relative overflow-hidden group p-3">
                  <div className="relative w-full h-[170px] xl:h-[190px] overflow-hidden rounded-lg">
                    <Image
                      src={news.imageSrc}
                      alt={news.title}
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0 transition-transform duration-300 transform"
                    />
                  </div>
                  <div className="pt-3">
                    <h2 className="text-lg font-semibold mb-1 leading-5 text-black">
                      {news.title}
                    </h2>
                    <span className="text-sm text-gray-600 font-medium">
                      {news.date}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* See More Button Section */}
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

export const cardData = [
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 1",
    date: "August 27, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 2",
    date: "August 26, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 1",
    date: "August 27, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 2",
    date: "August 26, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 1",
    date: "August 27, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 2",
    date: "August 26, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 1",
    date: "August 27, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 2",
    date: "August 26, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 1",
    date: "August 27, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 2",
    date: "August 26, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 1",
    date: "August 27, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  {
    title: "Tropical Paradise: Hawaii’s Most Stunning Natural Wonders 2",
    date: "August 26, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore the breathtaking beauty of Hawaii with stunning beaches, lush forests, and active volcanoes. A perfect blend of relaxation and adventure awaits you.",
  },
  // ... other card data
];

export const popularNewsData = [
  {
    title: "Top 10 Beaches in Hawaii",
    date: "August 18, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
  },
  {
    title: "Top 10 Beaches in Hawaii",
    date: "August 18, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
  },
  {
    title: "Top 10 Beaches in Hawaii",
    date: "August 18, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
  },
  {
    title: "Top 10 Beaches in Hawaii",
    date: "August 18, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
  },
  {
    title: "Top 10 Beaches in Hawaii",
    date: "August 18, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
  },
  {
    title: "Top 10 Beaches in Hawaii",
    date: "August 18, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
  },
  // ... other popular news data
];
