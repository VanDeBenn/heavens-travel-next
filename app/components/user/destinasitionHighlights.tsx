"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiNewShoot } from "react-icons/gi";
import Loading from "#/app/loading";

interface blogsWithDestinationOnly {
  id: string;
  title: string;
  pathPhoto: string;
  createdAt: string;
}

// Fungsi untuk mengacak array
const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...rest }) => rest);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function DestinationHighlights({ data }: any) {
  if (!data) {
    return <Loading />;
  }

  // Filter data untuk hanya menampilkan blog dengan destinasi
  const blogsWithDestinationOnly = data.filter(
    (item: { destination: any; hotel: null }) =>
      item.destination !== null && item.hotel === null
  );

  // Acak data dan ambil maksimal 4 elemen
  const randomizedBlogs = useMemo(
    () => shuffleArray(blogsWithDestinationOnly).slice(0, 4),
    [blogsWithDestinationOnly]
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-4">
        <GiNewShoot size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">Destination Highlights</span>
      </div>

      {/* Grid Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {randomizedBlogs.map((item: blogsWithDestinationOnly) => (
          <div key={item.id}>
            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden border-solid transition-transform duration-300">
              <Link href={`/blog/list/detail/${item.id}`}>
                <div className="relative w-full h-[400px]">
                  <Image
                    src={`http://localhost:3222/blogs/image/${item.pathPhoto}`} // Replace with item.pathPhoto jika path dinamis
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
                    href={""}
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
    </div>
  );
}
