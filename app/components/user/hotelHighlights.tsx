"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiHomeSmileLine } from "react-icons/ri";
import { GiNewShoot } from "react-icons/gi";

import { RiStarFill, RiDashboardHorizontalLine } from "react-icons/ri"; // Import ikon yang diinginkan
import { cardData } from "./news";
import Loading from "#/app/loading";

interface blogsWithHotelOnly {
  id: string;
  title: string;
  pathPhoto: string;
  createdAt: string;
}

// interface DataItem {
//   hotel: {
//     blogs: dataBlog[];
//   } | null;
//   destination: null | object;
// }

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function hotelHighlights({data}:any) {
  if (!data) {
    return <Loading/>
  }
  
  const blogData = data
  const blogsWithHotelOnly = blogData.filter((item: { hotel: any; destination: null; }) => item.hotel !== null && item.destination === null);

console.log(blogsWithHotelOnly);

  return (
    <div className="pt-5">
      {/* Card News */}
      <div className="flex items-center mb-4">
        <RiHomeSmileLine size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">Hotel Highlights</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {blogsWithHotelOnly.slice(0, 4).map((item:blogsWithHotelOnly) => (
          <div
            key={item.id}
            // href={card.link}
            //yang bener buat abang beckend
            // href={`/news/popular/${index}`}
          >
            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden border-solid transition-transform duration-300">
              <Link href={''}>
                <div className="relative w-full h-[400px]">
                  <Image
                    src={'/images/illustration/hawaii.jpg'}
                    alt={item.title}
                    // width={300}
                    // height={300}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0  rounded-xl "
                  />
                </div>
              </Link>
              <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-3 rounded-md border-solid border-gray-200 border">
                <div className="flex flex-col ">
                  <Link
                    href={''}
                    className="text-base font-semibold mb-1 leading-4 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                  >
                    {item.title}
                  </Link>
                  <span className="text-xs text-gray-600">
                  {`${formatDate(item.createdAt)}`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}