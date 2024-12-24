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
import { destinationRepository } from "#/repository/destinations";
import { citieRepository } from "#/repository/cities";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

type DestiData = {
  id: number;
  text: string;
  imgSrc: string;
  link: string;
  desc: string;
  loc: string;
  price: string;
  stars: number;
};

export default function UnforgettableExperience() {
  const [selectedCity, setSelectedCity] = useState("Bali");
  const [destinationsData, setDestinationsData] = useState<any>();

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const getAllDestinations = async () => {
    const res = await destinationRepository.api.getDestinations();
    setDestinationsData(res.body.data);
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
    getAllDestinations();
    getAllCities();
  }, []);

  // Filter hotels by selected city
  const filteredHotels = destinationsData?.filter(
    (destination: any) =>
      destination?.city?.name === selectedCity ||
      destination?.city?.name === `Kota ${selectedCity}` ||
      destination?.city?.name === `Kabupaten ${selectedCity}` ||
      destination?.city?.province?.name === selectedCity
  );

  const citiesList = [
    "Bali",
    "Jawa Tengah",
    "Jawa Timur",
    "Daerah Khusus Jakarta",
  ]; // Define the cities explicitly

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div
          className={`${mediumMontserrat.className} flex items-center gap-2`}
        >
          <LiaBinocularsSolid className="text-3xl text-RoyalAmethyst-700" />
          <span className="text-xl font-semibold">
            Create an unforgettable experience
          </span>
        </div>
        <span className={`${mediumMontserrat.className} text-base text-black`}>
          exploring Bali&apos;s stunning landscapes, rich culture, and pristine
          beaches.
        </span>
      </div>

      <div
        className={`${mediumMontserrat.className} flex items-center gap-4 py-2 font-semibold`}
      >
        {citiesList.map((city) => (
          <Button
            key={city}
            type={selectedCity === city ? "primary" : "default"}
            onClick={() => handleCityChange(city)}
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
        {filteredHotels?.length > 0 ? (
          filteredHotels.slice(0, 4).map((card: any) => (
            <div
              key={card?.id}
              className="h-full no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
            >
              <Link
                href={`destination/detail/${card?.id}`}
                className="flex flex-col items-center"
              >
                <Image
                  src={`http://localhost:3222/photo-destinations/${card?.photodestinations[0]?.pathPhoto}`}
                  alt={card?.name}
                  className="h-52 w-full rounded-t-xl"
                  height={300}
                  width={300}
                />
              </Link>
              <div
                className={`${mediumMontserrat.className} h-full px-4 pb-2 flex flex-col gap-2`}
              >
                <div className="flex justify-between gap-1">
                  <Link
                    href={`destination/detail/${card?.id}`}
                    className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                  >
                    {card?.name}
                  </Link>
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <React.Fragment key={index}>
                        {index + 0.5 < card?.rating ? (
                          <RiStarFill className="text-[#FFD700] text-lg" />
                        ) : index < card?.rating ? (
                          <RiStarHalfFill className="text-[#FFD700] text-lg" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPin2Fill className="text-lg text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {card?.city?.name}
                  </span>
                </div>
                <Link
                  href={`destination/detail/${card?.id}`}
                  className="text-black text-base font-semibold no-underline leading-6"
                >
                  {`${card?.description.slice(0, 50)}...`}
                </Link>
                <div className="h-full flex justify-end">
                  <div className="flex gap-2 items-end">
                    <span className="text-gray-400 text-sm align-text-bottom ">
                      Start from
                    </span>
                    <Link
                      href={`destination/detail/${card?.id}`}
                      className="text-InfernoEcho-600 text-lg font-semibold no-underline"
                    >
                      Rp
                      {(card?.priceChildren)
                        .toLocaleString("id-ID")
                        .replace(",", ".")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No Destinations available for this city.
          </div>
        )}
      </div>
      {/* End cardcuyy */}

      <div
        className={`${mediumMontserrat.className} flex justify-center items-center pt-5`}
      >
        <Link
          href="/destination"
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

const cityData: { [key: string]: DestiData[] } = {
  Bali: [
    {
      id: 1,
      text: "Kuta",
      imgSrc: "/images/illustration/tirtagangga-water-palace.jpg",
      link: "/destination/kota/bali",
      desc: "stunning cliffs, pristine beaches, crystal-clear waters.",
      loc: "Bali",
      price: "Rp290.000",
      stars: 4.5,
    },
    {
      id: 2,
      text: "Nusa Dua",
      imgSrc: "/images/illustration/kelingking-beach-nusa-penida.jpg",
      link: "/destination/kota/bali",
      desc: "A luxurious and elegant hotel, offering unrivaled comfort.",
      loc: "Bali",
      price: "Rp320.000",
      stars: 4,
    },
    {
      id: 3,
      text: "Tanah Lot",
      imgSrc: "/images/illustration/tanah-lot-temple.jpg",
      link: "/destination/kota/bali",
      desc: "stunning cliffs, pristine beaches, crystal-clear waters.",
      loc: "Bali",
      price: "Rp340.000",
      stars: 2.5,
    },
    {
      id: 4,
      text: "Lempuyang Luhur ",
      imgSrc: "/images/illustration/candi-bentar-pura-penataran-agung.jpeg",
      link: "/destination/kota/bali",
      desc: "stunning cliffs, pristine beaches, crystal-clear waters.",
      loc: "Bali",
      price: "Rp310.000",
      stars: 4,
    },
    {
      id: 5,
      text: "Seminyak",
      imgSrc: "/images/illustration/entrance-beach-indonesia.jpg",
      link: "/destination/kota/bali",
      desc: "stunning cliffs, pristine beaches, crystal-clear waters.",
      loc: "Bali",
      price: "Rp300.000",
      stars: 3.5,
    },
    {
      id: 6,
      text: "Tegenungan",
      imgSrc: "/images/illustration/waterfall-cayambe.jpg",
      link: "/destination/kota/bali",
      desc: "stunning cliffs, pristine beaches, crystal-clear waters.",
      loc: "Bali",
      price: "Rp340.000",
      stars: 4.5,
    },
    {
      id: 7,
      text: "Penida island",
      imgSrc: "/images/illustration/nusa-penida-island-bali-indonesia.jpg",
      link: "/destination/kota/bali",
      desc: "stunning cliffs, pristine beaches, crystal-clear waters.",
      loc: "Bali",
      price: "Rp310.000",
      stars: 4,
    },
    {
      id: 8,
      text: "Sacred Monkey Forest",
      imgSrc: "/images/illustration/macaca-mulatta-monkey-nature.jpg",
      link: "/destination/kota/bali",
      desc: "stunning cliffs, pristine beaches, crystal-clear waters.",
      loc: "Bali",
      price: "Rp300.000",
      stars: 3.5,
    },
  ],
  Manila: [
    {
      id: 1,
      text: "Manila Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/manila",
      desc: "Experience the vibrant culture of Manila.",
      loc: "Manila",
      price: "Rp320.000",
      stars: 4,
    },
    {
      id: 2,
      text: "Rizal Park Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/manila",
      desc: "Stay near Rizal Park.",
      loc: "Manila",
      price: "Rp340.000",
      stars: 4.2,
    },
    {
      id: 3,
      text: "New World Manila Bay Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/manila",
      desc: "Luxury at Manila Bay.",
      loc: "Manila",
      price: "Rp400.000",
      stars: 4.8,
    },
    {
      id: 4,
      text: "Sofitel Manila",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/manila",
      desc: "Elegance by the bay.",
      loc: "Manila",
      price: "Rp370.000",
      stars: 4.3,
    },
    {
      id: 5,
      text: "Red Planet Manila",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/manila",
      desc: "Affordable stays in Manila.",
      loc: "Manila",
      price: "Rp250.000",
      stars: 3.9,
    },
    {
      id: 6,
      text: "Okada Manila",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/manila",
      desc: "Experience luxury at Okada.",
      loc: "Manila",
      price: "Rp480.000",
      stars: 5,
    },
  ],
  Bangkok: [
    {
      id: 1,
      text: "Bangkok Marriott Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/bangkok",
      desc: "Luxury and culture in the heart of Bangkok.",
      loc: "Bangkok",
      price: "Rp310.000",
      stars: 4.5,
    },
    {
      id: 2,
      text: "Mandarin Oriental Bangkok",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/bangkok",
      desc: "Heritage meets luxury.",
      loc: "Bangkok",
      price: "Rp550.000",
      stars: 5,
    },
    {
      id: 3,
      text: "Chatrium Hotel Riverside",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/bangkok",
      desc: "Riverside luxury.",
      loc: "Bangkok",
      price: "Rp450.000",
      stars: 4.6,
    },
    {
      id: 4,
      text: "The Peninsula Bangkok",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/bangkok",
      desc: "Stay by the river.",
      loc: "Bangkok",
      price: "Rp530.000",
      stars: 4.9,
    },
    {
      id: 5,
      text: "Siam Kempinski Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/bangkok",
      desc: "Luxury near Siam.",
      loc: "Bangkok",
      price: "Rp500.000",
      stars: 4.8,
    },
  ],
  Singapore: [
    {
      id: 1,
      text: "Marina Bay Sands",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/singapore",
      desc: "The iconic luxury resort in Singapore.",
      loc: "Singapore",
      price: "Rp450.000",
      stars: 5,
    },
    {
      id: 2,
      text: "Raffles Singapore",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/singapore",
      desc: "Historic luxury in Singapore.",
      loc: "Singapore",
      price: "Rp600.000",
      stars: 5,
    },
    {
      id: 3,
      text: "Shangri-La Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/singapore",
      desc: "An oasis of serenity.",
      loc: "Singapore",
      price: "Rp420.000",
      stars: 4.7,
    },
    {
      id: 4,
      text: "Fullerton Bay Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/singapore",
      desc: "Luxury by the bay.",
      loc: "Singapore",
      price: "Rp480.000",
      stars: 4.9,
    },
    {
      id: 5,
      text: "Hotel Jen Orchardgateway",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/singapore",
      desc: "Convenient and stylish.",
      loc: "Singapore",
      price: "Rp300.000",
      stars: 4.2,
    },
    {
      id: 6,
      text: "Crowne Plaza Changi Airport",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/destination/kota/singapore",
      desc: "Convenient for travelers.",
      loc: "Singapore",
      price: "Rp390.000",
      stars: 4.5,
    },
  ],
};
