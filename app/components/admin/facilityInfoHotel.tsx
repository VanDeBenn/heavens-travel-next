"use client";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { Switch as AntSwitch } from "antd";
import { Disclosure, Transition } from "@headlessui/react";
import { RiArrowDownSLine, RiSpeakLine, RiWifiFill } from "react-icons/ri";
import { GiKnifeFork } from "react-icons/gi";
import { TbHeadset, TbAirConditioning } from "react-icons/tb";
import GBFlagIcon from "country-flag-icons/react/3x2/GB";
import IDFlagIcon from "country-flag-icons/react/3x2/ID";
import MYFlagIcon from "country-flag-icons/react/3x2/MY";
import {
  MdOutlineSettingsInputAntenna,
  MdOutlineMicrowave,
  MdOutlineBathtub,
  MdDeck,
  MdCleaningServices,
  MdRouter,
} from "react-icons/md";
import { IoIosCellular } from "react-icons/io";
import {
  FaHeadset,
  FaSwimmingPool,
  FaDumbbell,
  FaSpa,
  FaUserTie,
} from "react-icons/fa";
import { PiCigarette } from "react-icons/pi";
import { BsCurrencyExchange } from "react-icons/bs";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const sections = [
  {
    title: "Language Spoken",
    icon: <RiSpeakLine className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 1, icons: GBFlagIcon, name: "English" },
      { id: 2, icons: IDFlagIcon, name: "Indonesian" },
      { id: 3, icons: MYFlagIcon, name: "Malay" },
    ],
  },
  {
    title: "Internet",
    icon: <RiWifiFill className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 4, icons: RiWifiFill, name: "Internet" },
      {
        id: 5,
        icons: MdOutlineSettingsInputAntenna,
        name: "Free Wi-Fi in all rooms!",
      },
      { id: 6, icons: IoIosCellular, name: "Wi-Fi in public areas" },
    ],
  },
  {
    title: "Facility",
    icon: <GiKnifeFork className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 7, icons: FaHeadset, name: "Receptionist 24h" },
      { id: 8, icons: MdOutlineMicrowave, name: "Kitchen" },
      { id: 9, icons: FaSwimmingPool, name: "Swimming Pool" },
      { id: 10, icons: FaDumbbell, name: "Gym" },
      { id: 11, icons: MdOutlineBathtub, name: "Shower" },
      { id: 12, icons: PiCigarette, name: "Smoking Room" },
      { id: 13, icons: FaSpa, name: "SPA Room" },
    ],
  },
  {
    title: "Service and Convenience",
    icon: <TbHeadset className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 14, icons: TbAirConditioning, name: "Air conditioning" },
      { id: 15, icons: FaUserTie, name: "Concierge" },
      { id: 16, icons: MdDeck, name: "Terrace" },
      { id: 17, icons: MdCleaningServices, name: "Daily housekeeping" },
      { id: 18, icons: BsCurrencyExchange, name: "Currency exchange" },
      { id: 19, icons: MdRouter, name: "Internet Service" },
    ],
  },
];

export default function FacilityInfoHotel() {
  const [switchStates, setSwitchStates] = useState<Record<number, boolean>>({});

  const toggleSwitch = (id: number) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Facility Information</span>
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
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel
                      className={`${mediumMontserrat.className} text-gray-500 mt-3 ml-16 flex flex-col gap-3`}
                    >
                      {section.content.map((item) => (
                        <div
                          key={item.id}
                          className="px-3 py-3 border-solid border rounded-lg border-gray-300 flex justify-between items-center"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              {item.icons && (
                                <item.icons className="text-RoyalAmethyst-700 w-5 h-5" />
                              )}
                              <span className="pl-2 text-xs sm:text-sm text-black font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <div>
                            <AntSwitch
                              checked={switchStates[item.id] || false}
                              onChange={() => toggleSwitch(item.id)}
                            />
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
