"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Input, DatePicker, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/reset.css"; // Ant Design reset styles
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import type { RangeValue } from "rc-picker/lib/interface";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Hotels: React.FC = () => {
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState<RangeValue<dayjs.Dayjs>>(null);
  const [searchDisabled, setSearchDisabled] = useState(true);
  const [hotelSearch, setHotelSearch] = useState("");

  // Handle location change
  const handleLocationChange = (value: string) => {
    setLocation(value);
    setSearchDisabled(!value || !dates);
  };

  // Handle date range change
  const handleDateChange: RangePickerProps["onChange"] = (dates) => {
    setDates(dates);
    setSearchDisabled(!location || !dates);
  };

  // Handle hotel search input change
  const handleHotelSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHotelSearch(e.target.value);
  };

  return (
    <div className="relative h-[60vh] min-h-[450px]">
      {/* Background Image */}
      <Image
        src="/images/illustration/ar.png" // Background image
        alt="Hotel background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Title in the center */}
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <h1 className="text-white text-3xl font-bold">Hotel</h1>
      </div>
      {/* Search Form - Positioned at the bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-30 p-6">
        <div className="bg-white rounded-md shadow-lg p-6 max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Hotel Search Input */}
            <Input
              placeholder="Search for a hotel"
              className="w-full lg:w-4/5"
              size="large"
              value={hotelSearch}
              onChange={handleHotelSearchChange}
            />

            {/* Date Picker */}
            <RangePicker
              onChange={handleDateChange}
              className="w-full lg:w-3/6"
              size="large"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />

            {/* Location Dropdown */}
            <Select
              value={location}
              onChange={handleLocationChange}
              placeholder="Select Location"
              className="w-full lg:w-64"
              size="large"
            >
              <Option value="Bali">Bali</Option>
              <Option value="Jakarta">Jakarta</Option>
              <Option value="Bandung">Bandung</Option>
              {/* Add more locations as needed */}
            </Select>
            {/* Search Button */}
            <Button
              type="primary"
              className={`w-full lg:w-1/5 flex items-center justify-center p-3 ${
                searchDisabled ? "bg-[#4F28D9] text-white opacity-100 cursor-not-allowed" : "bg-[#4F28D9] text-white"
              }`}
              size="large"
              disabled={searchDisabled}
            >
              <SearchOutlined style={{ fontSize: '24px', color: 'white' }} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
