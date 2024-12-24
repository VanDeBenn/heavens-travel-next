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
import { cartRepository } from "#/repository/carts";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { bookingRepository } from "#/repository/bookings";

const { RangePicker } = DatePicker;

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface ComponentProps {
  data: any;
  id: any;
}

export default function ChooseRoonHotel({ data, id }: ComponentProps) {
  if (!data) {
    return;
  }
  const [adults, setAdults] = useState(0); // Start value for adults
  const [children, setChildren] = useState(0); // Start value for children
  const [numberOfRooms, setNumberOfRooms] = useState(1); // Start value f  of rooms
  const [singleBeds, setSingleBeds] = useState(0); // Start value for single beds
  const [doubleBeds, setDoubleBeds] = useState(0); // Start value for double beds
  const [queenBeds, setQueenBeds] = useState(0); // Start value for queen beds
  const [kingBeds, setKingBeds] = useState(0); // Start value for king beds
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleRoomChange = (value: number) => {
    if (value >= 1) {
      setNumberOfRooms(value);
    }
  };

  const handleDateChange = (dates: any, dateStrings: any) => {
    if (dates) {
      setStartDate(dateStrings[0]); // Format string untuk API
      setEndDate(dateStrings[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleAddToCart = async (roomHotelId: string) => {
    try {
      const data = {
        userId: localStorage?.getItem("_id"),
        roomHotelId: roomHotelId,
        quantityRoom: numberOfRooms,
        startDate: startDate,
        endDate: endDate,
      };
      await cartRepository?.api?.addToCart(data);
    } catch (error) {
      console?.error("Failed to add to cart", error);
    }
  };

  const handleBookNow = async (roomHotelId: string) => {
    try {
      const data = {
        userId: localStorage?.getItem("_id"),
        roomHotelId: roomHotelId,
        quantityRoom: numberOfRooms,
        startDate: startDate,
        endDate: endDate,
      };
      await bookingRepository?.api?.create(data);
    } catch (error) {
      console?.error("Failed to add to cart", error);
    }
  };

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

  return (
    <div className={`${mediumMontserrat?.className} flex flex-col gap-4`}>
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
            <Space direction="vertical" size={12}>
              <RangePicker format="YYYY-MM-DD" onChange={handleDateChange} />
            </Space>
          </div>
        </div>
      </div>

      {data?.roomhotels?.map((item: any) => (
        <div
          key={item?.id}
          className="p-6 border-solid border-gray-200 border rounded-xl bg-white flex items-start gap-4 w-full h-60"
        >
          <div className="flex gap-2 items-center">
            <Image
              src={`http://localhost:3222/photo-room-hotels/${item?.photoroomhotels[0]?.pathPhoto}`}
              alt="Room Image"
              height={200}
              width={300}
              className="w-64 h-48 rounded-l-xl"
            />
            <div className="flex flex-col gap-2">
              <Image
                src={`http://localhost:3222/photo-room-hotels/${item?.photoroomhotels[1]?.pathPhoto}`}
                alt="Room Image"
                height={200}
                width={300}
                className="w-40 h-[92px] rounded-tr-xl"
              />{" "}
              <Image
                src={`http://localhost:3222/photo-room-hotels/${item?.photoroomhotels[3]?.pathPhoto}`}
                alt="Room Image"
                height={200}
                width={300}
                className="w-40 h-[92px] rounded-br-xl"
              />
            </div>
          </div>

          <div className="w-1/2 h-full ">
            <span className="font-semibold text-base">{item?.roomType}</span>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="flex items-center ">
                <TbBed className="text-lg text-RoyalAmethyst-700" />
                <span className="pl-2 text-xs sm:text-sm text-black">
                  {item?.singleBed
                    ? "single bed"
                    : item?.doubleBed
                    ? "double bed"
                    : item?.queenBed
                    ? "queen bed"
                    : item?.kingBed
                    ? "king bed"
                    : ""}
                </span>
              </div>
              {servicesAmenitiesData?.facilities
                ?.slice(0, 12)
                ?.map((item, index) => (
                  <div key={index} className="flex items-center ">
                    {item?.icon}
                    <span className="pl-2 text-xs sm:text-sm text-black">
                      {item?.text}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="p-3 border-solid border-gray-200 border rounded-xl flex flex-col justify-between h-full gap-1 w-1/4">
            <span className="text-base font-semibold">Sleeps</span>
            <Image
              src={"/images/illustration/icon people?.png"}
              alt="ho"
              height={300}
              width={400}
              className="w-16 h-9"
            />

            <div className=" flex flex-col gap-2 ">
              <span className="text-xs text-gray-400">
                Includes 1 room for {item?.adult} adults, {item?.children} kids
                (0-6)?.
              </span>
              <div className="border border-gray-300 border-dashed"></div>

              <span className="text-xs text-gray-400">
                This offer fits your travel group?.
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
                    Rp{item?.price}
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
                      <Button
                        onClick={() => handleRoomChange(numberOfRooms + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  {/* Number of Rooms Input */}
                  <div
                    onClick={() => {
                      handleAddToCart(item?.id);
                    }}
                    className="border-solid border-RoyalAmethyst-700 border rounded-xl text-center text-RoyalAmethyst-700 text-sm cursor-pointer  p-3"
                  >
                    Add cart
                  </div>
                  <div
                    onClick={() => {
                      handleBookNow(item?.id);
                    }}
                    className="bg-RoyalAmethyst-700 text-white text-sm rounded-xl text-center p-3 cursor-pointer"
                  >
                    Book now
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
