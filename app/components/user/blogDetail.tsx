"use client";
import React, { useState, useRef } from "react";
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

export default function BlogDetail() {
  const [showShareButtons, setShowShareButtons] = useState(false);
  const inputRef = useRef(null); // Ref untuk input teks

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
        <div className="flex flex-col  gap-4">
          <div className="flex items-center w-full">
            <Input
              ref={inputRef}
              // value={'https://htrip.com/blog/details-blog#hawaii'}
              // menggunakan array dibawah boss
              value={Detail[0].link}
              readOnly
              className="mr-2"
            />
            <CopyOutlined
              onClick={copyToClipboard}
              className="text-lg cursor-pointer"
            />
          </div>
          <div className="flex gap-3">
            <FacebookShareButton url={Detail[0].link}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <TwitterShareButton url={Detail[0].link} title={Detail[0].title}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            <WhatsappShareButton url={Detail[0].link} title={Detail[0].title}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>
            <TelegramShareButton url={Detail[0].link} title={Detail[0].title}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>
            <FacebookMessengerShareButton
              url={Detail[0].link}
              title={Detail[0].title}
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
          Hawaii
        </a>
      </div>

      <div className="my-5 h-px bg-gray-300"></div>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Blog Detail Section */}
        <div className="flex-1 lg:w-4/5 p-4 bg-white rounded-xl">
          {Detail.slice(0, 1).map((Details, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-2xl font-bold mb-4">{Details.title}</span>
              <div className="relative w-full mb-4">
                <Image
                  alt="News Image"
                  src={Details.imageSrc}
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
                {Details.description.map((paragraph, i) => (
                  <p key={i} className="mb-4 font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex items-center text-gray-500">
                <CalendarOutlined size={26} className="mr-2" />
                <span>{Details.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Popular News Section */}
        <div className="lg:w-1/5 bg-white rounded-xl p-3 ">
          <PopularNews />
        </div>
      </div>
    </div>
  );
}

const Detail = [
  {
    title: "The Ultimate Guide to Experiencing Hawaii’s Natural Beauty and Adventure",
    date: "August 25, 2024",
    imageSrc: "/images/illustration/hawaii-beach.jpg",
    description: [
      "Hawaii, an archipelago located in the Pacific Ocean, is renowned for its breathtaking natural beauty, unique culture, and warm tropical climate. Each island offers a distinct experience, from the volcanic landscapes of the Big Island to the lush rainforests and stunning waterfalls of Kauai. Hawaii's diverse ecosystems provide a haven for nature lovers, with opportunities to explore everything from pristine beaches and coral reefs to dense jungles and active volcanoes.",
      "One of Hawaii's most captivating features is its waterfalls. The islands are home to some of the world's most beautiful and secluded waterfalls, many of which can be found hidden within lush tropical forests. These waterfalls range from the easily accessible Rainbow Falls on the Big Island, which offers stunning views just a short walk from the parking area, to more remote locations like the towering Honokohau Falls on Maui, accessible only by helicopter.",
      "The island of Kauai, often referred to as the 'Garden Isle,' boasts some of Hawaii's most impressive waterfalls. Wailua Falls, famously featured in the opening credits of the TV show 'Fantasy Island,' plunges 80 feet into a beautiful pool below and is surrounded by dense jungle. Hanakapiai Falls, located on the Na Pali Coast, requires a challenging hike to reach but rewards adventurers with a majestic 300-foot cascade and a serene swimming area.",
      "Beyond its waterfalls, Hawaii is known for its vibrant marine life and crystal-clear waters, making it a premier destination for snorkeling and diving. The coral reefs surrounding the islands are teeming with colorful fish, sea turtles, and other marine creatures. The island of Maui offers exceptional snorkeling spots like Molokini Crater, a partially submerged volcanic caldera that hosts an abundance of marine life and provides excellent visibility.",
      "Hawaii's rich cultural heritage is another major draw for visitors. The islands have a deep-rooted history influenced by Polynesian traditions, which can be seen in the local customs, music, dance, and cuisine. Visitors can experience a traditional luau, where they can enjoy Hawaiian dishes such as poi, kalua pig, and lomi-lomi salmon, while watching performances of hula and fire dancing that tell stories of the islands' past.",
      "For those seeking adventure, Hawaii offers numerous outdoor activities beyond its waterfalls and beaches. Hiking through lush rainforests, exploring volcanic craters, and surfing some of the best waves in the world are just a few of the experiences that await visitors. The diverse landscapes of Hawaii make it a paradise for outdoor enthusiasts and provide endless opportunities to connect with nature and discover the beauty of the islands.",
    ],
    link: "https://htrip.com/blog/details-blog#hawaii",
  },
];
