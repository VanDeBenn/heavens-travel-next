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
                  href={`/hotel/list/${formattedName.toLowerCase()}`}
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
    link: "/hotel/list/Jayapura",
  },
  {
    title: "Bali",
    link: "/hotel/list/Bali",
  },
  {
    title: "Yogyakarta",
    link: "/hotel/list/Yogyakarta",
  },
  {
    title: "Jakarta",
    link: "/hotel/list/Jakarta",
  },
  {
    title: "Surabaya",
    link: "/hotel/list/Surabaya",
  },
  {
    title: "Bandung",
    link: "/hotel/list/Bandung",
  },
  {
    title: "Medan",
    link: "/hotel/list/Medan",
  },
  {
    title: "Makassar",
    link: "/hotel/list/Makassar",
  },
  {
    title: "Semarang",
    link: "/hotel/list/Semarang",
  },
  {
    title: "Palembang",
    link: "/hotel/list/Palembang",
  },
  {
    title: "Batam",
    link: "/hotel/list/Batam",
  },
  {
    title: "Malang",
    link: "/hotel/list/Malang",
  },
  {
    title: "Lombok",
    link: "/hotel/list/Lombok",
  },
  {
    title: "Nusa Dua",
    link: "/hotel/list/Nusa-Dua",
  },
  {
    title: "Canggu",
    link: "/hotel/list/Canggu",
  },
  {
    title: "Pekanbaru",
    link: "/hotel/list/Pekanbaru",
  },
  {
    title: "Banjarmasin",
    link: "/hotel/list/Banjarmasin",
  },
];

const TrendingPlaces = [
  {
    title: "Bali",
    link: "/destination/list/Bali",
  },
  {
    title: "Yogyakarta",
    link: "/destination/list/Yogyakarta",
  },
  {
    title: "Jakarta",
    link: "/destination/list/Jakarta",
  },
  {
    title: "Surabaya",
    link: "/destination/list/Surabaya",
  },
  {
    title: "Bandung",
    link: "/destination/list/Bandung",
  },
  {
    title: "Medan",
    link: "/destination/list/Medan",
  },
  {
    title: "Makassar",
    link: "/destination/list/Makassar",
  },
  {
    title: "Semarang",
    link: "/destination/list/Semarang",
  },
  {
    title: "Palembang",
    link: "/destination/list/Palembang",
  },
  {
    title: "Batam",
    link: "/destination/list/Batam",
  },
];
