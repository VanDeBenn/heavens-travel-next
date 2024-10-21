"use client";
import { Montserrat } from "next/font/google";

import Link from "next/link";
import {
  RiArrowDownSLine,
  RiBus2Line,
  RiStore2Line,
  RiWifiFill,
} from "react-icons/ri";
import { Disclosure, Transition } from "@headlessui/react";
import { GiKnifeFork } from "react-icons/gi";
import { TbHeadset, TbMapPins } from "react-icons/tb";
import { Switch as AntSwitch } from "antd";
import { CiHospital1 } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { FaBuildingColumns } from "react-icons/fa6";
import { LuBird } from "react-icons/lu";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const sections = [
  {
    title: "Check-in/Check-out",
    icon: <GoPeople className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { icons: GoPeople, name: "14:20 " },
      { icons: GoPeople, name: " 20:00" },
    ],
  },
  {
    title: "Getting around",
    icon: <TbMapPins className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { icons: TbMapPins, name: "Free Wi-Fi" },
      { icons: TbMapPins, name: "High-speed Internet" },
    ],
  },
  {
    title: "The Property",
    icon: <FaBuildingColumns className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { icons: FaBuildingColumns, name: "Restaurant" },
      { icons: FaBuildingColumns, name: "Gym" },
    ],
  },
  {
    title: "Extra",
    icon: <LuBird className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { icons: LuBird, name: "Restaurant" },
      { icons: LuBird, name: "Gym" },
    ],
  },
];

const someHelpfulFacts: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div
        className={`${mediumMontserrat.className} pb-6 flex justify-between items-center `}
      >
        <span className="text-lg font-semibold">Some Helpful Facts</span>
        <div>
          <Link
            href={"/admin/hotels"}
            className="border-gray-300 hover:border-white border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 rounded-xl py-2 px-12 text-black hover:text-white text-center"
          >
            Edit Helpful Facts
          </Link>
        </div>
      </div>
      <div className="h-px bg-gray-300"></div>
      <div className="flex flex-col gap-5 pt-5">
        {sections.map((section, index) => (
          <div key={index}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-white border-none cursor-pointer px-0 w-full">
                    <div>
                      <div className="flex justify-between items-center pb-5">
                        <div className="flex gap-3 items-center">
                          <div className="border-solid rounded-full border border-RoyalAmethyst-700 flex items-center justify-center w-14 h-14">
                            {section.icon}
                          </div>
                          <div>
                            <span className="text-lg font-semibold text-black">
                              {section.title}
                            </span>
                          </div>
                        </div>
                        <div>
                          <RiArrowDownSLine
                            className={`text-2xl ${
                              open ? "rotate-180 duration-300" : "duration-300"
                            } `}
                          />
                        </div>
                      </div>
                      <div className="h-px bg-gray-300"></div>
                    </div>
                  </Disclosure.Button>
                  <Transition
                    enter="transition ease-out duration-300"
                    enterFrom="opacity -0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel
                      className={`${mediumMontserrat.className} text-gray-500 mt-3 ml-16 flex flex-col gap-3`}
                    >
                      {section.content.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-3 border-solid border rounded-lg border-gray-300 flex justify-between items-center"
                        >
                          <div className="flex flex-col gap-2 ">
                            <div className="flex items-center ">
                              <item.icons
                                title="Country"
                                className="w-5 h-5 text-RoyalAmethyst-700"
                              />
                              <span className="pl-2 text-xs sm:text-sm text-black font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <div>
                            <AntSwitch />
                          </div>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default someHelpfulFacts;
