"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  RiMapPin2Fill,
  RiStarFill,
  RiStarHalfFill,
  RiBuilding3Line,
} from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { GiSydneyOperaHouse } from "react-icons/gi";
import { destinationRepository } from "#/repository/destinations";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

// Define the HotelCard type
type HotelCard = {
  id: number;
  text: string;
  imgSrc: string;
  link: string;
  desc: string;
  loc: string;
  price: string;
  stars: number;
};

interface ComponentProps {
  data: any;
}

export default function RecommendedDestiNearby({ data }: ComponentProps) {
  const [destinationData, setDestinationData] = useState<any>();
  const cityName = data?.city?.name;

  const getDestinationNearby = async () => {
    const data = {
      cityName: cityName,
    };
    try {
      const res = await destinationRepository.api.getDestinationByCityName(
        data
      );
      setDestinationData(res.body.data);
    } catch (err) {
      console.error("Failed to fetch destinations by city name:", err);
    }
  };

  useEffect(() => {
    getDestinationNearby();
  }, [cityName]);

  if (!destinationData) {
    return;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div
          className={`${mediumMontserrat.className} flex items-center gap-2`}
        >
          <RiBuilding3Line className="text-3xl text-RoyalAmethyst-700" />
          <span className="text-xl font-semibold">
            Recommended Destination Nearby
          </span>
        </div>
      </div>

      {/* Grid card */}
      <div className="grid grid-cols-4 gap-4">
        {destinationData
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
          .map((item: any) => (
            <div
              key={item.id}
              className="no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
            >
              <Link href={""} className="flex flex-col items-center">
                <Image
                  src={"/images/illustration/hawaii-beach.jpg"}
                  alt={item.id}
                  className="h-52 w-full rounded-t-xl"
                  height={300}
                  width={300}
                />
              </Link>
              <div
                className={`${mediumMontserrat.className} px-4 pb-2 flex flex-col gap-2`}
              >
                <div className="flex justify-between gap-1">
                  <Link
                    href={""}
                    className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <React.Fragment key={index}>
                        {index + 0.5 < item.rating ? (
                          <RiStarFill className="text-[#FFD700] text-lg" />
                        ) : index < item.rating ? (
                          <RiStarHalfFill className="text-[#FFD700] text-lg" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPin2Fill className="text-lg text-gray-400" />
                  <span className="text-sm text-gray-400">{item.address}</span>
                </div>
                <Link
                  href={""}
                  className="text-black text-base font-semibold no-underline leading-6"
                >
                  {item.description}
                </Link>
                <div className="flex justify-end">
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-400 text-sm align-text-bottom ">
                      Start from
                    </span>
                    <Link
                      href={""}
                      className="text-InfernoEcho-600 text-lg font-semibold no-underline"
                    >
                      {item.priceChildren}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* End card */}
    </div>
  );
}

const cityData: { [key: string]: HotelCard[] } = {
  Asia: [
    {
      id: 1,
      text: "Ayana Resort ",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bali",
      desc: "Experience luxury in the heart.",
      loc: "Ciledug",
      price: "Rp290.000",
      stars: 4.5,
    },
    {
      id: 2,
      text: " Seasons Resort",
      imgSrc: "/images/illustration/road-bridge.jpg",
      link: "/kota/bali",
      desc: "Discover tranquility in Ubud.",
      loc: "Kuala Lumpur",
      price: "Rp320.000",
      stars: 4,
    },
    {
      id: 3,
      text: "Oberoi Beach Resort",
      imgSrc: "/images/illustration/beautiful-church.jpg",
      link: "/kota/bali",
      desc: "A beachside paradise.",
      loc: "Hongkong",
      price: "Rp340.000",
      stars: 2.5,
    },
    {
      id: 4,
      text: "Alila Villas Uluwatu",
      imgSrc: "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
      link: "/kota/bali",
      desc: "Enjoy the vibrant Kuta Beach.",
      loc: "Bali",
      price: "Rp310.000",
      stars: 4,
    },
  ],
};
