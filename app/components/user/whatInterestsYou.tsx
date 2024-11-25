"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "antd";

import { Montserrat } from "next/font/google";
import { citieRepository } from "#/repository/cities";
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function WhatInterestsYou() {
  // Set default selected option to "hotel"
  const [selectedOption, setSelectedOption] = useState<string>("hotel");
  const [citiesData, setCitiesData] = useState<any>();

  const handleButtonClick = (option: string) => {
    setSelectedOption(option);
  };

  const getAllCities = async () => {
    const res = await citieRepository.api.getCities();
    setCitiesData(res.data);
  };

  useEffect(() => {
    getAllCities();
  }, []);

  if (!citiesData) {
    return;
  }
  return (
    <div className={`${mediumMontserrat.className} flex flex-col gap-3`}>
      <span className="text-black font-semibold text-lg">
        Which one interests you?
      </span>

      {/* Trending */}
      <div className="flex items-center gap-5">
        <Button
          type={selectedOption === "hotel" ? "primary" : "default"}
          className={`${
            selectedOption === "hotel"
              ? "bg-RoyalAmethyst-700 text-white"
              : "border border-RoyalAmethyst-700 text-RoyalAmethyst-700"
          }`}
          onClick={() => handleButtonClick("hotel")}
        >
          Trending Hotel
        </Button>
        <Button
          type={selectedOption === "places" ? "primary" : "default"}
          className={`${
            selectedOption === "places"
              ? "bg-RoyalAmethyst-700 text-white"
              : "border border-RoyalAmethyst-700 text-RoyalAmethyst-700"
          }`}
          onClick={() => handleButtonClick("places")}
        >
          Trending Places
        </Button>
      </div>

      <div className="bg-white border-solid border-gray-200 border p-4 rounded-xl grid grid-cols-5 gap-4 justify-between">
        {(selectedOption === "hotel" ? citiesData : citiesData)
          .filter((item: any) => !item.name.includes("Kabupaten"))
          .sort(() => 0.5 - Math.random())
          .slice(0, 20)
          .map((item: any) => {
            const formattedName = item.name.replace(/^Kota\s/, "");
            return (
              <div key={item.id}>
                <Link
                  href={`/hotel/search/${formattedName.toLowerCase()}`}
                  className="text-black text-sm no-underline"
                >
                  {selectedOption === "hotel"
                    ? `Hotel in ${formattedName}`
                    : `Destination in ${formattedName}`}
                </Link>
              </div>
            );
          })}
      </div>
      {/* End Trending */}
    </div>
  );
}

const InterestData = [
  {
    title: "Jayapura",
    link: "/hotel/search/Jayapura",
  },
  {
    title: "Bali",
    link: "/hotel/search/Bali",
  },
  {
    title: "Yogyakarta",
    link: "/hotel/search/Yogyakarta",
  },
  {
    title: "Jakarta",
    link: "/hotel/search/Jakarta",
  },
  {
    title: "Surabaya",
    link: "/hotel/search/Surabaya",
  },
  {
    title: "Bandung",
    link: "/hotel/search/Bandung",
  },
  {
    title: "Medan",
    link: "/hotel/search/Medan",
  },
  {
    title: "Makassar",
    link: "/hotel/search/Makassar",
  },
  {
    title: "Semarang",
    link: "/hotel/search/Semarang",
  },
  {
    title: "Palembang",
    link: "/hotel/search/Palembang",
  },
  {
    title: "Batam",
    link: "/hotel/search/Batam",
  },
  {
    title: "Malang",
    link: "/hotel/search/Malang",
  },
  {
    title: "Lombok",
    link: "/hotel/search/Lombok",
  },
  {
    title: "Nusa Dua",
    link: "/hotel/search/Nusa-Dua",
  },
  {
    title: "Canggu",
    link: "/hotel/search/Canggu",
  },
  {
    title: "Pekanbaru",
    link: "/hotel/search/Pekanbaru",
  },
  {
    title: "Banjarmasin",
    link: "/hotel/search/Banjarmasin",
  },
];

const TrendingPlaces = [
  {
    title: "Bali",
    link: "/destination/search/Bali",
  },
  {
    title: "Yogyakarta",
    link: "/destination/search/Yogyakarta",
  },
  {
    title: "Jakarta",
    link: "/destination/search/Jakarta",
  },
  {
    title: "Surabaya",
    link: "/destination/search/Surabaya",
  },
  {
    title: "Bandung",
    link: "/destination/search/Bandung",
  },
  {
    title: "Medan",
    link: "/destination/search/Medan",
  },
  {
    title: "Makassar",
    link: "/destination/search/Makassar",
  },
  {
    title: "Semarang",
    link: "/destination/search/Semarang",
  },
  {
    title: "Palembang",
    link: "/destination/search/Palembang",
  },
  {
    title: "Batam",
    link: "/destination/search/Batam",
  },
];
