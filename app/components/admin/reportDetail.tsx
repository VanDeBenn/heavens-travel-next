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
import { BookingItem, initialBookingItems } from "../user/myBooking";
import { Montserrat } from "next/font/google";
import { Rate, Input, Upload, message, Form, Button } from "antd";

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

export default function ReportDetail() {
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
  // State untuk menyimpan data booking
  const [bookingItems, setBookingItems] =
    useState<BookingItem[]>(initialBookingItems);

  // State untuk menyimpan form data
  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    message.success("Report replied successfully!");
    form.resetFields(); // Reset form fields after submission
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-xl border-solid border-gray-200 border">
        <div className="py-6 px-9">
          <span className="text-xl font-semibold">Report Detail</span>
        </div>

        {/* Garis pemisah */}
        <div className="h-px bg-gray-300"></div>

        <div className="py-6 px-9 flex flex-col gap-3">
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
                          <RiMapPin2Line size={16} color="#6b7280" />
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

          <div className={`${mediumMontserrat.className} `}>
            {reportInfo.map((detail, index) => (
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

          {/* 4 Photo */}
          <div>
            <div className={`${mediumMontserrat.className} py-6`}>
              <span className="text-xl font-semibold">Photos</span>
            </div>
            <div className="h-px bg-gray-300"></div>

            <div
              className={`${mediumMontserrat.className} grid grid-cols-3 gap-4 pt-6`}
            >
              {photoReport.map((detail, index) => (
                <div key={index}>
                  <div className="w-full">
                    {/* Menggunakan next/image untuk gambar dengan ukuran w-full h-32 */}
                    <Image
                      src={detail.value}
                      alt="Location Map"
                      width={400}
                      height={150}
                      className="w-full rounded-lg"
                    />
                  </div>

                  <div className="h-px bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* form */}
      <div className="bg-white rounded-xl border-solid border-gray-200 border">
        <div className={`${mediumMontserrat.className} py-6 px-9 `}>
          <span className="font-semibold text-lg">Reply Report</span>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4"
          >
            {/* Title */}
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input placeholder="Input title" />
            </Form.Item>
            {/* end Title */}
            {/* Deskripsi */}
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input.TextArea placeholder="Input description" rows={8} />
            </Form.Item>
            {/* end Deskripsi */}
          </Form>

          {/* Bagian upload foto/video */}
          <div className="">
            <h1 className="text-lg font-semibold">
              Add Photo/Video (Optional)
            </h1>
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
            </div>
          </div>
        </div>
      </div>
      {/* end form */}

      <div className="flex justify-end  ">
        <div className="flex items-center gap-3">
          <Link
            href={"/admin/report"}
            className="w-max border-solid border-RoyalAmethyst-700 border px-9 py-2 rounded-xl cursor-pointer no-underline"
          >
            <span className="font-semibold text-RoyalAmethyst-700 text-base">
              Back
            </span>
          </Link>
          <div className="w-max bg-RoyalAmethyst-700 px-9 py-2 rounded-xl cursor-pointer ">
            <span className="text-white font-semibold text-base">Done</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const reportInfo = [
  {
    label: "Blog Title",
    value: "Wahid Borobudur is a hotel located in Borobudur",
  },
  {
    label: "Description",
    value:
      "Wahid Borobudur is a hotel located in Borobudur, a 13-minute walk from the famous Borobudur Temple, a UNESCO World Heritage Site and one of the seven wonders of the world. ",
  },
  {
    label: "Email",
    value: "tuy23@gmail.com",
  },
];

const photoReport = [
  {
    value: "/images/illustration/bedroom-suite.jpg", // Path gambar
  },
  {
    value: "/images/illustration/luxury-bedroom.jpg", // Path gambar
  },
  {
    value: "/images/illustration/bedroom-suite.jpg", // Path gambar
  },
];
