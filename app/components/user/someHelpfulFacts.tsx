"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import {
  RiStore2Line,
  RiBusFill,
  RiCustomerService2Line,
  RiCarFill,
  RiHotelLine,
  RiKey2Fill,
  RiParkingBoxLine,
  RiWifiFill,
} from "react-icons/ri";
import { FaRegHospital } from "react-icons/fa";
import { TbMapPins, TbWavesElectricity } from "react-icons/tb";
import { SiHomeassistant, SiLevelsdotfyi } from "react-icons/si";

export default function someHelpfulFacts() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      {" "}
      <div className={`${mediumMontserrat.className} p-6`}>
        {" "}
        <div className="pb-4">
          <span className="text-base font-semibold">Some helpful facts</span>
        </div>
        <div className="border border-gray-300 border-dashed h-0"></div>
        {/* grid dengan 3 kolom */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          {AboutNearbyLocations.sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <span className="font-semibold text-sm">{section.title}</span>
              <div className="flex flex-col gap-2 pt-2">
                {section.data.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {"icon" in item && item.icon}
                    <div className="pl-2">
                      <span className="text-xs sm:text-sm text-black">
                        {item.text}
                      </span>
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
      title: "The property",
      data: [
        {
          icon: <TbWavesElectricity className="text-lg text-[#4F28D9]" />,
          text: "Room voltage: 300",
        },
        {
          icon: <SiLevelsdotfyi className="text-lg text-[#4F28D9]" />,
          text: "Number of floors; 2",
        },
        {
          icon: <SiHomeassistant className="text-lg text-[#4F28D9]" />,
          text: "Year property opened: 2012",
        },
        {
          icon: <RiKey2Fill className="text-lg text-[#4F28D9]" />,
          text: "Number of rooms: 23",
        },
      ],
    },

    {
      title: "Getting around",
      data: [
        {
          icon: <RiCarFill className="text-lg text-[#4F28D9]" />,
          text: "Airport transfer fee: Rp300.000",
        },
        {
          icon: <RiHotelLine className="text-lg text-[#4F28D9]" />,
          text: "Distance from city center: 0,5 km",
        },
        {
          icon: <TbMapPins className="text-lg text-[#4F28D9]" />,
          text: "Travel time to airport (minutes): 40 minutes",
        },
      ],
    },
    {
      title: "Check-in/Check-out time",
      data: [
        {
          icon: <RiCustomerService2Line className="text-lg text-[#4F28D9]" />,
          text: "Check-in from : 14:22",
        },
        {
          icon: <RiCustomerService2Line className="text-lg text-[#4F28D9]" />,
          text: "Check-out until : 23:22",
        },
      ],
    },
    {
      title: "Extra",
      data: [
        {
          icon: <RiParkingBoxLine className="text-lg text-[#4F28D9]" />,
          text: "Daily parking: FREE",
        },
        {
          icon: <RiWifiFill className="text-lg text-[#4F28D9]" />,
          text: "Daily internet/Wifi: FREE",
        },
      ],
    },
  ],
};
