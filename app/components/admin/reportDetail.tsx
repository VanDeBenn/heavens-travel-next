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
import { Montserrat } from "next/font/google";
import { Input, Upload, message, Form } from "antd";
import Loading from "#/app/loading";

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
  data: {
    id: string;
    title: string;
    description: string;
    email: string;
    pathPhoto: string[] | null;
    replyReport: string | null;
    bookingdetail: {
      cart: {
        quantityAdult: number;
        quantityChildren: number;
        startDate: string;
        endDate: string;
        destination?: {
          id: string;
          name: string;
          address: string;
          rating: number;
          description: string;
        };
        roomHotel?: any; // Add proper typing if hotel data structure is provided
      };
    };
  };
}

export default function ReportDetail({ data }: ComponentProps) {
  if (!data) {
    return <Loading />;
  }

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [form] = Form.useForm();

  const handleUpload = (options: { file: File }) => {
    const { file } = options;

    if (previewImages.length >= 3) {
      message.error("You can only upload up to 3 files.");
      return false;
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
    return false;
  };

  const handleSubmit = (values: any) => {
    // console.log("Form values:", values);
    message.success("Report replied successfully!");
    form.resetFields();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { cart } = data.bookingdetail;
  const isDestination = !!cart.destination;

  const reportInfo = [
    {
      label: "Report Title",
      value: data.title,
    },
    {
      label: "Description",
      value: data.description,
    },
    {
      label: "Email",
      value: data.email,
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-xl border-solid border-gray-200 border">
        <div className="py-6 px-9">
          <span className="text-xl font-semibold">Report Detail</span>
        </div>
        <div className="h-px bg-gray-300"></div>

        <div className="py-6 px-9 flex flex-col gap-3">
          <h1 className="text-xl font-semibold">Related Issue</h1>

          <div className="p-3 border border-solid border-[#DBDBDB] rounded-xl">
            <div className="flex justify-between items-center">
              <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                {isDestination ? (
                  <RiGlassesLine size={18} color="#ffff" />
                ) : (
                  <RiHome3Line size={18} color="#ffff" />
                )}
                <span className="text-xs font-semibold text-white">
                  {isDestination ? "Destination" : "Hotel"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 py-3">
              {/* Use a placeholder image or proper image path from your data */}
              <Image
                src="/images/illustration/bedroom-suite.jpg"
                alt={isDestination ? cart.destination?.name || "" : "Hotel"}
                width={100}
                height={100}
                className="rounded-xl w-44"
              />

              <div
                className={`${mediumMontserrat.className} flex flex-col gap-1`}
              >
                <span className="font-semibold text-black">
                  {isDestination ? cart.destination?.name : "Hotel Name"}
                </span>

                <div className="flex items-center gap-1">
                  <RiMapPin2Line size={16} color="#6b7280" />
                  <span className="text-xs text-gray-500">
                    {isDestination
                      ? cart.destination?.address
                      : "Hotel Address"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <RiCalendarLine size={16} color="black" />
                  <span className="text-xs text-black">
                    {`${formatDate(cart.startDate)} - ${formatDate(
                      cart.endDate
                    )}`}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <RiTeamLine size={16} color="black" />
                  <span className="text-xs text-black">
                    {`Adults: ${cart.quantityAdult}, Children: ${cart.quantityChildren}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${mediumMontserrat.className}`}>
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

          {/* Only show photos section if pathPhoto exists */}
          {data.pathPhoto && data.pathPhoto.length > 0 && (
            <div>
              <div className={`${mediumMontserrat.className} py-6`}>
                <span className="text-xl font-semibold">Photos</span>
              </div>
              <div className="h-px bg-gray-300"></div>

              <div
                className={`${mediumMontserrat.className} grid grid-cols-3 gap-4 pt-6`}
              >
                {data.pathPhoto.map((path, index) => (
                  <div key={index}>
                    <Image
                      src={path || ""}
                      alt={`Report photo ${index + 1}`}
                      width={400}
                      height={150}
                      className="w-full rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Form Section */}
      <div className="bg-white rounded-xl border-solid border-gray-200 border">
        <div className={`${mediumMontserrat.className} py-6 px-9`}>
          <span className="font-semibold text-lg">Reply Report</span>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="mt-4"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input your title!" }]}
            >
              <Input placeholder="Input title" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input.TextArea placeholder="Input description" rows={8} />
            </Form.Item>
          </Form>

          <div>
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
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-64 cursor-pointer w-full">
                  <div className="flex flex-col items-center justify-center px-20">
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

      <div className="flex justify-end">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/report"
            className="w-max border-solid border-RoyalAmethyst-700 border px-9 py-2 rounded-xl cursor-pointer no-underline"
          >
            <span className="font-semibold text-RoyalAmethyst-700 text-base">
              Back
            </span>
          </Link>
          <div className="w-max bg-RoyalAmethyst-700 px-9 py-2 rounded-xl cursor-pointer">
            <span className="text-white font-semibold text-base">Done</span>
          </div>
        </div>
      </div>
    </div>
  );
}
