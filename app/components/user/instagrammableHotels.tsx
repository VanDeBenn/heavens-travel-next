"use client";

import Loading from "#/app/loading";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import {
  RiMapPin2Fill,
  RiStarFill,
  RiStarHalfFill,
  RiBuilding3Line,
  RiStarLine,
} from "react-icons/ri";

interface dataDestination {
  id: string;
  name: string;
  pathPhoto: string;
  createdAt: string;
  city: dataCity;
}

interface dataCity {
  id: string;
  name: string;
  hotels: dataHotel[];
}

interface dataHotel {
  id: string;
  name: string;
  rating: number;
  photohotels: dataPhotoHotel[];
  description: string;
  price: dataRoomHotel;
}

interface dataRoomHotel {
  id: string;
  price: number;
}

interface dataPhotoHotel {
  id: string;
  pathPhoto: string;
}

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function InstagrammableHotels({
  data,
}: {
  data: dataDestination;
}) {

  if (!data) {
    return <Loading />;
  }
  
  // console.log(data)
  // console.log(data.city.hotels[0].description)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div
          className={`${mediumMontserrat.className} flex items-center gap-2`}
        >
          <RiBuilding3Line className="text-3xl text-RoyalAmethyst-700" />
          <span className="text-xl font-semibold">
            Popular Instagrammable Hotels in {data.city.name || "Unknown City"}
          </span>
        </div>
      </div>

      {/* Grid card */}
      <div className="grid grid-cols-4 gap-4">
        {data.city.hotels
          .sort(() => 0.5 - Math.random()) 
          .slice(0, 4) 
          .map((hotel) => (
            <div
              key={hotel.id}
              className="no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
            >
              <Link
                href={`/hotel/detail/${hotel.id}`}
                className="flex flex-col items-center"
              >
                <Image
                  src={
                    hotel.photohotels && hotel.photohotels.length > 0
                      ? hotel.photohotels[0].pathPhoto
                      : "/images/placeholder.png"
                  }
                  alt={hotel.name}
                  className="h-52 w-full rounded-t-xl object-cover"
                  height={300}
                  width={300}
                />
              </Link>
              <div
                className={`${mediumMontserrat.className} px-4 pb-2 flex flex-col gap-2`}
              >
                <div className="flex justify-between gap-1">
                  <Link
                    href={`/hotel/detail/${hotel.id}`}
                    className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                  >
                    {hotel.name}
                  </Link>
                  <div className="flex gap-1 items-center">
                    {/* Render rating with stars */}
                    {Array.from({ length: 5 }, (_, index) => {
                      if (index < Math.floor(hotel.rating)) {
                        return (
                          <RiStarFill
                            key={index}
                            className="text-[#FFD700] text-lg"
                          />
                        );
                      } else if (index < hotel.rating) {
                        return (
                          <RiStarHalfFill
                            key={index}
                            className="text-[#FFD700] text-lg"
                          />
                        );
                      } else {
                        return (
                          <RiStarLine
                            key={index}
                            className="text-[#FFD700] text-lg"
                          />
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPin2Fill className="text-lg text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {data.city.name || "No description available"}
                  </span>
                </div>
                <div className="text-black text-base font-semibold no-underline leading-6">
                {hotel?.description
                    ? hotel.description
                        .replace(/[.,]/g, "")
                        .split(" ")
                        .slice(0, 12)
                        .join(" ")
                    : "No description available"}
                </div>
                <div className="flex justify-end">
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-400 text-sm align-text-bottom">
                      Start from
                    </span>
                    <span className="text-InfernoEcho-600 text-lg font-semibold">
                      {hotel.price && hotel.price.price
                        ? `Rp${hotel.price.toLocaleString()}`
                        : "Price not available"}
                    </span>
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
