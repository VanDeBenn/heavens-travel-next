"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import { RiStore2Line, RiBusFill } from "react-icons/ri";
import { FaRegHospital } from "react-icons/fa";

export default function AboutNearbyLocation() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-6`}>
        {AboutNearbyLocations.sections
          .slice(0, 1)
          .map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <span className="font-semibold text-base">{section.title}</span>
              {section.data.map((item, index) => (
                <div key={index} className="pt-2">
                  <span className="text-xs sm:text-sm text-black">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          ))}

        {/* grid dengan 3 kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {AboutNearbyLocations.sections
            .slice(1)
            .map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <span className="font-semibold text-sm">{section.title}</span>
                <div className="flex flex-col gap-2 pt-2">
                  {section.data.map((item, index) => (
                    <div key={index} className="flex">
                      {"icon" in item && item.icon}
                      <div className="flex flex-col gap-1 pl-2">
                        <span className="text-xs sm:text-sm text-black">
                          {item.text}
                        </span>
                        {"distance" in item && (
                          <span className="text-xs sm:text-sm text-black">
                            {item.distance}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {/* end grid dengan 3 kolom */}
      </div>
    </div>
  );
}

// font Montserrat
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

// Array data untuk lokasi, transportasi, rumah sakit, dan toko terdekat, termasuk judul rawr
const AboutNearbyLocations = {
  sections: [
    {
      title: "Location",
      data: [
        {
          text: "Street Medang Kamulan, Dusun Janan Borobudur, Borobudur, Magelang, Indonesia, 56553",
        },
      ],
    },
    {
      title: "Public transportation",
      data: [
        {
          icon: <RiBusFill className="text-lg text-RoyalAmethyst-700" />,
          text: "Terminal Tidar Magelang",
          distance: "7.4 km",
        },
        {
          icon: <RiBusFill className="text-lg text-RoyalAmethyst-700" />,
          text: "Terminal Bus Kebonbolo",
          distance: "10.4 km",
        },
      ],
    },
    {
      title: "Hospital or clinic",
      data: [
        {
          icon: <FaRegHospital className="text-lg text-RoyalAmethyst-700" />,
          text: "Laboratorium Kesehatan Masyarakat",
          distance: "11.4 km",
        },
        {
          icon: <FaRegHospital className="text-lg text-RoyalAmethyst-700" />,
          text: "Soerojo Hospital",
          distance: "5.4 km",
        },
      ],
    },
    {
      title: "Nearby Stores",
      data: [
        {
          icon: <RiStore2Line className="text-lg text-RoyalAmethyst-700" />,
          text: "Alfamart",
          distance: "12.4 km",
        },
        {
          icon: <RiStore2Line className="text-lg text-RoyalAmethyst-700" />,
          text: "Indomaret",
          distance: "12.4 km",
        },
      ],
    },
  ],
};
