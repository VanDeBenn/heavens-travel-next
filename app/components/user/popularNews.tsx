"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiFireLine } from "react-icons/ri";
import { popularNewsData } from "./news";
import Loading from "#/app/loading";
import Item from "antd/es/list/Item";

interface dataBlog {
id: string,
title: string,
pathPhoto: string,
createdAt: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function popularNews({data}:any) {
  if (!data) {
    return <Loading/>
  }
  return (
    <div className="">
      <div className="flex items-center mb-4">
        <RiFireLine size={26} color="#4F28D9" className="mr-2" />
        <span className="text-xl font-semibold">Popular</span>
      </div>
      <div className=" bg-white rounded-xl">
        {data.slice(0, 4).map((item:dataBlog) => (
          <div
            key={item.id}
            className="no-underline"
          >
            {/* Tambahkan Link di sekitar news card */}
            <div className="p-3">
              <Link
                href={''}
                className="rounded-lg h-60"
              >
                <Image
                  src={"/images/illustration/hawaii-beach.jpg"}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-28 rounded-lg"
                />
              </Link>

              <div className="pt-3 flex flex-col ">
                <Link
                  href={''}
                  //yang bener buat abang beckend
                  // href={`/news/popular/${index}`}
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
