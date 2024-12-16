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

import { Rate, Input, Upload, message, Form, Button } from "antd"; // Import Upload dari Ant Design
import { usePathname, useRouter } from "next/navigation";
import { bookingDetailRepository } from "#/repository/bookingDetail";
import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "./myBooking";
import { RcFile } from "antd/es/upload";
import { reviewRepository } from "#/repository/review";

export default function Review() {
  const [bookingDetailData, setBookingDetailData] = useState<any>();
  const [reviewId, setReviewId] = useState<any>();
  const router = useRouter();
  const [form] = Form.useForm();
  const pathname = usePathname();
  if (!pathname) {
    return;
  }
  const pathSegments = pathname.split("/");
  const bookingDetailId = pathSegments[4];
  const destination = bookingDetailData?.cart?.destination || null;
  const roomHotel = bookingDetailData?.cart?.roomHotel || null;
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const getBookingDetail = async () => {
    try {
      const res = await bookingDetailRepository.api.getBookingDetail(
        bookingDetailId
      );
      setBookingDetailData(res.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const onFinish = async (values: any) => {
    try {
      const user = localStorage.getItem("_id");
      const dataBasicInfo = {
        rating: values.rating,
        comment: values.comment,
        userId: user,
        bookingDetailId: bookingDetailId,
      };

      // console.log("Submitted Data:", dataBasicInfo);
      // Call the API to submit the form data
      const req = await reviewRepository.api.create(dataBasicInfo);
      // console.log(req);
      setReviewId(req?.body?.data?.id);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  useEffect(() => {
    getBookingDetail();
  }, []);

  const handleUploadSingleFile = async (file: RcFile, id: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("reviewId", reviewId);

    try {
      setUploading(true);
      await reviewRepository.api.addPhotoReview(formData);
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
    if (reviewId) {
      handleUploadAllFiles();
      router.push("/profile/bookings");
    }
  }, [reviewId]);

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
      <div className="py-6 px-9">
        <span className="text-xl font-semibold">Review</span>
      </div>
      <div className="h-px bg-gray-300"></div>
      <div className="py-6 px-9 flex flex-col gap-6">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div>
            <h1 className="text-xl font-semibold">Rate your experience</h1>
            <Form.Item
              name="rating"
              initialValue={5}
              rules={[{ required: true, message: "Please provide a rating." }]}
            >
              <Rate allowHalf className="text-yellow-500" />
            </Form.Item>
          </div>

          <div className=" grid grid-cols-1">
            {/* {bookingItems.slice(0, 1).map((item, index) => {
            return ( */}
            <div
              // key={index}
              className={`p-3 border border-solid border-[#DBDBDB] rounded-xl`}
            >
              {/* Bagian atas: kategori dan status */}
              <div className="flex justify-between items-center">
                <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
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
                      bookingDetailData?.booking?.payment === "PENDING"
                        ? "bg-[#FFD600] border-[#FFD600]"
                        : "bg-[#cbbef4] border-[#DBDBDB]"
                    } rounded-xl py-1 px-5 w-max mr-2`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        bookingDetailData?.booking?.payment === "PENDING"
                          ? "text-InfernoEcho-600"
                          : "text-RoyalAmethyst-700"
                      }`}
                    >
                      {bookingDetailData?.booking?.payment === "PENDING"
                        ? "Waiting for Payment"
                        : "Done"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bagian tengah: gambar dan detail hotel/destinasi */}
              <div className="flex items-center gap-2 py-3">
                <Link href={""}>
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
                    href={""}
                    className="font-semibold no-underline text-black hover:text-RoyalAmethyst-700 duration-300 transition-all"
                  >
                    {destination?.name || roomHotel?.name}
                  </Link>

                  {roomHotel ? (
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

                  {roomHotel ? (
                    <div className="flex items-center gap-1">
                      <LuFeather size={16} color="#6b7280 " />
                      <span className="text-xs text-gray-500">{0} reviews</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <LuFeather size={16} color="#6b7280 " />
                      <span className="text-xs text-gray-500">{0} reviews</span>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`${mediumMontserrat.className} flex flex-col gap-1`}
              >
                {/* {roomHotel && ( */}
                {/* // && item.HotelRoomType */}
                <span className="text-sm font-semibold text-RoyalAmethyst-700">
                  {roomHotel?.name || destination?.name}
                  {/* {item.HotelRoomType} */}
                </span>
                {/* )} */}

                <div className="flex items-center gap-1">
                  <RiCalendarLine size={16} color="black " />
                  <span className="text-xs text-black">
                    {new Date(
                      bookingDetailData?.cart.startDate
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(
                      bookingDetailData?.cart.endDate
                    ).toLocaleDateString()}
                    {/* {roomHotel
                        ? item.HotelSchedule
                        : item.DestinationSchedule} */}
                  </span>
                </div>

                {/* {roomHotel && ( */}
                <div
                  className={`${mediumMontserrat.className} flex justify-between`}
                >
                  <div className="flex gap-1">
                    <RiTeamLine size={16} color="black" />
                    <span className="text-xs text-black">
                      Guests:{" "}
                      {`${bookingDetailData?.cart?.quantityAdult} Adult - ${bookingDetailData?.cart?.quantityChildren} Children`}
                    </span>
                  </div>
                </div>
                {/* )} */}
              </div>
            </div>
            {/* );
          })} */}
          </div>

          <div>
            <h1 className="mt-4 text-lg font-semibold">Your comment</h1>
            <Form.Item
              name="comment"
              rules={[
                { required: true, message: "Please enter your comment." },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Write your comment here..."
              />
            </Form.Item>
          </div>

          <div>
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
                    <div
                      key={index}
                      className="w-64 h-64 relative overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Preview ${index}`}
                        layout="fill"
                        className="object-cover rounded-xl"
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
              </div>
            </div>
          </div>

          <div className="pt-12 flex justify-between w-full">
            <Link
              href={"/profile"}
              className="border border-solid border-RoyalAmethyst-700 rounded-xl py-2 px-5 text-RoyalAmethyst-700 font-semibold"
            >
              Return
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="border bg-RoyalAmethyst-700 text-white rounded-xl py-2 px-5 font-semibold"
            >
              Submit your review
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
