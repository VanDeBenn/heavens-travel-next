"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { RiArrowRightSLine, RiNewspaperLine } from "react-icons/ri";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function NewsFrom() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2`}
          >
            <RiNewspaperLine className="text-3xl text-RoyalAmethyst-700" />
            <span className="text-xl font-semibold">
              Exciting News from Bali
            </span>
          </div>
          <span
            className={`${mediumMontserrat.className} text-base text-black`}
          >
            filled with wonders and new marvels at every turn.{" "}
          </span>
        </div>

        <div className={`${mediumMontserrat.className} `}>
          <Link
            href="/ "
            className="border-solid border-RoyalAmethyst-700 border hover:bg-RoyalAmethyst-700 hover:border-gray-300 transition-all duration-300 px-7 py-2 rounded-xl no-underline group flex items-center "
          >
            <span className="text-RoyalAmethyst-700 text-sm font-semibold group-hover:text-white transition-all duration-300 ">
              Read Inspiring Articles
            </span>
            <RiArrowRightSLine className="text-2xl text-RoyalAmethyst-700 group-hover:text-white transition-all duration-300 " />
          </Link>
        </div>
      </div>

      {/* Card News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {DiscoverData.slice(0, 4).map((card, index) => (
          <div
            key={index}
            // href={card.link}
            //yang bener buat abang beckend
            // href={`/news/popular/${index}`}
          >
            <div className="relative bg-white border border-gray-200 rounded-xl  ">
              <Link href={card.link}>
                <div className="relative w-full h-[440px]">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    // width={300}
                    // height={300}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0  rounded-xl "
                  />
                </div>
              </Link>

              <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-3 rounded-md border-solid border-gray-200 border">
                <div className="flex flex-col">
                  <Link
                    href={card.link}
                    className="text-base font-semibold mb-1 leading-5 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                  >
                    {card.title}
                  </Link>
                  <span className="text-xs text-gray-600">{card.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const DiscoverData = [
  {
    title:
      "The Ultimate Guide to Experiencing Hawaii’s Natural Beauty and Adventure",
    date: "August 25, 2024",
    imageSrc: "/images/illustration/ocean-sky.jpg",
    description:
      "Unveil the secrets of Hawaii's hidden waterfalls, tucked away in lush jungles and accessible only to those willing to explore.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii’s Volcanic Landscapes: A Photographer’s Dream",
    date: "August 24, 2024",
    imageSrc: "/images/illustration/mount-batur.jpg",
    description:
      "Capture the dramatic beauty of Hawaii’s volcanic landscapes with tips from top photographers.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii's Marine Life: Dive into a Blue Wonderland",
    date: "August 23, 2024",
    imageSrc: "/images/illustration/vertical-aerial.jpg",
    description:
      "Explore Hawaii’s vibrant underwater world, home to a rich array of marine life and colorful coral reefs.",
    link: "/blog/list/detail",
  },
  {
    title: "A Journey Through Hawaii's Cultural Heritage",
    date: "August 22, 2024",
    imageSrc: "/images/illustration/7708552_1280.jpg",
    description:
      "Learn about Hawaii's rich cultural heritage, from ancient traditions to modern-day practices that define the islands.",
    link: "/blog/list/detail",
  },
];
