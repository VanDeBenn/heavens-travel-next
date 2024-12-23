"use client";
import { Julee } from "next/font/google";
import { Montserrat } from "next/font/google";
import { RiSearchLine } from "react-icons/ri";
import { Input, Select, Button, DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs"; // Import dayjs for date manipulation

const { Option } = Select;
const { RangePicker } = DatePicker;

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const JuleeNormal = Julee({
  subsets: ["latin"],
  weight: ["400"],
});

export default function BannerHotel() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );
  const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null); 

  const popularLocations = [
    "Bali",
    "Jakarta",
    "Yogyakarta",
    "Bandung",
    "Lombok",
  ];

  const handleSearch = () => {
    // console.log("Search Query:", searchQuery);
    // console.log("Selected Location:", selectedLocation);
    // console.log("Selected Dates:", dates);
  };

  return (
    <div className="flex flex-col">
      <div>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{ minHeight: "110vh" }}
        >
          {/* Background Image */}
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('/images/illustration/background-hotel.png')",
            }}
          ></div>

          {/* Overlay Hitam untuk Menggelapkan Gambar */}
          <div className="absolute top-0 w-full h-full bg-black opacity-20"></div>

          {/* Teks di Atas Background */}
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="flex flex-col gap-1 z-10 text-white">
                  <span
                    className={`${JuleeNormal.className} text-[90px] font-semibold text-center`}
                  >
                    Hotels
                  </span>
                  <span
                    className={`${mediumMontserrat.className} text-xl font-semibold text-center`}
                  >
                    Comfort & Luxury for Every Traveler
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak Pertengahan */}
        <div className="relative -mt-36 z-10 ">
          <div className="py-12 px-28 2xl:px-48">
            <div className="border-solid border-gray-200 border bg-white rounded-xl px-5 py-3">
              <div className="flex items-center gap-3">
                {/* Input Search */}
                <Input
                  placeholder="Search hotel"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 border-solid border-gray-200 border rounded-lg text-sm"
                />
                {/* Schedule */}
                <RangePicker
                  format="DD MMM, YYYY"
                  onChange={(dates) =>
                    setDates(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
                  }
                  className="border-solid border-gray-200 border rounded-lg w-[350px]"
                />
                {/* Location Dropdown */}
                <Select
                  placeholder="Location"
                  value={selectedLocation}
                  onChange={(value) => setSelectedLocation(value)}
                  className="w-36 py-3"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label as string)
                      ?.toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {popularLocations.map((location) => (
                    <Option key={location} value={location} label={location}>
                      {location}
                    </Option>
                  ))}
                </Select>

                {/* Button Enter Search */}
                <Button
                  type="primary"
                  onClick={handleSearch}
                  className="bg-RoyalAmethyst-700 px-7 py-3 cursor-pointer rounded-lg flex items-center"
                >
                  <RiSearchLine className="text-white text-xl" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak bg-Lilac-50 di Bawah */}
        <div className="relative -mt-24 w-full">
          <div className="bg-Lilac-50 w-full rounded-t-[35px]">
            <div className="px-28 2xl:px-48 pt-16 pb-7 flex flex-col gap-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
