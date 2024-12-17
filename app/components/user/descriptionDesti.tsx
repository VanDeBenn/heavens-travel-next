"use client";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import Loading from "#/app/loading";

interface DataDestination {
  data: {
    name: string;
    rating: number;
    description: string;
    pathLocation?: string;
  };
}

export default function DescriptionDesti({ data }: DataDestination) {
  const [loading, setLoading] = useState(false);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between gap-4">
      {/* Container Deskripsi */}
      <div className="bg-white rounded-xl border border-gray-200 w-2/3 border-solid">
        <div className={`${mediumMontserrat.className} p-6`}>
          <div>
            <div className="pb-4 flex items-center gap-3">
              <span className="text-lg font-semibold">{data.name}</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, index) =>
                  index < data.rating ? (
                    <RiStarFill key={index} className="text-[#FFD700]" />
                  ) : (
                    <RiStarLine key={index} className="text-[#FFD700]" />
                  )
                )}
              </div>
            </div>

            {/* Deskripsi */}
            <div className="text-sm">
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Container Peta */}
      <div className="bg-white rounded-xl border border-gray-200 border-solid w-1/3 flex-shrink-0 h-auto">
        <div className={`${mediumMontserrat.className} p-6 h-full`}>
          <div className="w-full h-full cursor-pointer">
            {data.pathLocation ? (
              <iframe
                src={data.pathLocation}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-lg text-gray-500 border-2 border-gray-300 rounded-xl">
                Not Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
