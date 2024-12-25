"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiStarFill, RiDashboardHorizontalLine } from "react-icons/ri"; // Import ikon yang diinginkan
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

// Fungsi untuk membatasi teks menjadi maksimal 20 kata
const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ");
};

export default function NewsHighlight({ data }: { data: dataBlog[] }) {
  if (!data || data.length === 0) {
    return <Loading />;
  }

  // Acak data hanya sekali saat komponen dirender
  const shuffledData = useMemo(() => shuffleArray(data), [data]);

  return (
    <div className="py-5">
      {/* News Highlight */}
      <div className="flex items-center mb-4">
        <RiDashboardHorizontalLine className="text-RoyalAmethyst-700 text-3xl mr-3" />
        <span className="text-xl font-bold">News Highlights</span>
      </div>

      <div className="bg-white rounded-xl">
        {shuffledData.slice(0, 1).map((item: dataBlog) => (
          <div key={item.id} className="flex gap-2 items-center">
            <Link
              href={`/blog/list/detail/${item.id}`}
              className="w-full no-underline"
            >
              <Image
                src={`http://localhost:3222/blogs/image/${item.pathPhoto}`}
                alt={item.title}
                width={800} // Ukuran gambar lebih besar
                height={400} // Ukuran gambar lebih besar
                objectFit="cover"
                className="w-full h-72 rounded-l-xl"
              />
            </Link>

            <div className="w-full md:w-7/12 p-4 flex flex-col">
              <Link
                href={`/blog/list/detail/${item.id}`}
                className="text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline text-2xl font-semibold mb-2 leading-7"
              >
                {item.title}
              </Link>

              <span className="text-sm text-gray-600 pb-3">
                {`${formatDate(item.createdAt)}`}
              </span>
              <Link
                href={`/blog/list/detail/${item.id}`}
                className="no-underline"
              >
                <span className="text-base text-gray-800">
                  {truncateText(item.description, 45)}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Card News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {shuffledData.slice(0, 4).map((item: dataBlog) => (
          <div key={item.id}>
            <div className="relative bg-white border border-gray-200 rounded-xl">
              <Link href={`/blog/list/detail/${item.id}`}>
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
                    href={`/blog/list/detail/${item.id}`}
                    className="text-base font-semibold mb-1 leading-4 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                  >
                    {item.title}
                  </Link>
                  <span className="text-xs text-gray-600">{`${formatDate(
                    item.createdAt
                  )}`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button See More */}
      <div className="flex justify-center mt-6">
        <Link
          href={"/blog/list"}
          className="bg-[#ffffff] text-RoyalAmethyst-700 px-11 py-3 no-underline font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-RoyalAmethyst-700 hover:text-white shadow-lg"
        >
          See more
        </Link>
      </div>
    </div>
  );
}
