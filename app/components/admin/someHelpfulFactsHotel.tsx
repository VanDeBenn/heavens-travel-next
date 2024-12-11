"use client";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { Disclosure, Transition } from "@headlessui/react";
import { RiArrowDownSLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { MdDeck, MdCleaningServices } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { MdRouter } from "react-icons/md";
import { Form, Input } from "antd";
import { GoPeople } from "react-icons/go";
import { TbAirConditioning, TbMapPins } from "react-icons/tb";
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
      { id: 1, icon: TbAirConditioning, name: "Air conditioning" },
      { id: 2, icon: FaUserTie, name: "Concierge" },
      { id: 3, icon: MdDeck, name: "Terrace" },
      { id: 4, icon: MdCleaningServices, name: "Daily housekeeping" },
      { id: 5, icon: BsCurrencyExchange, name: "Currency exchange" },
      { id: 6, icon: MdRouter, name: "Internet Service" },
    ],
  },
  {
    title: "Getting around",
    icon: <TbMapPins className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 1, icon: TbAirConditioning, name: "Air conditioning" },
      { id: 2, icon: FaUserTie, name: "Concierge" },
      { id: 3, icon: MdDeck, name: "Terrace" },
      { id: 4, icon: MdCleaningServices, name: "Daily housekeeping" },
      { id: 5, icon: BsCurrencyExchange, name: "Currency exchange" },
      { id: 6, icon: MdRouter, name: "Internet Service" },
    ],
  },
  {
    title: "The Property",
    icon: <FaBuildingColumns className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 1, icon: TbAirConditioning, name: "Air conditioning" },
      { id: 2, icon: FaUserTie, name: "Concierge" },
      { id: 3, icon: MdDeck, name: "Terrace" },
      { id: 4, icon: MdCleaningServices, name: "Daily housekeeping" },
      { id: 5, icon: BsCurrencyExchange, name: "Currency exchange" },
      { id: 6, icon: MdRouter, name: "Internet Service" },
    ],
  },
  {
    title: "Extra",
    icon: <LuBird className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { id: 1, icon: TbAirConditioning, name: "Air conditioning" },
      { id: 2, icon: FaUserTie, name: "Concierge" },
      { id: 3, icon: MdDeck, name: "Terrace" },
      { id: 4, icon: MdCleaningServices, name: "Daily housekeeping" },
      { id: 5, icon: BsCurrencyExchange, name: "Currency exchange" },
      { id: 6, icon: MdRouter, name: "Internet Service" },
    ],
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
                        className="space-y-5"
                        initialValues={{ remember: true }}
                      >
                        {section.content.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Form.Item
                              key={item.id}
                              label={
                                <div className="flex items-center gap-2">
                                  <Icon className="text-RoyalAmethyst-700 text-xl" />
                                  <span className="font-medium">
                                    {item.name}
                                  </span>
                                </div>
                              }
                              name={item.name.toLowerCase().replace(" ", "_")}
                            >
                              <Input
                                placeholder={`Enter ${item.name.toLowerCase()}`}
                                className="rounded-md"
                              />
                            </Form.Item>
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
