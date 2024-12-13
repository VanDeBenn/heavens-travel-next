"use client";
import React, { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import Loading from "#/app/loading";
import { destinationRepository } from "#/repository/destinations";

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
  const [fallbackImages, setFallbackImages] = useState(descriptionDes[0].images || []);

  if (!data) {
    return <Loading />;
  }

  console.log("Data received:", data);

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
              fallbackImages.map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  height={400}
                  width={300}
                  className="w-full h-full object-cover rounded-xl"
                />
              ))
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

const descriptionDes = [
  {
    name: "Angel's Billabong",
    rating: 3,
    descriptions: [
      "Angel’s Billabong is one of the most iconic destinations in Nusa Penida, Bali.",
    ],
    images: [
      {
        src: "/images/illustration/property-map-entry.png",
        alt: "Property Map Entry",
        height: 200,
        width: 300,
      },
    ],
  },
];