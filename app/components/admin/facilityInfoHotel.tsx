"use client";

import { Montserrat } from "next/font/google";
import { GB, ID, MY } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { RiArrowDownSLine, RiSpeakLine, RiWifiFill } from "react-icons/ri";
import { Disclosure, Transition } from "@headlessui/react";
import { GiKnifeFork } from "react-icons/gi";
import { TbHeadset } from "react-icons/tb";
import { Switch as AntSwitch } from "antd";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const sections = [
  {
    title: "Language Spoken",
    icon: <RiSpeakLine className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { country: GB, name: "English" },
      { country: ID, name: "Indonesian" },
      { country: MY, name: "Malay" },
    ],
  },
  {
    title: "Internet",
    icon: <RiWifiFill className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { country: GB, name: "Free Wi-Fi" },
      { country: ID, name: "High-speed Internet" },
      { country: MY, name: "Internet Kiosk" },
    ],
  },
  {
    title: "Facility",
    icon: <GiKnifeFork className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { country: GB, name: "Restaurant" },
      { country: ID, name: "Gym" },
      { country: MY, name: "Swimming Pool" },
    ],
  },
  {
    title: "Service and Convenience",
    icon: <TbHeadset className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { country: GB, name: "24-hour Front Desk" },
      { country: ID, name: "Room Service" },
      { country: MY, name: "Concierge" },
    ],
  },
];

export default function FacilityInfoHotel() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div
        className={`${mediumMontserrat.className} pb-6 flex justify-between items-center `}
      >
        <span className="text-lg font-semibold">Facility Information</span>
        <div>
          <Link
            href={"/admin/hotels"}
            className="border-gray-300 hover:border-white border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 rounded-xl py-2 px-12 text-black hover:text-white text-center"
          >
            Edit Facility Information
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
                              <item.country
                                title="Country"
                                className="w-5 h-5"
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
}
