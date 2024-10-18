"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import { GB, ID, MY } from "country-flag-icons/react/3x2";
import { FaWifi, FaHeadset, FaSwimmingPool, FaShower, FaDumbbell } from "react-icons/fa";
import { IoMdWifi } from "react-icons/io";
import { MdOutlineCellWifi, MdCurrencyExchange } from "react-icons/md";
import { PiOvenFill, PiCigaretteSlashDuotone } from "react-icons/pi";
import { TbAirConditioning, TbBed } from "react-icons/tb";
import { AiOutlineReconciliation } from "react-icons/ai";
import { GiHighGrass, GiBroom } from "react-icons/gi";
import { LuMonitorDot } from "react-icons/lu";

// Array dummy untuk data
const servicesAmenitiesData = {
  languages: [
    { icon: <GB title="United Kingdom" style={{ width: "19px", height: "19px" }} />, text: "English" },
    { icon: <ID title="Indonesia" style={{ width: "19px", height: "19px" }} />, text: "Indonesian" },
    { icon: <MY title="Malaysia" style={{ width: "19px", height: "19px" }} />, text: "Malay" },
  ],
  internet: [
    { icon: <FaWifi className="text-lg text-RoyalAmethyst-700" />, text: "Internet" },
    { icon: <IoMdWifi className="text-lg text-RoyalAmethyst-700" />, text: "Free Wi-Fi in all rooms" },
    { icon: <MdOutlineCellWifi className="text-lg text-RoyalAmethyst-700" />, text: "Wi-Fi in public areas" },
  ],
  facilities: [
    { icon: <FaHeadset className="text-lg text-RoyalAmethyst-700" />, text: "Receptionist 24h" },
    { icon: <PiOvenFill className="text-lg text-RoyalAmethyst-700" />, text: "Kitchen" },
    { icon: <FaSwimmingPool className="text-lg text-RoyalAmethyst-700" />, text: "Swimming Pool" },
    { icon: <FaShower className="text-lg text-RoyalAmethyst-700" />, text: "Shower" },
    { icon: <FaDumbbell className="text-lg text-RoyalAmethyst-700" />, text: "Gym" },
    { icon: <PiCigaretteSlashDuotone className="text-lg text-RoyalAmethyst-700" />, text: "Smoking Room" },
    { icon: <TbBed className="text-lg text-RoyalAmethyst-700" />, text: "SPA Room" },
  ],
  servicesConveniences: [
    { icon: <TbAirConditioning className="text-lg text-RoyalAmethyst-700" />, text: "Air Conditioning in public area" },
    { icon: <AiOutlineReconciliation className="text-lg text-RoyalAmethyst-700" />, text: "Concierge" },
    { icon: <GiHighGrass className="text-lg text-RoyalAmethyst-700" />, text: "Terrace" },
    { icon: <MdCurrencyExchange className="text-lg text-RoyalAmethyst-700" />, text: "Currency exchange" },
    { icon: <GiBroom className="text-lg text-RoyalAmethyst-700" />, text: "Daily housekeeping" },
    { icon: <LuMonitorDot className="text-lg text-RoyalAmethyst-700" />, text: "Internet service" },
  ],
};

export default function ServicesAmenities() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border ">
      <div className={`${mediumMontserrat.className} p-6`}>
        <div className="pb-4">
          <span className="text-base font-semibold">Service & Amenities</span>
        </div>
        <div className="border border-gray-300 border-dashed h-0"></div>

        <div className="pt-4">
          <div className="grid grid-cols-3 justify-items-between">
            <div>
              <span className="font-semibold text-sm">Languages spoken</span>
              <div className="flex flex-col gap-2 pt-2">
                {servicesAmenitiesData.languages.map((item, index) => (
                  <div key={index} className="flex items-center ">
                    {item.icon}
                    <span className="pl-2 text-xs sm:text-sm text-black">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <span className="font-semibold text-sm">Internet</span>
                <div className="flex flex-col gap-2 pt-2">
                  {servicesAmenitiesData.internet.map((item, index) => (
                    <div key={index} className="flex items-center ">
                      {item.icon}
                      <span className="pl-2 text-xs sm:text-sm text-black">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <span className="font-semibold text-sm">Facilities</span>
              <div className="flex flex-col gap-2 pt-2">
                {servicesAmenitiesData.facilities.map((item, index) => (
                  <div key={index} className="flex items-center ">
                    {item.icon}
                    <span className="pl-2 text-xs sm:text-sm text-black">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-sm">Service and conveniences</span>
              <div className="flex flex-col gap-2 pt-2">
                {servicesAmenitiesData.servicesConveniences.map((item, index) => (
                  <div key={index} className="flex items-center ">
                    {item.icon}
                    <span className="pl-2 text-xs sm:text-sm text-black">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mengatur font Montserrat
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
