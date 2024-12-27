"use client";

import { Montserrat } from "next/font/google";
import { LiaBinocularsSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function OtherRecommendedCities() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className=" ">
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2`}
          >
            <FaMapMarkedAlt className="text-3xl text-RoyalAmethyst-700" />
            <span className="text-xl font-semibold">
              Other Recommended Cities
            </span>
          </div>
        </div>
      </div>

      {/* grid kota */}
      <div className="grid grid-cols-4 gap-4">
        {HolidayData.slice(0, 4).map((card) => (
          <Link key={card.id} href={card.link} className="no-underline">
            <div className="flex flex-col items-center justify-end h-60 rounded-xl shadow-md relative overflow-hidden p-4 cursor-pointer group">
              <Image
                src={card.imgSrc}
                alt={card.text}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <span
                className={`${mediumMontserrat.className} relative z-10 text-center font-semibold text-white text-xl`}
              >
                {card.text}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {/* end grid kota */}
    </div>
  );
}

const HolidayData = [
  {
    id: 1,
    text: "Bali",
    imgSrc: "/images/illustration/bali-indonesia.jpg",
    link: "/destination/list/bali",
  },
  {
    id: 2,
    text: "Jawa Tengah",
    imgSrc: "/images/illustration/road-bridge.jpg",
    link: "/destination/list/jawa-tengah",
  },
  {
    id: 3,
    text: "Jakarta",
    imgSrc: "/images/illustration/city-with-forest-front.jpg",
    link: "/destination/list/jakarta",
  },
  {
    id: 4,
    text: "Jawa Timur",
    imgSrc: "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
    link: "/destination/list/jawa-timur",
  },
  {
    id: 5,
    text: "Jakarta",
    imgSrc: "/images/illustration/city-with-forest-front.jpg",
    link: "/destination/list/jakarta",
  },
  {
    id: 6,
    text: "Jogja",
    imgSrc: "/images/illustration/religion-historic.jpg",
    link: "/destination/list/jogja",
  },
  {
    id: 7,
    text: "Bandung",
    imgSrc: "/images/illustration/high-angle.jpg",
    link: "/destination/list/bandung",
  },
  {
    id: 8,
    text: "Lampung",
    imgSrc: "/images/illustration/mountainous-landscape-with-fog.jpg",
    link: "/destination/list/lampung",
  },
];
