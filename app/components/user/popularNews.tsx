"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { RiFireLine } from "react-icons/ri";
import Loading from "#/app/loading";
import { blogRepository } from "#/repository/blogs";

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

// // Fungsi untuk mengacak array
// const shuffleArray = (array: any[]) => {
//   return array
//     .map((item) => ({ ...item, sortKey: Math.random() }))
//     .sort((a, b) => a.sortKey - b.sortKey)
//     .map(({ sortKey, ...rest }) => rest);
// };

export default function PopularNews({ data }: { data: dataBlog[] }) {
  const [dataBlog, setDataBlog] = useState<any[]>([]);

  // // Acak data saat pertama kali dirender menggunakan useMemo
  // const shuffledData = useMemo(() => shuffleArray(data), [data]);

  // if (!data || data.length === 0) {
  //   return <Loading />;
  // }

  const fetchAllBlog = async () => {
    const res = await blogRepository.api.getBlogs();
    // console.log(res);
    setDataBlog(res.data);
  };

  useEffect(() => {
    fetchAllBlog();
  }, []);

  console.log("data:", dataBlog);
  return (
    <div className="">
      <div className="flex items-center mb-4">
        <RiFireLine size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">Popular</span>
      </div>
      <div className="bg-white rounded-xl">
      {dataBlog.sort(() => 0.5 - Math.random()).slice(0, 4).map((item: dataBlog) => (
          <div key={item.id} className="no-underline">
            <div className="p-3">
              <Link href={`/blog/list/detail/${item.id}`} className="rounded-lg h-60">
                <Image
                  src={"/images/illustration/hawaii-beach.jpg"}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-28 rounded-lg"
                />
              </Link>

              <div className="pt-3 flex flex-col">
                <Link
                  href={`/blog/list/detail/${item.id}`}
                  className="text-base font-semibold mb-1 leading-5 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                >
                  {item.title}
                </Link>
                <span className="text-sm text-gray-600 font-medium">
                  {`${formatDate(item.createdAt)}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
