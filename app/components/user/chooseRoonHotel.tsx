"use client";
import { Montserrat } from "next/font/google";
import { Select, InputNumber, Button } from "antd";
import { GrSchedule } from "react-icons/gr";
import React, { useState } from "react";
import Image from "next/image";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoBedOutline } from "react-icons/io5";
import { GB, ID, MY } from "country-flag-icons/react/3x2";
import {
  FaWifi,
  FaHeadset,
  FaSwimmingPool,
  FaShower,
  FaDumbbell,
} from "react-icons/fa";
import { IoMdWifi } from "react-icons/io";
import {
  MdOutlineCellWifi,
  MdCurrencyExchange,
  MdOutlineKingBed,
} from "react-icons/md";
import { PiOvenFill, PiCigaretteSlashDuotone } from "react-icons/pi";
import { TbAirConditioning, TbBed } from "react-icons/tb";
import { AiOutlineReconciliation } from "react-icons/ai";
import { GiHighGrass, GiBroom } from "react-icons/gi";
import { LuMonitorDot } from "react-icons/lu";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
function ChooseRoonHotel() {
  const [adults, setAdults] = useState(0); // Start value for adults
  const [children, setChildren] = useState(0); // Start value for children
  const [numberOfRooms, setNumberOfRooms] = useState(1); // Start value for number of rooms
  const [singleBeds, setSingleBeds] = useState(0); // Start value for single beds
  const [doubleBeds, setDoubleBeds] = useState(0); // Start value for double beds
  const [queenBeds, setQueenBeds] = useState(0); // Start value for queen beds
  const [kingBeds, setKingBeds] = useState(0); // Start value for king beds

  const handleRoomChange = (value: number) => {
    if (value >= 1) {
      setNumberOfRooms(value);
    }
  };

  return (
    <div  className={`${mediumMontserrat.className} flex flex-col gap-4`}>
      <div className="p-6 border-solid border-gray-200 border rounded-xl bg-white ">
        <div className="flex items-center gap-2 ">
          {/* <RiUserSettingsLine className="text-2xl" /> */}
          <span className="font-semibold text-base">Choose Room</span>
        </div>
        <div className="flex items-center gap-5 pt-3">
          <div className="flex items-center gap-2 border-solid border-gray-300 border rounded-xl p-3">
            <IoBedOutline className="text-xl" />
            <span className="text-sm font-semibold">Superior</span>
            <span className="text-sm font-semibold">1</span>
          </div>
          <div className="flex items-center gap-2 border-solid border-gray-300 border rounded-xl p-3">
            <MdOutlineKingBed className="text-xl" />
            <span className="text-sm font-semibold">King Bed</span>
            <span className="text-sm font-semibold">2</span>
          </div>
          <div className="flex items-center gap-2 border-solid border-gray-300 border rounded-xl p-3">
            <RiCalendarScheduleLine className="text-xl" />
            <span className="text-sm font-semibold">6 Nov, 2024</span> -
            <span className="text-sm font-semibold">26 Nov, 2024</span>
          </div>
        </div>
      </div>

      <div className="p-6 border-solid border-gray-200 border rounded-xl bg-white flex items-start gap-4 w-full h-60">
        <div className="flex gap-2 items-center">
          <Image
            src={"/images/illustration/luxury-bedroom.jpg"}
            alt="Room Image"
            height={200}
            width={300}
            className="w-64 h-48 rounded-l-xl"
          />
          <div className="flex flex-col gap-2">
            <Image
              src={"/images/illustration/luxury-bedroom.jpg"}
              alt="Room Image"
              height={200}
              width={300}
              className="w-40 h-[92px] rounded-tr-xl"
            />{" "}
            <Image
              src={"/images/illustration/luxury-bedroom.jpg"}
              alt="Room Image"
              height={200}
              width={300}
              className="w-40 h-[92px] rounded-br-xl"
            />
          </div>
        </div>

        <div className="w-1/2 h-full ">
          <span className="font-semibold text-base">Superior</span>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {servicesAmenitiesData.facilities
              .slice(0, 12)
              .map((item, index) => (
                <div key={index} className="flex items-center ">
                  {item.icon}
                  <span className="pl-2 text-xs sm:text-sm text-black">
                    {item.text}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="p-3 border-solid border-gray-200 border rounded-xl flex flex-col justify-between h-full gap-1 w-1/4">
          <span className="text-base font-semibold">Sleeps</span>
          <Image
            src={"/images/illustration/icon people.png"}
            alt="ho"
            height={300}
            width={400}
            className="w-16 h-9"
          />

          <div className=" flex flex-col gap-2 ">
            <span className="text-xs text-gray-400">
              Includes 1 room for 2 adults, 2 kids (0-6).
            </span>
            <div className="border border-gray-300 border-dashed"></div>

            <span className="text-xs text-gray-400">
              This offer fits your travel group.
            </span>
          </div>
        </div>

        <div className="p-3 border-solid border-gray-200 border rounded-xl flex flex-col gap-1 w-1/2 h-full">
          <div className="flex justify-between gap-2 h-full">
            <div className="flex flex-col justify-between w-1/2">
              <span className="text-base font-semibold">Per-Night</span>
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs">
                  Subject to Cashback Terms
                </span>
                <span className="text-InfernoEcho-600 text-xl font-semibold">
                  Rp560.000
                </span>{" "}
                <span className="text-gray-400 text-xs">
                  Per night before taxes and fees
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end w-1/2">
              <div className="flex flex-col gap-2">
                {/* Number of Rooms Input */}
                <div className="w-full">
                  <div className="flex items-center justify-between border-solid border-gray-200 border rounded-xl">
                    <Button
                      onClick={() => handleRoomChange(numberOfRooms - 1)}
                      disabled={numberOfRooms <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-3">{numberOfRooms}</span>
                    <Button onClick={() => handleRoomChange(numberOfRooms + 1)}>
                      +
                    </Button>
                  </div>
                </div>
                {/* Number of Rooms Input */}
                <div className="border-solid border-RoyalAmethyst-700 border rounded-xl text-center text-RoyalAmethyst-700 text-sm p-3 cursor-pointer">
                  Add cart
                </div>
                <div className="bg-RoyalAmethyst-700 text-white text-sm rounded-xl text-center p-3 cursor-pointer">
                  Book now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 border-solid border-gray-200 border rounded-xl bg-white flex items-start gap-4 w-full h-60">
        <div className="flex gap-2 items-center">
          <Image
            src={"/images/illustration/luxury-bedroom.jpg"}
            alt="Room Image"
            height={200}
            width={300}
            className="w-64 h-48 rounded-l-xl"
          />
          <div className="flex flex-col gap-2">
            <Image
              src={"/images/illustration/luxury-bedroom.jpg"}
              alt="Room Image"
              height={200}
              width={300}
              className="w-40 h-[92px] rounded-tr-xl"
            />{" "}
            <Image
              src={"/images/illustration/luxury-bedroom.jpg"}
              alt="Room Image"
              height={200}
              width={300}
              className="w-40 h-[92px] rounded-br-xl"
            />
          </div>
        </div>

        <div className="w-1/2 h-full ">
          <span className="font-semibold text-base">King Bed</span>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {servicesAmenitiesData.facilities
              .slice(0, 12)
              .map((item, index) => (
                <div key={index} className="flex items-center ">
                  {item.icon}
                  <span className="pl-2 text-xs sm:text-sm text-black">
                    {item.text}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="p-3 border-solid border-gray-200 border rounded-xl flex flex-col justify-between h-full gap-1 w-1/4">
          <span className="text-base font-semibold">Sleeps</span>
          <Image
            src={"/images/illustration/icon people.png"}
            alt="ho"
            height={300}
            width={400}
            className="w-16 h-9"
          />

          <div className=" flex flex-col gap-2 ">
            <span className="text-xs text-gray-400">
              Includes 1 room for 2 adults, 2 kids (0-6).
            </span>
            <div className="border border-gray-300 border-dashed"></div>

            <span className="text-xs text-gray-400">
              This offer fits your travel group.
            </span>
          </div>
        </div>

        <div className="p-3 border-solid border-gray-200 border rounded-xl flex flex-col gap-1 w-1/2 h-full">
          <div className="flex justify-between gap-2 h-full">
            <div className="flex flex-col justify-between w-1/2">
              <span className="text-base font-semibold">Per-Night</span>
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs">
                  Subject to Cashback Terms
                </span>
                <span className="text-InfernoEcho-600 text-xl font-semibold">
                  Rp560.000
                </span>{" "}
                <span className="text-gray-400 text-xs">
                  Per night before taxes and fees
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end w-1/2">
              <div className="flex flex-col gap-2">
                {/* Number of Rooms Input */}
                <div className="w-full">
                  <div className="flex items-center justify-between border-solid border-gray-200 border rounded-xl">
                    <Button
                      onClick={() => handleRoomChange(numberOfRooms - 1)}
                      disabled={numberOfRooms <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-3">{numberOfRooms}</span>
                    <Button onClick={() => handleRoomChange(numberOfRooms + 1)}>
                      +
                    </Button>
                  </div>
                </div>
                {/* Number of Rooms Input */}
                <div className="border-solid border-RoyalAmethyst-700 border rounded-xl text-center text-RoyalAmethyst-700 text-sm p-3 cursor-pointer">
                  Add cart
                </div>
                <div className="bg-RoyalAmethyst-700 text-white text-sm rounded-xl text-center p-3 cursor-pointer">
                  Book now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border-solid border-gray-200 border rounded-xl bg-white flex items-start gap-4 w-full h-60">
        <div className="flex gap-2 items-center">
          <Image
            src={"/images/illustration/luxury-bedroom.jpg"}
            alt="Room Image"
            height={200}
            width={300}
            className="w-64 h-48 rounded-l-xl"
          />
          <div className="flex flex-col gap-2">
            <Image
              src={"/images/illustration/luxury-bedroom.jpg"}
              alt="Room Image"
              height={200}
              width={300}
              className="w-40 h-[92px] rounded-tr-xl"
            />{" "}
            <Image
              src={"/images/illustration/luxury-bedroom.jpg"}
              alt="Room Image"
              height={200}
              width={300}
              className="w-40 h-[92px] rounded-br-xl"
            />
          </div>
        </div>

        <div className="w-1/2 h-full ">
          <span className="font-semibold text-base">King Bed</span>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {servicesAmenitiesData.facilities
              .slice(0, 12)
              .map((item, index) => (
                <div key={index} className="flex items-center ">
                  {item.icon}
                  <span className="pl-2 text-xs sm:text-sm text-black">
                    {item.text}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="p-3 border-solid border-gray-200 border rounded-xl flex flex-col justify-between h-full gap-1 w-1/4">
          <span className="text-base font-semibold">Sleeps</span>
          <Image
            src={"/images/illustration/icon people.png"}
            alt="ho"
            height={300}
            width={400}
            className="w-16 h-9"
          />

          <div className=" flex flex-col gap-2 ">
            <span className="text-xs text-gray-400">
              Includes 1 room for 2 adults, 2 kids (0-6).
            </span>
            <div className="border border-gray-300 border-dashed"></div>

            <span className="text-xs text-gray-400">
              This offer fits your travel group.
            </span>
          </div>
        </div>

        <div className="p-3 border-solid border-gray-200 border rounded-xl flex flex-col gap-1 w-1/2 h-full">
          <div className="flex justify-between gap-2 h-full">
            <div className="flex flex-col justify-between w-1/2">
              <span className="text-base font-semibold">Per-Night</span>
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs">
                  Subject to Cashback Terms
                </span>
                <span className="text-InfernoEcho-600 text-xl font-semibold">
                  Rp560.000
                </span>{" "}
                <span className="text-gray-400 text-xs">
                  Per night before taxes and fees
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end w-1/2">
              <div className="flex flex-col gap-2">
                {/* Number of Rooms Input */}
                <div className="w-full">
                  <div className="flex items-center justify-between border-solid border-gray-200 border rounded-xl">
                    <Button
                      onClick={() => handleRoomChange(numberOfRooms - 1)}
                      disabled={numberOfRooms <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-3">{numberOfRooms}</span>
                    <Button onClick={() => handleRoomChange(numberOfRooms + 1)}>
                      +
                    </Button>
                  </div>
                </div>
                {/* Number of Rooms Input */}
                <div className="border-solid border-RoyalAmethyst-700 border rounded-xl text-center text-RoyalAmethyst-700 text-sm p-3 cursor-pointer">
                  Add cart
                </div>
                <div className="bg-RoyalAmethyst-700 text-white text-sm rounded-xl text-center p-3 cursor-pointer">
                  Book now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseRoonHotel;

const servicesAmenitiesData = {
  facilities: [
    {
      icon: <FaHeadset className="text-lg text-RoyalAmethyst-700" />,
      text: "Private bath",
    },
    {
      icon: <PiOvenFill className="text-lg text-RoyalAmethyst-700" />,
      text: "Air conditioning",
    },
    {
      icon: <FaSwimmingPool className="text-lg text-RoyalAmethyst-700" />,
      text: "Shower",
    },
    {
      icon: <FaShower className="text-lg text-RoyalAmethyst-700" />,
      text: "Toiletries",
    },
    {
      icon: <FaDumbbell className="text-lg text-RoyalAmethyst-700" />,
      text: "Towels",
    },
    {
      icon: (
        <PiCigaretteSlashDuotone className="text-lg text-RoyalAmethyst-700" />
      ),
      text: "Telephone",
    },
    {
      icon: <TbBed className="text-lg text-RoyalAmethyst-700" />,
      text: "Television",
    },
    {
      icon: <FaSwimmingPool className="text-lg text-RoyalAmethyst-700" />,
      text: "Outdoor view",
    },
    {
      icon: <FaShower className="text-lg text-RoyalAmethyst-700" />,
      text: "Slippers",
    },
    {
      icon: <FaDumbbell className="text-lg text-RoyalAmethyst-700" />,
      text: "Sofa",
    },
  ],
};
