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
      <div className="space-y-2 bg-white rounded-xl">
        {popularNewsData.slice(0, 3).map((news, index) => (
          <Link
            key={index}
            //eample
            href={news.link}
            //yang bener buat abang beckend
            // href={`/news/popular/${index}`}
            className="no-underline"
          >
            {/* Tambahkan Link di sekitar news card */}
            <div className="relative overflow-hidden group p-3">
              <div className="relative w-full h-[170px] xl:h-[190px] overflow-hidden rounded-lg">
                <Image
                  src={news.imageSrc}
                  alt={news.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 transition-transform duration-300 transform"
                />
              </div>
              <div className="pt-3">
                <h2 className="text-base font-semibold mb-1 leading-5 text-black">
                  {news.title}
                </h2>
                <span className="text-sm text-gray-600 font-medium">
                  {news.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
