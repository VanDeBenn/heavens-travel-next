"use client";

import { Montserrat } from "next/font/google";
import { useState } from "react";
import { LiaBinocularsSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowDownSLine,
  RiBus2Line,
  RiStore2Line,
  RiWifiFill,
} from "react-icons/ri";
import { Switch as AntSwitch } from "antd";
import { CiHospital1 } from "react-icons/ci";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";

import React from "react";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Faq() {
  return (
    <div className={`${mediumMontserrat.className} flex flex-col gap-3`}>
      <span className="text-black font-semibold text-lg">FAQ</span>

      <div className="flex flex-col gap-5 p-5 bg-white rounded-xl border-solid border-gray-200 border">
        {sections.map((section, index) => (
          <div key={index}>
            <Disclosure defaultOpen={section.title === "Popular Destinations"}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-white border-none cursor-pointer px-0 w-full">
                    <div>
                      <div className="flex justify-between items-center pb-5">
                        <div className="flex gap-3 items-center">
                          <span className="text-lg font-semibold text-black">
                            {section.title}
                          </span>
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
                      className={`${mediumMontserrat.className} text-gray-500 mt-3 flex flex-col gap-3`}
                    >
                      {section.content.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-3 flex justify-between items-center"
                        >
                          <div className="flex flex-col gap-2 ">
                            <div className="flex items-center ">
                              <span className="text-xs sm:text-sm text-black font-semibold">
                                {item.text}
                              </span>
                            </div>
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

const sections = [
  {
    title: "Popular Destinations",
    icon: <RiBus2Line className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      {
        text: "Urumqi Travel | Kauai Travel | Miami Travel | Thailand Travel | Prague Travel | Zhangjiajie Travel | Philadelphia Travel | Accra Travel | Cape Town Travel | Newark Travel | Kunming Travel | Seaside Heights Travel | Changchun Travel | Long Branch Travel | Poland Travel | Port Washington Travel | Tongxiang Travel | Zanda Travel | Zonnebeke Travel | Warren County Travel | Ronchamp Travel | Scio Township Travel | Lewiston Travel | Jackson County Travel | Chesterfield Travel | Oyodo Travel | Give Travel",
      },
    ],
  },
  {
    title: "Popular Attractions",
    content: [
      {
        text: "Urumqi Travel | Kauai Travel | Miami Travel | Thailand Travel | Prague Travel | Zhangjiajie Travel | Philadelphia Travel | Accra Travel | Cape Town Travel | Newark Travel | Kunming Travel | Seaside Heights Travel | Changchun Travel | Long Branch Travel | Poland Travel | Port Washington Travel | Tongxiang Travel | Zanda Travel | Zonnebeke Travel | Warren County Travel | Ronchamp Travel | Scio Township Travel | Lewiston Travel | Jackson County Travel | Chesterfield Travel | Oyodo Travel | Give Travel",
      },
    ],
  },
  {
    title: "Popular Travelogues",
    content: [
      {
        text: "Urumqi Travel | Kauai Travel | Miami Travel | Thailand Travel | Prague Travel | Zhangjiajie Travel | Philadelphia Travel | Accra Travel | Cape Town Travel | Newark Travel | Kunming Travel | Seaside Heights Travel | Changchun Travel | Long Branch Travel | Poland Travel | Port Washington Travel | Tongxiang Travel | Zanda Travel | Zonnebeke Travel | Warren County Travel | Ronchamp Travel | Scio Township Travel | Lewiston Travel | Jackson County Travel | Chesterfield Travel | Oyodo Travel | Give Travel",
      },
    ],
  },
];
