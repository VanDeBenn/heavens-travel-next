"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  CalendarOutlined,
  ShareAltOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Modal, Input, message } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from "react-share";
import PopularNews from "../../components/user/popularNews";
import Image from "next/image";
import Loading from "#/app/loading";
import { blogRepository } from "#/repository/blogs";

interface ComponentsProps {
  data: any;
}

export default function BlogDetail({ data }: ComponentsProps) {
  const [showShareButtons, setShowShareButtons] = useState(false);
  const inputRef = useRef(null); // Ref untuk input teks

  const getAllBlog = async () => {
    const res = await blogRepository.api.getBlogs()
    console.log(res)
  };

  useEffect(() => {
    getAllBlog()
  });

  const handleShareClick = () => {
    setShowShareButtons(true);
  };

  const closeShareModal = () => {
    setShowShareButtons(false);
  };

  const copyToClipboard = () => {
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).select(); // Pilih teks dalam input
      document.execCommand("copy");
      message.success("Link copied to clipboard!");
    } else {
      message.error("Input reference is not available!");
    }
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="relative">
      {/* Modal for Share Buttons */}
      <Modal
        title="Share this article"
        visible={showShareButtons}
        onCancel={closeShareModal}
        footer={null}
        centered
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center w-full">
            <Input
              ref={inputRef}
              value={"/images/illustration/hawaii-beach.jpg"} // Mengambil link dari data API
              readOnly
              className="mr-2"
            />
            <CopyOutlined
              onClick={copyToClipboard}
              className="text-lg cursor-pointer"
            />
          </div>
          <div className="flex gap-3">
            <FacebookShareButton url={"/images/illustration/hawaii-beach.jpg"}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={"/images/illustration/hawaii-beach.jpg"}
              title={data?.title}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={"/images/illustration/hawaii-beach.jpg"}
              title={data?.title}
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <TelegramShareButton
              url={"/images/illustration/hawaii-beach.jpg"}
              title={data?.title}
            >
              <TelegramIcon size={40} round />
            </TelegramShareButton>
            <FacebookMessengerShareButton
              url={"/images/illustration/hawaii-beach.jpg"}
              title={data?.title}
              appId={""}
            >
              <FacebookMessengerIcon size={40} round />
            </FacebookMessengerShareButton>
          </div>
        </div>
      </Modal>

      <div className="flex gap-3">
        <a href="/" className="no-underline text-black">
          home
        </a>
        /
        <a href="/blog" className="no-underline text-black">
          blog
        </a>
        /
        <a href="/blog/list" className="no-underline text-black">
          list
        </a>
        /
        <a href="" className="no-underline text-black">
          {data?.title}
        </a>
      </div>

      <div className="my-5 h-px bg-gray-300"></div>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Blog Detail Section */}
        <div className="flex-1 lg:w-4/5 p-4 bg-white rounded-xl">
          <div className="flex flex-col">
            <span className="text-2xl font-bold mb-4">{data?.title}</span>
            <div className="relative w-full mb-4">
              <Image
                alt="News Image"
                src={"/images/illustration/hawaii-beach.jpg"} // Gambar default jika pathPhoto kosong
                className="w-full rounded-xl"
                width={1280}
                height={500}
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-60 rounded-full">
                <ShareAltOutlined
                  className="text-white p-2 rounded-full cursor-pointer"
                  onClick={handleShareClick}
                />
              </div>
            </div>
            <div className="text-gray-700 my-4">
              <p className="mb-4 font-medium">{data?.description}</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarOutlined size={26} className="mr-2" />
              <span>{new Date(data?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Popular News Section */}
        <div className="lg:w-1/5 bg-white rounded-xl p-3">
          <PopularNews />
        </div>
      </div>
    </div>
  );
}
