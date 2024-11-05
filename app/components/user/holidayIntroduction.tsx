"use client";

import { Montserrat } from "next/font/google";
import { LiaBinocularsSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function HolidayIntroduction() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <div
              className={`${mediumMontserrat.className} flex items-center gap-2`}
            >
              <LiaBinocularsSolid className="text-3xl text-RoyalAmethyst-700" />
              <span className="text-xl font-semibold">
                Enjoy yourself on holiday in Asia and beyond
              </span>
            </div>
          </div>

          <span
            className={`${mediumMontserrat.className} text-base text-black`}
          >
            where every destination offers a unique blend of culture, adventure,
            and relaxation
          </span>
        </div>
      </div>

      {/* grid kota */}
      <div className="grid grid-cols-4 gap-4">
        {HolidayData.map((card) => (
          <Link key={card.id} href={card.link} className="no-underline ">
            <div className="flex flex-col items-center justify-end h-60 bg-gray-200 rounded-xl shadow-md relative overflow-hidden p-4 cursor-pointer group">
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
                className={`${mediumMontserrat.className} relative z-10 text-center font-semibold text-white text-xl hover:text-RoyalAmethyst-700 transition-all duration-300`}
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
    link: "/kota/bali",
  },
  {
    id: 2,
    text: "Bekasi",
    imgSrc: "/images/illustration/road-bridge.jpg",
    link: "/kota/bekasi",
  },
  {
    id: 3,
    text: "Banten",
    imgSrc: "/images/illustration/beautiful-church.jpg",
    link: "/kota/banten",
  },
  {
    id: 4,
    text: "Balikpapan",
    imgSrc: "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
    link: "/kota/balikpapan",
  },
  {
    id: 5,
    text: "Jakarta",
    imgSrc: "/images/illustration/city-with-forest-front.jpg",
    link: "/kota/jakarta",
  },
  {
    id: 6,
    text: "Jogja",
    imgSrc: "/images/illustration/religion-historic.jpg",
    link: "/kota/jogja",
  },
  {
    id: 7,
    text: "Bandung",
    imgSrc: "/images/illustration/high-angle.jpg",
    link: "/kota/bandung",
  },
  {
    id: 8,
    text: "Lampung",
    imgSrc: "/images/illustration/mountainous-landscape-with-fog.jpg",
    link: "/kota/lampung",
  },
];
