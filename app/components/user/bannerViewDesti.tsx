"use client";
import React, { useState } from "react";
import { Carousel, Modal, Image } from "antd";
import {
  RiShareFill,
  RiBookmarkFill,
  RiBookmarkLine,
  RiFacebookFill,
  RiTwitterFill,
  RiWhatsappFill,
  RiMailFill,
  RiTelegramFill,
  RiFileCopyFill,
  RiFileCopyLine,
} from "react-icons/ri";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";

export default function BannerViewDesti() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const copyText =
    "https://htrip.com/destination/detail/673c0710-15f8-c0ddf3df7be9";
  const title = "Check out this amazing destination!";

  const images = [
    "/images/illustration/ocean-4076551_1920.jpg",
    "/images/illustration/surfing-2686450_1920.jpg",
    "/images/illustration/bird-9078403_1920.jpg",
    "/images/illustration/shipwreck-7334280_1920.jpg",
  ];

  const handleShareClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full relative">
      <Carousel autoplay dots className="rounded-xl overflow-hidden h-[500px]">
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              preview={{
                src,
              }}
              className="w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute top-5 left-5 flex gap-2 z-10">
        {/* Share Icon */}
        <div
          className="h-10 w-10 bg-black/60 rounded-full cursor-pointer flex items-center justify-center"
          onClick={handleShareClick}
        >
          <RiShareFill className="text-white text-lg" />
        </div>

        {/* Bookmark Icon */}
        <div
          className={`h-10 w-10 rounded-full cursor-pointer flex items-center justify-center bg-black/60`}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          {isBookmarked ? (
            <RiBookmarkFill className="text-RoyalAmethyst-700 text-lg" />
          ) : (
            <RiBookmarkLine className="text-white text-lg" />
          )}
        </div>
      </div>
      {/* Share Modal */}
      <Modal
        title="Share this destination"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
      >
        <div className="flex flex-col">
          <div className="flex gap-4">
            <FacebookShareButton url={copyText}>
              <RiFacebookFill className="text-[#4267B2] text-3xl" />
            </FacebookShareButton>
            <TwitterShareButton url={copyText} title={title}>
              <RiTwitterFill className="text-[#1DA1F2] text-3xl" />
            </TwitterShareButton>
            <WhatsappShareButton url={copyText} title={title}>
              <RiWhatsappFill className="text-[#25D366] text-3xl" />
            </WhatsappShareButton>
            <EmailShareButton url={copyText} subject={title}>
              <RiMailFill className="text-gray-600 text-3xl" />
            </EmailShareButton>
            <TelegramShareButton url={copyText}>
              <RiTelegramFill className="text-[#1d44f2] text-3xl" />
            </TelegramShareButton>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={copyText}
              readOnly
              className="bg-white border-2 border-solid border-gray-400 rounded-lg p-2 w-full"
            />
            <div
              onClick={handleCopyToClipboard}
              className="flex items-center gap-1 p-2 bg-white rounded-lg cursor-pointer border-2 border-solid border-gray-400"
            >
              {isCopied ? (
                <>
                  <RiFileCopyFill className="text-RoyalAmethyst-700" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <RiFileCopyLine />
                  <span>Copy</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
