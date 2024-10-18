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

import { Rate, Input, Upload, message } from "antd"; // Import Upload dari Ant Design

// Mengimpor font Montserrat dari Google Fonts
import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "./myBooking";

export default function Review() {
  // State untuk menyimpan data booking
  const [bookingItems, setBookingItems] =
    useState<BookingItem[]>(initialBookingItems);

  // State untuk menyimpan rating user
  const [userRating, setUserRating] = useState<number>(5);

  // State untuk menyimpan komentar user
  const [userComment, setUserComment] = useState<string>("");

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
      {/* Header section dengan judul 'Review' */}
      <div className="py-6 px-9">
        <span className="text-xl font-semibold">Review</span>
      </div>

      {/* Garis pemisah */}
      <div className="h-px bg-gray-300"></div>

      <div className="py-6 px-9 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-semibold">Rate your experience</h1>

          {/* Komponen rating menggunakan Ant Design */}
          <Rate
            allowHalf
            defaultValue={5}
            onChange={(value) => setUserRating(value)}
            value={userRating}
            className="text-yellow-500"
          />
        </div>
        {/* Bagian review item */}
        <div className=" grid grid-cols-1">
          {bookingItems.slice(0, 1).map((item, index) => {
            return (
              <div
                key={index}
                className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}
              >
                {/* Bagian atas: kategori dan status */}
                <div className="flex justify-between items-center">
                  <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
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
                            ? "text-InfernoEcho-600"
                            : "text-RoyalAmethyst-700"
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
                      className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
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
                    <span className="text-sm font-semibold text-RoyalAmethyst-700">
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
        {/* Form komentar user */}
        <div className="">
          <h1 className="text-lg font-semibold">Your comment</h1>
          <Input.TextArea
            rows={4}
            placeholder="Write your comment here..."
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="w-full mt-2"
          />
        </div>
        {/* Bagian upload foto/video */}
        <div className="">
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
                  <p className="text-gray-500">Add photo/video</p>
                </div>
              </div>
            </Upload>
            <div className="flex gap-4">
              {previewImages.map((image, index) => (
                <div key={index} className="w-64 h-64 relative">
                  <Image
                    src={image}
                    alt={`Preview ${index}`}
                    layout="fill"
                    className="object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>{" "}
        </div>{" "}
        <div className="pt-12 flex justify-between w-full">
          <Link
            href={"/profile"}
            className="border border-solid border-RoyalAmethyst-700 rounded-xl py-2 px-5 w-max flex items-center gap-1 2xl:gap-2 text-xs text-RoyalAmethyst-700 no-underline font-semibold"
          >
            Return
          </Link>

          <Link
            href={"/"}
            className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-2 px-5 w-max flex items-center gap-1 2xl:gap-2 text-xs text-white no-underline font-semibold"
          >
            Submit your review
          </Link>
        </div>
      </div>
    </div>
  );
}
