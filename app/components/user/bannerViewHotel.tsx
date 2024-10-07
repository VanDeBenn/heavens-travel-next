"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import { RiStarFill } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});
export default function BannerViewHotel() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-6`}>
        {/* title sama address brok */}
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-lg">Wahid borobudur</span>
          <div className="flex gap-1">
            <RiStarFill className="text-[#FFD700]" />
            <RiStarFill className="text-[#FFD700]" />
            <RiStarFill className="text-[#FFD700]" />
            <RiStarFill className="text-[#FFD700]" />
            <RiStarFill className="text-[#FFD700]" />
          </div>
        </div>
        {/* end title sama address brok */}

        {/* deal */}
        <div className="flex justify-between items-center">
          <span className="text-xs">
            Street Medang Kamulan, Dusun Janan Borobudur, Borobudur, Magelang,
            Indonesia, 56553 -{" "}
            <Link
              href={"https://maps.app.goo.gl/o9cH4Qs4bRXWTbBy5"}
              className="text-[#4F28D9] no-underline"
            >
              SEE MAP
            </Link>
          </span>

          <div className="flex gap-2 items-center">
            <span className="text-xs ">Start from</span>
            <span className="text-[#DC143C] text-base font-semibold">
              Rp600.000
            </span>

            <div
              className="px-5 py-2 rounded-xl bg-[#4F28D9] cursor-pointer
            "
            >
              <span className="text-white">view this deal</span>
            </div>
          </div>
        </div>
        {/* end deal */}

        <div className="flex items-center gap-2 w-full pt-4">
          <div className="w-3/6">
            {images.slice(0, 1).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={200}
                height={390}
                className="rounded-xl w-full"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 w-3/6">
            {images.slice(1, 5).map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                width={350}
                height={190}
                className="rounded-xl w-full"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const images = [
  {
    src: "/images/illustration/luxury-bedroom.jpg",
    alt: "bedroom",
  },
  {
    src: "/images/illustration/luxury-bedroom.jpg",
    alt: "bedroom",
  },
  {
    src: "/images/illustration/luxury-bedroom.jpg",
    alt: "bedroom",
  },
  {
    src: "/images/illustration/luxury-bedroom.jpg",
    alt: "bedroom",
  },
  {
    src: "/images/illustration/luxury-bedroom.jpg",
    alt: "bedroom",
  },
  // Tambahkan objek gambar lain di sini
];
