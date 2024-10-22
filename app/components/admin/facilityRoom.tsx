"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import {
  RiArrowDownSLine,
  RiBus2Line,
  RiStore2Line,
  RiWifiFill,
} from "react-icons/ri";
import { GiKnifeFork } from "react-icons/gi";
import { TbHeadset } from "react-icons/tb";
import { Switch as AntSwitch } from "antd";
import { CiHospital1 } from "react-icons/ci";
import { useState } from "react";
import { SiPrivateinternetaccess } from "react-icons/si";
import { TbAirConditioning } from "react-icons/tb";
import { MdBathtub } from "react-icons/md";
import { LiaToiletPaperSolid } from "react-icons/lia";
import { RxStack } from "react-icons/rx";
import { FaPhoneVolume } from "react-icons/fa6";
import { LuSofa } from "react-icons/lu";
import { MdOutlineConnectedTv } from "react-icons/md";
import { GiWindow, GiSlippers } from "react-icons/gi";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const sections = [
  {
    icon: (
      <SiPrivateinternetaccess className="text-2xl text-RoyalAmethyst-700" />
    ),
    content: [{ name: "Private bathroom" }],
  },
  {
    icon: <TbAirConditioning className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Air conditioning" }],
  },
  {
    icon: <MdBathtub className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Shower" }],
  },
  {
    icon: <LiaToiletPaperSolid className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Toiletries" }],
  },
  {
    icon: <RxStack className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Towels" }],
  },
  {
    icon: <LuSofa className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Sofa" }],
  },
  {
    icon: <FaPhoneVolume className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Telephone" }],
  },
  {
    icon: <MdOutlineConnectedTv className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Television" }],
  },
  {
    icon: <GiWindow className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Outdoor view" }],
  },
  {
    icon: <GiSlippers className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ name: "Slippers" }],
  },
];

export default function FacilityRoom() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div
        className={`${mediumMontserrat.className} pb-4 flex justify-between items-center`}
      >
        <span className="text-lg font-semibold">Amenities</span>
      </div>

      <div className="flex flex-col gap-5 pt-5">
        {sections.map((section, index) => (
          <div key={index}>
            <div className="bg-white border-none px-0 w-full">
              <div>
                <div className="flex justify-between items-center ">
                  <div className="flex gap-3 items-center w-full">
                    <div className="border-solid rounded-full border border-RoyalAmethyst-700 flex items-center justify-center w-14 h-14">
                      {section.icon}
                    </div>
                    <div
                      className={`${mediumMontserrat.className} text-gray-500  w-full flex flex-col gap-3`}
                    >
                      {section.content.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-3 border-solid border rounded-lg border-gray-300 flex justify-between items-center  w-full"
                        >
                          <span className=" text-xs sm:text-sm text-black font-semibold">
                            {item.name}
                          </span>

                          <div>
                            <AntSwitch />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
