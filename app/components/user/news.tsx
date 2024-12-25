"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiNewspaperLine } from "react-icons/ri";
import PopularNews from "../../components/user/popularNews";
import Loading from "#/app/loading";

interface dataBlog {
  id: string;
  title: string;
  pathPhoto: string;
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
// const shuffleArray = (array: any[]) => {
//   return array
//     .map((item) => ({ ...item, sortKey: Math.random() }))
//     .sort((a, b) => a.sortKey - b.sortKey)
//     .map(({ sortKey, ...rest }) => rest);
// };

export default function News({ data }: any) {
  if (!data) {
    return <Loading />;
  }

  // Mengacak data sebelum ditampilkan
  // const shuffledData = shuffleArray(data);

  return (
    <div className="py-5 flex flex-col items-center">
      {/* News Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
        <div className="lg:col-span-4">
          <div className="flex items-center mb-4">
            <RiNewspaperLine size={26} color="#4F28D9" className="mr-2" />
            <span className="text-xl font-semibold">News</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
            {data
              .sort(() => 0.5 - Math.random())
              .slice(0, 8)
              .map((item: dataBlog) => (
                <div key={item.id}>
                  <div className="relative bg-white border border-gray-200 rounded-xl">
                    <Link href={`blog/list/detail/${item.id}`}>
                      <div className="relative w-full h-[400px]">
                        <Image
                          src={`http://localhost:3222/blogs/image/${item.pathPhoto}`}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                          className="absolute inset-0 rounded-xl"
                        />
                      </div>
                    </Link>

                    <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-3 rounded-md border-solid border-gray-200 border">
                      <div className="flex flex-col">
                        <Link
                          href={`blog/list/detail/${item.id}`}
                          className="text-base font-semibold mb-1 leading-4 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                        >
                          {item.title}
                        </Link>
                        <span className="text-xs text-gray-600">
                          {`${formatDate(item.createdAt)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* See More Button Section */}
          <div className="flex justify-center mt-6">
            <Link
              href={"/blog/list"}
              className="bg-[#ffffff] text-RoyalAmethyst-700 px-11 py-3 no-underline font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-RoyalAmethyst-700 hover:text-white shadow-lg"
            >
              See more
            </Link>
          </div>
        </div>

        {/* Popular News Section */}
        <div className="lg:col-span-1">
          <PopularNews data={data} />
        </div>
      </div>
    </div>
  );
}

export const cardData = [
  // ... (data card tetap sama seperti sebelumnya)
];

export const popularNewsData = [
  // ... (data popularNews tetap sama seperti sebelumnya)
];
