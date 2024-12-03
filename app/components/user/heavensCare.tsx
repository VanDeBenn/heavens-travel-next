"use client";
import React, { useEffect, useState } from "react";
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

import { Montserrat } from "next/font/google";
import { Rate, Input, Upload, message, Form, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { reportRepository } from "#/repository/report";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

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

interface ComponentProps {
  data: any;
  bookingsId: any;
  bookingDetailId: any;
}

export default function HeavensCare({
  data,
  bookingsId,
  bookingDetailId,
}: ComponentProps) {
  if (!data) {
    return;
  }
  const [form] = useForm();
  const router = useRouter();
  const user = localStorage.getItem("_id");
  const [reportId, setReportId] = useState<any>();

  const onFinish = async (values: any) => {
    try {
      const dataBasicInfo = {
        title: values.title,
        description: values.description,
        email: values.email,
        userId: user,
        bookingDetailId: bookingDetailId || null,
        bookingId: bookingsId || null,
      };

      console.log(dataBasicInfo);
      const req = await reportRepository.api.create(dataBasicInfo);
      setReportId(req?.body?.data?.id);
      // setBasicInfoDestination(dataBasicInfo);
    } catch (error) {
      console.error("Basic info failed:", error);
    }
  };

  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUploadSingleFile = async (file: RcFile, id: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("reportId", reportId);

    try {
      setUploading(true);
      await reportRepository.api.addPhotoReport(formData);
      message.success(`File ${file.name} uploaded successfully!`);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error(`Failed to upload ${file.name}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadAllFiles = async () => {
    if (fileList.length === 0) {
      message.error("Please add at least one file.");
      return;
    }

    for (const file of fileList) {
      await handleUploadSingleFile(file, "reportId");
    }
    message.success("All files uploaded successfully.");
  };

  const handleBeforeUpload = (file: RcFile) => {
    if (fileList.length >= 4) {
      message.error("You can only upload up to 4 photos.");
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) =>
      setPreviewImages((prev) => [...prev, e.target?.result as string]);
    reader.readAsDataURL(file);

    setFileList((prev) => [...prev, file]);
    return false;
  };

  const handleRemove = (file: RcFile) => {
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);

    const updatedPreviewImages = previewImages.filter(
      (_, index) => index !== fileList.indexOf(file)
    );
    setPreviewImages(updatedPreviewImages);
  };

  useEffect(() => {
    if (reportId) {
      handleUploadAllFiles();
    }
  }, [reportId]);

  // // State untuk menyimpan file yang diupload dan URL-nya
  // const [previewImages, setPreviewImages] = useState<string[]>([]);

  // // Handle file upload
  // const handleUpload = (options: { file: File }) => {
  //   const { file } = options;

  //   if (previewImages.length >= 3) {
  //     message.error("You can only upload up to 3 files.");
  //     return false; // Prevent auto-upload
  //   }

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     setPreviewImages((prevImages) => [
  //       ...prevImages,
  //       reader.result as string,
  //     ]);
  //     message.success(`${file.name} file uploaded successfully`);
  //   };

  //   reader.onerror = () => {
  //     message.error(`Failed to upload ${file.name}`);
  //   };

  //   reader.readAsDataURL(file);
  //   return false; // Prevent auto-upload
  // };

  const { destination, roomHotel } =
    data?.cart || data?.bookingdetails?.cart || {};
  const { payment } = data?.booking || { data };

  data?.bookingdetails?.map((item: any) => {
    console.log(item?.id);
    console.log(item?.cart?.destination?.name);
  });

  console.log(data);
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
        <div className="grid grid-cols-1 gap-2">
          {destination || roomHotel ? (
            <div
              className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}
            >
              {/* Bagian atas: kategori dan status */}
              <div className="flex justify-between items-center">
                <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                  {roomHotel ? (
                    <RiHome3Line size={18} color="#ffff" />
                  ) : (
                    <RiGlassesLine size={18} color="#ffff" />
                  )}
                  <span className="text-xs font-semibold text-white">
                    {roomHotel ? "Hotel" : "Destination"}
                  </span>
                </div>

                <div
                  className={`${mediumMontserrat.className} flex items-center`}
                >
                  <div
                    className={`border-2 border-solid border-[#DBDBDB] ${
                      payment?.status === "PENDING"
                        ? "bg-[#FFD600] border-[#FFD600]"
                        : "bg-[#cbbef4] border-[#DBDBDB]"
                    } rounded-xl py-1 px-5 w-max mr-2`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        payment?.status === "PENDING"
                          ? "text-[#DC143C]"
                          : "text-[#4F28D9]"
                      }`}
                    >
                      {payment?.status === "PENDING"
                        ? "Waiting for Payment"
                        : "Done"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bagian tengah: gambar dan detail hotel/destinasi */}
              <div className="flex items-center gap-2 py-3">
                <Link href={`/profile/bookings/detail/${data?.booking?.id}`}>
                  <Image
                    src={
                      "https://imgs.search.brave.com/hoIxdncmtwEaAIJzTZljZdl4LAfd52BAD3Bo_qMxTjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby90/dmxrL2Jsb2cvMjAy/MS8wMi9IdXRhbi1C/YW1idS1QZW5nbGlw/dXJhbi1zaHV0dGVy/c3RvY2tfMTAxMzEz/MTAwNi5qcGc_dHI9/ZHByLTEuNSxoLTQ4/MCxxLTQwLHctMTAy/NA"
                    }
                    alt={destination?.name || roomHotel?.name}
                    width={100}
                    height={100}
                    className="rounded-xl w-44"
                  />
                </Link>

                <div
                  className={`${mediumMontserrat.className} flex flex-col gap-1`}
                >
                  <Link
                    href={`/profile/bookings/detail/${data?.booking?.id}`}
                    className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                  >
                    {destination?.name || roomHotel?.name}
                  </Link>

                  {roomHotel === "Hotel" ? (
                    <div className="flex items-center gap-1">
                      <RiMapPin2Line size={16} color="#6b7280 " />
                      <span className="text-xs text-gray-500">
                        {roomHotel?.address}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <RiMapPin2Line size={16} color="#6b7280 " />
                      <span className="text-xs text-gray-500">
                        {destination?.address}
                      </span>
                    </div>
                  )}

                  {roomHotel === "Hotel" ? (
                    <div className="flex items-center gap-1">
                      <LuFeather size={16} color="#6b7280 " />
                      <span className="text-xs text-gray-500">
                        {/* {item.HotelTotalReviews} */}0 reviews
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <LuFeather size={16} color="#6b7280 " />
                      <span className="text-xs text-gray-500">
                        {/* {item.DestinationTotalReviews} */}0 reviews
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`${mediumMontserrat.className} flex flex-col gap-1`}
              >
                {roomHotel === "Hotel" && (
                  // && item.HotelRoomType
                  <span className="text-sm font-semibold text-[#4F28D9]">
                    {/* {item.HotelRoomType} */}
                    Room Type
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <RiCalendarLine size={16} color="black " />
                  <span className="text-xs text-black">
                    {roomHotel === "Hotel"
                      ? `${new Date(
                          data?.cart?.startDate
                        ).toLocaleDateString()} - ${new Date(
                          data?.cart?.endDate
                        ).toLocaleDateString()}`
                      : `${new Date(
                          data?.cart?.startDate
                        ).toLocaleDateString()} - ${new Date(
                          data?.cart?.endDate
                        ).toLocaleDateString()}`}
                  </span>
                </div>

                <div
                  className={`${mediumMontserrat.className} flex justify-between`}
                >
                  <div className="flex gap-1">
                    <RiTeamLine size={16} color="black" />
                    <span className="text-xs text-black">
                      Guests:{" "}
                      {`${data?.cart?.quantityAdult} Adult - ${data?.cart?.quantityChildren} Children`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            data?.bookingdetails?.map((item: any) => (
              <div
                className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}
              >
                {/* Bagian atas: kategori dan status */}
                <div className="flex justify-between items-center">
                  <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                    {roomHotel || item?.cart?.roomHotel ? (
                      <RiHome3Line size={18} color="#ffff" />
                    ) : (
                      <RiGlassesLine size={18} color="#ffff" />
                    )}
                    <span className="text-xs font-semibold text-white">
                      {roomHotel || item?.cart?.roomHotel
                        ? "Hotel"
                        : "Destination"}
                    </span>
                  </div>

                  <div
                    className={`${mediumMontserrat.className} flex items-center`}
                  >
                    <div
                      className={`border-2 border-solid border-[#DBDBDB] ${
                        payment?.status || item?.payment?.status === "PENDING"
                          ? "bg-[#FFD600] border-[#FFD600]"
                          : "bg-[#cbbef4] border-[#DBDBDB]"
                      } rounded-xl py-1 px-5 w-max mr-2`}
                    >
                      <span
                        className={`text-xs font-semibold ${
                          payment?.status || item?.payment?.status === "PENDING"
                            ? "text-[#DC143C]"
                            : "text-[#4F28D9]"
                        }`}
                      >
                        {payment?.status || item?.payment?.status === "PENDING"
                          ? "Waiting for Payment"
                          : "Done"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bagian tengah: gambar dan detail hotel/destinasi */}
                <div className="flex items-center gap-2 py-3">
                  <Link
                    href={`/profile/bookings/detail/${
                      data?.booking?.id || item?.id
                    }`}
                  >
                    <Image
                      src={
                        "https://imgs.search.brave.com/hoIxdncmtwEaAIJzTZljZdl4LAfd52BAD3Bo_qMxTjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby90/dmxrL2Jsb2cvMjAy/MS8wMi9IdXRhbi1C/YW1idS1QZW5nbGlw/dXJhbi1zaHV0dGVy/c3RvY2tfMTAxMzEz/MTAwNi5qcGc_dHI9/ZHByLTEuNSxoLTQ4/MCxxLTQwLHctMTAy/NA"
                      }
                      alt={destination?.name || roomHotel?.name}
                      width={100}
                      height={100}
                      className="rounded-xl w-44"
                    />
                  </Link>

                  <div
                    className={`${mediumMontserrat.className} flex flex-col gap-1`}
                  >
                    <Link
                      href={`/profile/bookings/detail/${
                        data?.booking?.id || item?.id
                      }`}
                      className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                    >
                      {destination?.name ||
                        roomHotel?.name ||
                        item?.cart?.destination?.name ||
                        item?.cart?.roomHotel?.name}
                    </Link>

                    {roomHotel || item?.cart?.roomHotel === "Hotel" ? (
                      <div className="flex items-center gap-1">
                        <RiMapPin2Line size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {roomHotel?.address || item?.cart?.roomHotel?.address}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <RiMapPin2Line size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {destination?.address ||
                            item?.cart?.destination?.address}
                        </span>
                      </div>
                    )}

                    {roomHotel || item?.cart?.roomHotel === "Hotel" ? (
                      <div className="flex items-center gap-1">
                        <LuFeather size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {/* {item.HotelTotalReviews} */}0 reviews
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <LuFeather size={16} color="#6b7280 " />
                        <span className="text-xs text-gray-500">
                          {/* {item.DestinationTotalReviews} */}0 reviews
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`${mediumMontserrat.className} flex flex-col gap-1`}
                >
                  {roomHotel ||
                    (item?.cart?.roomHotel === "Hotel" && (
                      // && item.HotelRoomType
                      <span className="text-sm font-semibold text-[#4F28D9]">
                        {/* {item.HotelRoomType} */}
                        Room Type
                      </span>
                    ))}

                  <div className="flex items-center gap-1">
                    <RiCalendarLine size={16} color="black " />
                    <span className="text-xs text-black">
                      {roomHotel === "Hotel" ||
                      item?.cart?.roomHotel === "Hotel"
                        ? `${new Date(
                            item?.cart?.startDate
                          ).toLocaleDateString()} - ${new Date(
                            item?.cart?.endDate
                          ).toLocaleDateString()}`
                        : `${new Date(
                            item?.cart?.startDate || data?.cart?.startDate
                          ).toLocaleDateString()} - ${new Date(
                            item?.cart?.endDate || data?.cart?.endDate
                          ).toLocaleDateString()}`}
                    </span>
                  </div>

                  <div
                    className={`${mediumMontserrat.className} flex justify-between`}
                  >
                    <div className="flex gap-1">
                      <RiTeamLine size={16} color="black" />
                      <span className="text-xs text-black">
                        Guests:{" "}
                        {`${
                          data?.cart?.quantityAdult || item?.cart?.quantityAdult
                        } Adult - ${
                          data?.cart?.quantityChildren ||
                          item?.cart?.quantityChildren
                        } Children`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Form Title */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ title: "", description: "", email: "" }}
        >
          {/* Input Title */}
          <div className="">
            <h1 className="text-lg font-semibold">Title</h1>
            <Form.Item
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input
                placeholder="Enter your title..."
                // value={userTitle}
                // onChange={(e) => setUserTitle(e.target.value)}
                className="w-full mt-2"
              />
            </Form.Item>
          </div>

          {/* Input Description */}
          <div className="">
            <h1 className="text-lg font-semibold">Description</h1>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Description is required" },
                {
                  max: 500,
                  message: "Description cannot exceed 500 characters",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Write your description here..."
                // value={userDescription}
                // onChange={(e) => setUserDescription(e.target.value)}
                className="w-full mt-2"
              />
            </Form.Item>
          </div>

          {/* Upload Photo/Video */}
          <div className="">
            <h1 className="text-lg font-semibold">
              Add Photo/Video (Optional)
            </h1>
            <div className="flex items-center gap-4">
              <Upload
                beforeUpload={handleBeforeUpload}
                onRemove={(file) => handleRemove(file as RcFile)}
                showUploadList={false}
                accept="image/*,video/*"
                className="w-72"
              >
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-64 cursor-pointer w-full">
                  <div className="flex flex-col items-center justify-center px-20">
                    <CiCamera className="text-gray-500" size={32} />
                    <p className="text-gray-500 text-sm">Click to upload</p>
                  </div>
                </div>
              </Upload>

              {/* Preview uploaded images/videos */}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {previewImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-full overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Uploaded file ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover w-64 h-64"
                      />
                      <div
                        className="absolute top-0 right-0 p-1 cursor-pointer bg-red-500 text-white rounded-full"
                        onClick={() => handleRemove(fileList[index])}
                      >
                        &times;
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Input Email */}
          <div className="">
            <h1 className="text-lg font-semibold">Email</h1>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="Enter your email..."
                // value={userEmail}
                // onChange={(e) => setUserEmail(e.target.value)}
                className="w-full mt-1"
              />
            </Form.Item>
          </div>

          {/* Actions */}
          <div className="pt-12 flex justify-between w-full">
            <Link
              href={"/profile"}
              className="border border-solid border-[#4F28D9] rounded-xl py-2 px-5 w-max flex items-center gap-1 2xl:gap-2 text-xs text-[#4F28D9] no-underline font-semibold"
            >
              Return
            </Link>

            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#4F28D9] border-[#DBDBDB] rounded-xl py-2 px-5 text-white text-xs font-semibold"
              onClick={() => {
                setTimeout(() => {
                  router.push("/profile/bookings");
                }, 5000);
              }}
            >
              Submit your report
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
