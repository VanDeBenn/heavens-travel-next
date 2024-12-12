"use client";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { Disclosure, Transition } from "@headlessui/react";
import {
  RiArrowDownSLine,
  RiRoadMapLine,
  RiDoorOpenLine,
  RiParkingBoxLine,
} from "react-icons/ri";
import { Gi3dStairs } from "react-icons/gi";
import { LuRouter } from "react-icons/lu";
import { FaUserTie } from "react-icons/fa";
import {
  MdDeck,
  MdCleaningServices,
  MdAirportShuttle,
  MdElectricBolt,
  MdEventNote,
} from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { MdRouter } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { TbAirConditioning, TbMapPins } from "react-icons/tb";
import { FaBuildingColumns } from "react-icons/fa6";
import { LuBird } from "react-icons/lu";
import {
  Switch as AntSwitch,
  Input,
  Form,
  Modal,
  Button,
  TimePicker,
} from "antd";
import { BiTimer } from "react-icons/bi";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const sections = [
  {
    title: "Getting around",
    icon: <TbMapPins className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 1, icon: MdAirportShuttle, name: "Airport transfer fee" },
      { id: 2, icon: RiRoadMapLine, name: "Distance from city center" },
      { id: 3, icon: BiTimer, name: "Travel time to airport (minutes)" },
    ],
  },
  {
    title: "The Property",
    icon: <FaBuildingColumns className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 1, icon: MdElectricBolt, name: "Room voltage" },
      { id: 2, icon: Gi3dStairs, name: "Number of floors" },
      { id: 3, icon: MdEventNote, name: "Year property opened" },
      { id: 4, icon: RiDoorOpenLine, name: "Number of rooms" },
    ],
  },
  {
    title: "Extra",
    icon: <LuBird className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 1, icon: RiParkingBoxLine, name: "Daily Parking" },
      { id: 2, icon: LuRouter, name: "Daily Internet/Wi-Fi" },
    ],
  },
];
const apayak = [
  {
    title: "Check-in/Check-out",
    icon: <GoPeople className="text-2xl text-RoyalAmethyst-700" />,
    content: [],
  },
];

export default function SomeHelpfulFacts() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Some Helpful Facts</span>
      </div>
      <div className="h-px bg-gray-300 mb-5"></div>
      <div className="flex flex-col gap-5">
        {apayak.map((apaan, index) => (
          <div key={index}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-white border-none cursor-pointer px-0 w-full">
                    <div>
                      <div className="flex justify-between items-center pb-5">
                        <div className="flex gap-3 items-center">
                          <div className="border-solid rounded-full border border-RoyalAmethyst-700 flex items-center justify-center w-14 h-14">
                            {apaan.icon}
                          </div>
                          <div>
                            <span className="text-lg font-semibold text-black">
                              {apaan.title}
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
                    <Disclosure.Panel className="mt-3 ml-16 flex flex-col gap-5">
                      <Form
                        layout="vertical"
                        className="flex items-center justify-between gap-3"
                      >
                        {/* Check-in from */}
                        <Form.Item
                          label={
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Check-in from</span>
                            </div>
                          }
                          className="w-full"
                          name="check_in_from"
                        >
                          <TimePicker
                            className="w-full rounded-md"
                            placeholder="Select check-in time"
                          />
                        </Form.Item>
                        {/* End Check-in from */}
                        {/* Check-in until */}
                        <Form.Item
                          label="Check-in until"
                          className="w-full"
                          name="check_in_until"
                        >
                          <TimePicker
                            className="w-full rounded-md"
                            placeholder="Select check-out time"
                          />
                        </Form.Item>
                        {/* End Check-in until */}
                      </Form>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
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
                    <Disclosure.Panel className="mt-3 ml-16 flex flex-col gap-5">
                      <Form
                        layout="vertical"
                        className="w-full"
                        initialValues={{ remember: true }}
                      >
                        {section.content.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.id}
                              className="flex items-center justify-between gap-3 w-full"
                            >
                              <Form.Item
                                label={
                                  <div className="flex items-center gap-2">
                                    <Icon className="text-RoyalAmethyst-700 text-xl" />
                                    <span className="font-medium">
                                      {item.name}
                                    </span>
                                  </div>
                                }
                                className=" w-full"
                                name={item.name.toLowerCase().replace(" ", "_")}
                              >
                                <Input
                                  placeholder={`Enter ${item.name.toLowerCase()}`}
                                  className="rounded-md w-full"
                                />
                              </Form.Item>{" "}
                              <div className="flex items-center gap-3 pt-2">
                                <AntSwitch />
                              </div>
                            </div>
                          );
                        })}
                      </Form>
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
