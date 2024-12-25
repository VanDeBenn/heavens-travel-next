"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiHomeSmileLine } from "react-icons/ri";
import Loading from "#/app/loading";

// Fungsi untuk mengacak array
const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() })) // Menambahkan sortKey acak
    .sort((a, b) => a.sortKey - b.sortKey) // Mengurutkan berdasarkan sortKey
    .map(({ sortKey, ...rest }) => rest); // Menghapus sortKey setelah pengurutan
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function HotelHighlights({ data }: any) {
  if (!data) {
    return <Loading />;
  }

  const blogData = data;

  // Filter data untuk hanya menampilkan blog dengan hotel
  const blogsWithHotelOnly = blogData.filter(
    (item: { hotel: any; destination: null }) =>
      item.hotel !== null && item.destination === null
  );

  // Mengacak data dan mengambil maksimal 4 elemen
  const randomizedBlogs = useMemo(
    () => shuffleArray(blogsWithHotelOnly).slice(0, 4),
    [blogsWithHotelOnly]
  );

  return (
    <div className="pt-5">
      {/* Card News */}
      <div className="flex items-center mb-4">
        <RiHomeSmileLine size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">Hotel Highlights</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
        {randomizedBlogs.map((item: any) => (
          <div key={item.id}>
            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden border-solid transition-transform duration-300">
              <Link href={`/blog/list/detail/${item.id}`}>
                <div className="relative w-full h-[400px]">
                  <Image
                    src={`http://localhost:3222/photo-hotels/${item.pathPhoto}`} // Ganti dengan item.pathPhoto jika path dinamis
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
