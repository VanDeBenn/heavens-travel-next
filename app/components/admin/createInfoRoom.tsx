"use client";
import { Montserrat } from "next/font/google";
import { Select, InputNumber, Button } from "antd";
import React, { useState } from "react";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const { Option } = Select;

export default function CreateInfoRoom() {
  const [adults, setAdults] = useState(0); // Start value for adults
  const [children, setChildren] = useState(0); // Start value for children
  const [numberOfRooms, setNumberOfRooms] = useState(1); // Start value for number of rooms
  const [singleBeds, setSingleBeds] = useState(0); // Start value for single beds
  const [doubleBeds, setDoubleBeds] = useState(0); // Start value for double beds
  const [queenBeds, setQueenBeds] = useState(0); // Start value for queen beds
  const [kingBeds, setKingBeds] = useState(0); // Start value for king beds
  const roomTypes = [
    "Superior",
    "Superior Twin",
    "Superior King",
    "Superior Queen",
    "Deluxe",
    "Deluxe Twin",
    "Deluxe King",
    "Deluxe Queen",
  ];

  const handleAdultChange = (value: number) => {
    if (value >= 0) {
      setAdults(value);
    }
  };

  const handleChildrenChange = (value: number) => {
    if (value >= 0) {
      setChildren(value);
    }
  };

  const handleRoomChange = (value: number) => {
    if (value >= 1) {
      setNumberOfRooms(value);
    }
  };

  const handleSingleBedChange = (value: number) => {
    if (value >= 0) {
      setSingleBeds(value);
    }
  };

  const handleDoubleBedChange = (value: number) => {
    if (value >= 0) {
      setDoubleBeds(value);
    }
  };

  const handleQueenBedChange = (value: number) => {
    if (value >= 0) {
      setQueenBeds(value);
    }
  };

  const handleKingBedChange = (value: number) => {
    if (value >= 0) {
      setKingBeds(value);
    }
  };

  return (
    <div
      className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border p-9 flex flex-col`}
    >
      <div
        className={`${mediumMontserrat.className} pb-4 flex justify-between items-center `}
      >
        <span className="font-semibold text-lg">Create Room</span>
      </div>

      <span className="font-semibold text-sm">Share your room details</span>
      <span className="pt-2 text-gray-400 text-sm">
        Enjoy a comfortable stay in our well-appointed rooms with a variety of
        options to choose from
      </span>

      <div className="flex justify-between gap-3 items-center pt-5">
        {/* Room Type Dropdown */}
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Room Type</label>
          <Select
            showSearch
            placeholder="Select room type"
            className="w-full"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {roomTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </div>

        {/* Price Input */}
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Price</label>
          <InputNumber
            className="w-full"
            formatter={(value) =>
              `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\Rp\s?|(\,*)/g, "") as any}
            min={0}
            placeholder="Enter price"
          />
        </div>

        {/* Adult Input */}
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Adults</label>
          <div className="flex items-center justify-between border-solid border-gray-200 border">
            <Button
              onClick={() => handleAdultChange(adults - 1)}
              disabled={adults <= 0} // Disable button if adults is zero
            >
              -
            </Button>
            <span className="mx-3">{adults}</span>
            <Button onClick={() => handleAdultChange(adults + 1)}>+</Button>
          </div>
        </div>
      </div>

      <div className="pt-5 flex items-center gap-3">
        {/* Children Allowed Input */}
        <div className="w-[399px]">
          <label className="block text-sm font-semibold mb-1">
            Children Allowed
          </label>
          <div className="flex items-center justify-between border-solid border-gray-200 border">
            <Button
              onClick={() => handleChildrenChange(children - 1)}
              disabled={children <= 0}
            >
              -
            </Button>
            <span className="mx-3">{children}</span>
            <Button onClick={() => handleChildrenChange(children + 1)}>
              +
            </Button>
          </div>
        </div>

        {/* Number of Rooms Input */}
        <div className="w-[399px]">
          <label className="block text-sm font-semibold mb-1">
            Number of Rooms
          </label>
          <div className="flex items-center justify-between border-solid border-gray-200 border">
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
      </div>

      <div className="mt-9 flex flex-col">
        <span className="font-semibold text-sm">Type of Bed</span>
        <span className="pt-2 text-gray-400 text-sm">
          Sleep well in our comfortable rooms with modern amenities.
        </span>

        <div className="flex justify-between gap-3 items-center pt-5">
          {/* Single Bed */}
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Single Bed
            </label>
            <div className="flex items-center justify-between border-solid border-gray-200 border">
              <Button
                onClick={() => handleSingleBedChange(singleBeds - 1)}
                disabled={singleBeds <= 0}
              >
                -
              </Button>
              <span className="mx-3">{singleBeds}</span>
              <Button onClick={() => handleSingleBedChange(singleBeds + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Double Bed */}
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Double Bed
            </label>
            <div className="flex items-center justify-between border-solid border-gray-200 border">
              <Button
                onClick={() => handleDoubleBedChange(doubleBeds - 1)}
                disabled={doubleBeds <= 0}
              >
                -
              </Button>
              <span className="mx-3">{doubleBeds}</span>
              <Button onClick={() => handleDoubleBedChange(doubleBeds + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Queen Bed */}
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">
              Queen Bed
            </label>
            <div className="flex items-center justify-between border-solid border-gray-200 border">
              <Button
                onClick={() => handleQueenBedChange(queenBeds - 1)}
                disabled={queenBeds <= 0}
              >
                -
              </Button>
              <span className="mx-3">{queenBeds}</span>
              <Button onClick={() => handleQueenBedChange(queenBeds + 1)}>
                +
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-5 flex items-center gap-3">
          {/* King Bed */}
          <div className="w-[399px]">
            <label className="block text-sm font-semibold mb-1">King Bed</label>
            <div className="flex items-center justify-between border-solid border-gray-200 border">
              <Button
                onClick={() => handleKingBedChange(kingBeds - 1)}
                disabled={kingBeds <= 0}
              >
                -
              </Button>
              <span className="mx-3">{kingBeds}</span>
              <Button onClick={() => handleKingBedChange(kingBeds + 1)}>
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
