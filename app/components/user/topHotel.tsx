"use client";

import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { LiaBinocularsSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
  RiHotelLine,
  RiMapPin2Fill,
  RiStarFill,
  RiStarHalfFill,
} from "react-icons/ri";
import { Button } from "antd";
import React from "react";
import { hotelRepository } from "#/repository/hotels";
import { citieRepository } from "#/repository/cities";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

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

export default function TopHotel() {
  const [selectedCity, setSelectedCity] = useState<string>("Bali");
  const [hotelsData, setHotelsData] = useState<any[]>([]);

  const getAllHotels = async () => {
    const res = await hotelRepository.api.getHotels();
    setHotelsData(res.data);
  };

  const getAllCities = async () => {
    try {
      const res = await citieRepository.api.getCities();
      const randomCities = res.data
        .sort(() => 0.5 - Math.random())
        .slice(0, 8)
        .map((city: any) => city.name);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    getAllHotels(), getAllCities();
  }, []);

  // Filter hotels by selected city
  const filteredHotels = hotelsData.filter(
    (hotel: any) =>
      hotel?.city?.name === selectedCity ||
      hotel?.city?.name === `Kota ${selectedCity}` ||
      hotel?.city?.name === `Kabupaten ${selectedCity}` ||
      hotel?.city?.province?.name === selectedCity
  );

  const citiesList = ["Bali", "Bekasi", "Bandung", "Daerah Khusus Jakarta"]; // Define the cities explicitly

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div
          className={`${mediumMontserrat.className} flex items-center gap-2`}
        >
          <RiHotelLine className="text-3xl text-RoyalAmethyst-700" />
          <span className="text-xl font-semibold">
            Rest in the best hotel in every city
          </span>
        </div>
        <span className={`${mediumMontserrat.className} text-base text-black`}>
          Where luxury meets comfort and every moment is a memorable experience.
        </span>
      </div>

      <div
        className={`${mediumMontserrat.className} flex items-center gap-4 py-2 font-semibold`}
      >
        {citiesList.map((city) => (
          <Button
            key={city}
            type={selectedCity === city ? "primary" : "default"}
            onClick={() => setSelectedCity(city)}
            className={
              selectedCity === city
                ? "bg-RoyalAmethyst-700 text-white"
                : "border border-RoyalAmethyst-700 text-RoyalAmethyst-700"
            }
          >
            {city}
          </Button>
        ))}
      </div>

      {/* Grid cardcuyy */}
      <div className="grid grid-cols-4 gap-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.slice(0, 4).map((hotel) => (
            <div
              key={hotel.id}
              className="no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
            >
              <Link
                href={`/hotel/detail/${hotel.id}`}
                className="flex flex-col items-center"
              >
                <Image
                  src={`http://localhost:3222/photo-hotels/${hotel?.photohotels[0]?.pathPhoto}`}
                  alt={hotel.name}
                  className="h-52 w-full rounded-t-xl"
                  height={300}
                  width={300}
                />
              </Link>
              <div className="px-4 pb-2 flex flex-col gap-2">
                <div className="flex justify-between gap-1">
                  <Link
                    href={`/hotel/detail/${hotel.id}`}
                    className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                  >
                    {hotel.name}
                  </Link>
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <React.Fragment key={index}>
                        {index + 0.5 < hotel.stars ? (
                          <RiStarFill className="text-[#FFD700] text-lg" />
                        ) : index < hotel.stars ? (
                          <RiStarHalfFill className="text-[#FFD700] text-lg" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPin2Fill className="text-lg text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {hotel.city.name}
                  </span>
                </div>
                <Link
                  href={`/hotel/detail/${hotel.id}`}
                  className="text-black text-base font-semibold no-underline leading-6"
                >
                  {hotel.description}
                </Link>
                <div className="flex justify-end">
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-400 text-sm align-text-bottom">
                      Start from
                    </span>
                    <Link
                      href={`/hotel/detail/${hotel.id}`}
                      className="text-InfernoEcho-600 text-lg font-semibold no-underline"
                    >
                      {hotel?.roomhotels[0]?.price}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No hotels available for this city.
          </div>
        )}
      </div>
      {/* End cardcuyy */}

      <div
        className={`${mediumMontserrat.className} flex justify-center items-center pt-5`}
      >
        <Link
          href="/hotel"
          className="border-solid border-RoyalAmethyst-700 border hover:bg-RoyalAmethyst-700 hover:border-gray-300 transition-all duration-300 px-7 py-2 rounded-xl no-underline flex items-center group"
        >
          <span className="text-RoyalAmethyst-700 text-sm font-semibold group-hover:text-white transition-all duration-300 ">
            See more
          </span>
          <RiArrowRightSLine className="text-2xl text-RoyalAmethyst-700 group-hover:text-white transition-all duration-300 " />
        </Link>
      </div>
    </div>
  );
}
