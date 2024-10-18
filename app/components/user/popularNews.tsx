"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiFireLine } from "react-icons/ri";
import { popularNewsData } from "./news";

export default function popularNews() {
  return (
    <div className="">
      <div className="flex items-center mb-4">
        <RiFireLine size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">Popular</span>
      </div>
      <div className=" bg-white rounded-xl">
        {popularNewsData.slice(0, 4).map((news, index) => (
          <div
            key={index}
            className="no-underline"
          >
            {/* Tambahkan Link di sekitar news card */}
            <div className="p-3">
              <Link
                href={news.link}
                className="rounded-lg h-60"
              >
                <Image
                  src={news.imageSrc}
                  alt={news.title}
                  width={300}
                  height={300}
                  className="w-full h-28 rounded-lg"
                />
              </Link>

              <div className="pt-3 flex flex-col ">
                <Link
                  href={news.link}
                  //yang bener buat abang beckend
                  // href={`/news/popular/${index}`}
                  className="text-base font-semibold mb-1 leading-5 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                >
                  {news.title}
                </Link>
                <span className="text-sm text-gray-600 font-medium">
                  {news.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
