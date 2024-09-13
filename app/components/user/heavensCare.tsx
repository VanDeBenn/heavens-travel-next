"use client";
import React, { useState } from "react";
import {
  RiCalendarLine,
  RiTeamLine,
  RiHome3Line,
  RiMapPin2Line,
  RiGlassesLine,
} from "react-icons/ri";
import { LuFeather } from "react-icons/lu";
import { CiCamera } from "react-icons/ci";

import Image from "next/image";
import Link from "next/link";

import { BookingItem, initialBookingItems } from "./myBooking";
import { Montserrat } from "next/font/google";
import { Rate, Input, Upload, message } from "antd";

// Mengimpor font Montserrat dari Google Fonts
const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeavensCare() {
  // State untuk menyimpan data booking
  const [bookingItems, setBookingItems] =
    useState<BookingItem[]>(initialBookingItems);

  // State untuk menyimpan judul user
  const [userTitle, setUserTitle] = useState<string>("");

  // State untuk menyimpan rating user
  const [userRating, setUserRating] = useState<number>(5);

  // State untuk menyimpan email user
  const [userEmail, setUserEmail] = useState<string>("");

  // State untuk menyimpan komentar user
  const [userDescription, setUserDescription] = useState<string>("");

  // State untuk menyimpan file yang diupload dan URL-nya
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Handle file upload
  const handleUpload = (options: { file: File }) => {
    const { file } = options;

    if (previewImages.length >= 3) {
      message.error("You can only upload up to 3 files.");
      return false; // Prevent auto-upload
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewImages((prevImages) => [
        ...prevImages,
        reader.result as string,
      ]);
      message.success(`${file.name} file uploaded successfully`);
    };

    reader.onerror = () => {
      message.error(`Failed to upload ${file.name}`);
    };

    reader.readAsDataURL(file);
    return false; // Prevent auto-upload
  };

  return (
    <div className="bg-white rounded-xl">
      {/* Header section dengan judul 'Heavens Care' */}
      <div className="py-6 px-9">
        <span className="text-xl font-semibold">
          Heavens <span className="text-[#4F28D9]">Care</span>
        </span>
      </div>

      {/* Garis pemisah */}
      <div className="h-px bg-gray-300"></div>

      <div className="py-6 px-9 flex flex-col gap-6">
        <h1 className="text-xl font-semibold">Related Issue</h1>
        {/* Bagian review item */}
        <div className="grid grid-cols-1">
          {bookingItems.slice(0, 1).map((item, index) => {
            return (
              <div
                key={index}
                className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}
              >
                {/* Bagian atas: kategori dan status */}
                <div className="flex justify-between items-center">
                  <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                    {item.category === "Hotel" ? (
                      <RiHome3Line size={18} color="#ffff" />
                    ) : (
                      <RiGlassesLine size={18} color="#ffff" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {item.category}
                    </span>
                  </div>

                  <div
                    className={`${mediumMontserrat.className} flex items-center`}
                  >
                    <div
                      className={`border-2 border-solid border-[#DBDBDB] ${
                        item.status === "waiting for payment"
                          ? "bg-[#FFD600] border-[#FFD600]"
                          : "bg-[#cbbef4] border-[#DBDBDB]"
                      } rounded-xl py-1 px-5 w-max mr-2`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          item.status === "waiting for payment"
                            ? "text-[#DC143C]"
                            : "text-[#4F28D9]"
                        }`}
                      >
                        {item.status === "waiting for payment"
                          ? "Waiting for Payment"
                          : "Done"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bagian tengah: gambar dan detail hotel/destinasi */}
                <div className="flex items-center gap-2 py-3">
                  <Link href={item.link}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-xl w-44"
                    />
                  </Link>

                  <div
                    className={`${mediumMontserrat.className} flex flex-col gap-1`}
                  >
                    <Link
                      href={item.link}
                      className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                    >
                      {item.name}
                    </Link>

                    {item.category === "Hotel" ? (
                      <div className="flex items-center gap-1">
                        <RiMapPin2Line size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {item.HotelLocation}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <RiMapPin2Line size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {item.DestinationLocation}
                        </span>
                      </div>
                    )}

                    {item.category === "Hotel" ? (
                      <div className="flex items-center gap-1">
                        <LuFeather size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {item.HotelTotalReviews} reviews
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <LuFeather size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {item.DestinationTotalReviews} reviews
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`${mediumMontserrat.className} flex flex-col gap-1`}
                >
                  {item.category === "Hotel" && item.HotelRoomType && (
                    <span className="text-sm font-semibold text-[#4F28D9]">
                      {item.HotelRoomType}
                    </span>
                  )}

                  <div className="flex items-center gap-1">
                    <RiCalendarLine size={16} color="black " />
                    <span className="text-xs text-black">
                      {item.category === "Hotel"
                        ? item.HotelSchedule
                        : item.DestinationSchedule}
                    </span>
                  </div>

                  {item.category === "Hotel" && (
                    <div
                      className={`${mediumMontserrat.className} flex justify-between`}
                    >
                      <div className="flex gap-1">
                        <RiTeamLine size={16} color="black" />
                        <span className="text-xs text-black">
                          Guests: {item.guests}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Form Title */}
        <div className="">
          <h1 className="text-lg font-semibold">Title</h1>
          <Input
            placeholder="Enter your title..."
            value={userTitle}
            onChange={(e) => setUserTitle(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        {/* Form komentar user */}
        <div className="">
          <h1 className="text-lg font-semibold">Description</h1>
          <Input.TextArea
            rows={4}
            placeholder="Write your Description here..."
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        {/* Bagian upload foto/video */}
        <div className=" ">
          <h1 className="text-lg font-semibold">Add Photo/Video (Optional)</h1>
          <div className="flex items-center gap-4">
            <Upload
              customRequest={(options) =>
                handleUpload(options as { file: File })
              }
              showUploadList={false}
              className="w-72"
            >
              <div className="flex  items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-64 cursor-pointer w-full">
                <div
                  className="flex flex-col items-center justify-center px-20 
              "
                >
                  <CiCamera className="text-gray-500" size={32} />
                  <p className="text-gray-500 text-sm">Click to upload</p>
                </div>
              </div>
            </Upload>

            {/* Tampilkan preview gambar/video yang sudah diupload */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {previewImages.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image}
                      alt={`Uploaded file ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-64 h-64"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="">
          <h1 className="text-lg font-semibold">Email</h1>
          <Input
            placeholder="Enter your email..."
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full mt-1"
          />
        </div>
        <div className="pt-12 flex justify-between w-full">
          <Link
            href={"/profile"}
            className="border border-solid border-[#4F28D9] rounded-xl py-2 px-5 w-max flex items-center gap-1 2xl:gap-2 text-xs text-[#4F28D9] no-underline font-semibold"
          >
            Return
          </Link>

          <Link
            href={"/"}
            className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-2 px-5 w-max flex items-center gap-1 2xl:gap-2 text-xs text-white no-underline font-semibold"
          >
            Submit your report
          </Link>
        </div>
      </div>
    </div>
  );
}
