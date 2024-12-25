"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiPuzzleLine } from "react-icons/ri";
import { GiNewShoot } from "react-icons/gi";

import { RiStarFill, RiDashboardHorizontalLine } from "react-icons/ri"; // Import ikon yang diinginkan
import { cardData } from "./news";
import Loading from "#/app/loading";

interface dataBlog {
  id: string;
  title: string;
  pathPhoto: string;
  description: string;
  createdAt: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Fungsi untuk mengacak array
const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...rest }) => rest);
};

export default function moreNews({ data }: {
  data: dataBlog[] }) {
  if (!data || data.length === 0) {
    return <Loading />;
  }

  const shuffledData = useMemo(() => shuffleArray(data), [data]);

  return (
    <div className="pt-5">
      <div className="flex items-center mb-4">
        <RiPuzzleLine size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">More News</span>
      </div>

      <div>
        <div className=" grid grid-cols-2 gap-5">
          {shuffledData.slice(0, 8).map((item:dataBlog) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 items-center bg-white rounded-xl "
            >
              <Link href={`/blog/list/detail/${item.id}`} className="w-full ">
                <Image
                  src={`http://localhost:3222/photo-hotels/${item.pathPhoto}`}
                  alt={item.title}
                  width={800}
                  height={400}
                  objectFit="cover"
                  className="w-full h-40 rounded-xl"
                />
              </Link>
              <div className="w-full flex flex-col">
                <Link
                  href={`/blog/list/detail/${item.id}`}
                  className="text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline text-xl font-semibold leading-6"
                >
                  {item.title}
                </Link>

                <span className="text-sm text-gray-600 pb-3">
                {`${formatDate(item.createdAt)}`}
              </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Link
          href={"/blog/list"}
          className="bg-[#ffffff] text-RoyalAmethyst-700 px-11 py-3 no-underline font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-RoyalAmethyst-700 hover:text-white shadow-lg"
        >
          Load more
        </Link>
      </div>
    </div>
  );
}
