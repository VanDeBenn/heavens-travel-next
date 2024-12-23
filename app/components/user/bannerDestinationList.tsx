"use client";

import { Julee } from "next/font/google";
import { Montserrat } from "next/font/google";
import {
  RiSearchLine,
  RiMapPin2Fill,
  RiStarFill,
  RiStarHalfFill,
} from "react-icons/ri";
import { Input, Select, Button, Pagination } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const { Option } = Select;

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const JuleeNormal = Julee({
  subsets: ["latin"],
  weight: ["400"],
});

type HotelCard = {
  id: number;
  text: string;
  imgSrc: string;
  link: string;
  desc: string;
  loc: string;
  price: string;
  rating: number;
};

interface ComponentProps {
  data: any;
  location: string;
}
export default function BannerDestinationList({
  data,
  location,
}: ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const filteredDestinations = data?.filter((destination: any) => {
    const cityName = destination?.city?.name || "";
    const provinceName = destination?.city?.province?.name || "";

    // Filter berdasarkan lokasi
    const isLocationMatch =
      cityName === location ||
      cityName === `Kota ${location}` ||
      cityName === `Kota ${location} Utara` ||
      cityName === `Kota ${location} Timur` ||
      cityName === `Kota ${location} Selatan` ||
      cityName === `Kota ${location} Barat` ||
      cityName === `Kabupaten ${location}` ||
      provinceName === location;

    // Filter berdasarkan pencarian
    const isSearchQueryMatch = (destination.name?.toLowerCase() || "").includes(
      searchQuery.toLowerCase()
    );

    return isLocationMatch && isSearchQueryMatch;
  });

  console.log("filteredDestinations: ", filteredDestinations);

  return (
    <div className="flex flex-col">
      <div>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{ minHeight: "75vh" }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/illustration/bannerin.png')",
            }}
          ></div>
          <div className="absolute top-0 w-full h-full bg-black opacity-20"></div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full px-4 ml-auto mr-auto text-center">
                <div className="flex flex-col gap-1 z-10 text-white">
                  <span
                    className={`${mediumMontserrat.className} text-[35px] font-semibold text-center`}
                  >
                    find the best destination for you.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Pencarian */}
        <div className="relative -mt-36 z-10">
          <div className="py-12 px-28 2xl:px-48">
            <div className="border-solid border-gray-200 border bg-white rounded-xl px-5 py-3">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search destination"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-solid border-gray-200 border rounded-lg text-sm"
                />
                <Button
                  type="primary"
                  onClick={handleSearch}
                  className="bg-RoyalAmethyst-700 px-7 py-3 cursor-pointer rounded-lg flex items-center"
                >
                  <RiSearchLine className="text-white text-xl" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak bg-Lilac-50 di Bawah */}
        <div className="relative -mt-24 w-full">
          <div className="bg-Lilac-50 w-full rounded-t-[35px]">
            <div className="px-28 2xl:px-48 pt-16 pb-7 flex flex-col gap-16"></div>
          </div>
        </div>

        {/* Hasil Pencarian */}
        <div className="flex flex-col gap-6 px-28 2xl:px-48 pb-16">
          <div className="grid grid-cols-4 gap-4">
            {filteredDestinations?.map((card: any) => (
              <div
                key={card.id}
                className="h-full no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
              >
                <Link
                  href={`/destination/detail/${card?.id}`}
                  className="flex flex-col items-center"
                >
                  <Image
                    src={`http://localhost:3222/photo-destinations/${card?.photodestinations[0]?.pathPhoto}`}
                    alt={card.name}
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
                      href={`/destination/detail/${card?.id}`}
                      className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                    >
                      {card.name}
                    </Link>
                    <div className="flex gap-1 items-center">
                      {[...Array(5)].map((_, index) => (
                        <React.Fragment key={index}>
                          {index + 0.5 < card.rating ? (
                            <RiStarFill className="text-[#FFD700] text-lg" />
                          ) : index < card.rating ? (
                            <RiStarHalfFill className="text-[#FFD700] text-lg" />
                          ) : null}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <RiMapPin2Fill className="text-lg text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {card.city?.name}
                    </span>
                  </div>
                  <Link
                    href={`/destination/detail/${card?.id}`}
                    className="text-black text-base font-semibold no-underline leading-6"
                  >
                    {`${card.description.slice(0, 50)}...`}
                  </Link>
                  <div className="h-full relative bottom-0 right-0 flex justify-end">
                    <div className="flex gap-2 items-end">
                      <span className="text-gray-400 text-sm align-text-bottom">
                        Start from
                      </span>
                      <Link
                        href={`/destination/detail/${card?.id}`}
                        className="text-InfernoEcho-600 text-lg font-semibold no-underline"
                      >
                        Rp
                        {card.priceChildren
                          .toLocaleString("id-ID")
                          .replace(",", ".")}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredDestinations?.length || 0}
            onChange={handlePageChange}
            className="self-center bg-white border rounded-lg border-gray-200 border-solid"
          />
        </div>
      </div>
    </div>
  );
}
