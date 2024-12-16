"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import Image dari next/image

import { mediumMontserrat } from "#/app/components/user/myBooking";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { roomHotelRepository } from "#/repository/roomHotels";
import Loading from "#/app/loading";

const ResultRoom: React.FC = () => {
  const router = useRouter();
  const [rooomHotelData, setRoomHotelData] = useState<any>();
  const id: any = localStorage.getItem("_roomHotel");

  const fetchHotel = async () => {
    try {
      if (id == null) {
        // router.push("/admin/hotels");
      }
      const res = await roomHotelRepository.api.getRoomHotel(id);
      // console.log(res);
      setRoomHotelData(res.data); //
      // // console.log("data:", res.body.data);
      // localStorage.removeItem("_rooomHotel");
    } catch (error) {
      console.error("Error fetching rooomHotel:", error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  if (!rooomHotelData) {
    return <Loading />;
  }

  const basicInfo = [
    {
      label: "Room Type",
      value: rooomHotelData.roomType,
    },
    {
      label: "Price",
      value: rooomHotelData.price,
    },
    {
      label: "Adult",
      value: rooomHotelData.adult,
    },
    {
      label: "Childen Allowed",
      value: rooomHotelData.children,
    },
    {
      label: "Bed Type",
      value: "2 Double bed and 1 King Bed",
    },
    {
      label: "Number Room",
      value: "5",
    },
  ];

  const photosPreview = [
    {
      value: "/images/illustration/bedroom-suite.jpg", // Path gambar
    },
    {
      value: "/images/illustration/luxury-bedroom.jpg", // Path gambar
    },
    {
      value: "/images/illustration/bedroom-suite.jpg", // Path gambar
    },
    {
      value: "/images/illustration/luxury-bedroom.jpg", // Path gambar
    },
  ];

  const facility = [
    {
      label: "Air Conditioning",
      value: "Available",
    },
    {
      label: "Shower",
      value: "Available",
    },
    {
      label: "Toilettries",
      value: "Available",
    },
    {
      label: "Towels",
      value: "Available",
    },
    {
      label: "Telephone",
      value: "Available",
    },
    {
      label: "Television",
      value: "Available",
    },
  ];

  return (
    <div className="">
      <div className={`${mediumMontserrat.className} py-6 px-7`}>
        <span className="text-lg font-semibold">Create Room Success</span>
      </div>

      <div className="flex flex-col gap-5">
        {/* Basic Information Section */}
        <div
          className={`bg-white border-solid border-gray-200 border p-7 rounded-xl`}
        >
          <div className={`${mediumMontserrat.className}  pb-6`}>
            <span className="text-xl font-semibold">Room Detail</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className} `}>
            {basicInfo.map((detail, index) => (
              <div key={index}>
                <div className="flex items-center py-5 gap-2">
                  <div className="flex items-center">
                    <div
                      className={`text-black w-60 font-semibold text-base ${mediumMontserrat}`}
                    >
                      {detail.label}
                    </div>
                    <span className="font-semibold">:</span>
                  </div>
                  <div className={`text-base text-black ${mediumMontserrat}`}>
                    {detail.value}
                  </div>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Photo */}
        <div className="  bg-white border-solid border-gray-200 border p-7 rounded-xl">
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-xl font-semibold">Photos</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div
            className={`${mediumMontserrat.className} grid grid-cols-4 gap-4 pt-6`}
          >
            {rooomHotelData.photoroomhotels.map((photo: any) => (
              <div key={photo.id}>
                <div className="w-full">
                  <Image
                    src={`http://localhost:3222/photo-room-hotels/${photo.pathPhoto}`}
                    alt="Location Map"
                    width={400} // Image width
                    height={150} // Image height
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
        <div className=" bg-white border-solid border-gray-200 border p-7 rounded-xl">
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-xl font-semibold">Facility</span>
          </div>
          <div className="h-px bg-gray-300"></div> {/* Facilities Section */}
          <div className=" ">
            <div className={`${mediumMontserrat.className} `}>
              {facility.map((detail, index) => (
                <div key={index}>
                  <div className="flex items-center py-5 gap-2">
                    <div className="flex items-center">
                      <div
                        className={`text-black w-60 font-semibold text-base ${mediumMontserrat}`}
                      >
                        {detail.label}
                      </div>
                      <span className="font-semibold">:</span>
                    </div>
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {detail.value}
                    </div>
                  </div>
                  <div className="h-px bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-7 flex justify-end">
        <Link
          href={"/admin/rooomHotels"}
          className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white
             rounded-xl py-2 px-20 text-RoyalAmethyst-700 text-center font-semibold"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ResultRoom;
