"use client";

import React, { useState, useEffect } from "react";
import { Montserrat } from "next/font/google";
import {
  RiStarFill,
  RiStarLine,
  RiShareFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiFileCopyFill,
  RiInstagramLine,
  RiTelegramFill,
} from "react-icons/ri";
import Link from "next/link";
import { Image, Modal, Button, message } from "antd"; // Import Modal dan Button dari Ant Design
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from "react-share";
import {
  RiFacebookFill,
  RiTwitterFill,
  RiWhatsappFill,
  RiMailFill,
  RiFileCopyLine,
} from "react-icons/ri";
import { wishlistRepository } from "#/repository/wishlists";

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

// Type definition for hotel details
interface Hotel {
  title: string;
  address: string;
  mapLink: string;
  price: string;
  rating: number; // Add rating field
  images: { src: string; alt: string }[];
}

const hotelDetails: Hotel[] = [
  {
    title: "Wahid Borobudur",
    address:
      "Street Medang Kamulan, Dusun Janan Borobudur, Borobudur, Magelang, Indonesia, 56553",
    mapLink: "https://maps.app.goo.gl/o9cH4Qs4bRXWTbBy5",
    price: "Rp600.000",
    rating: 3, // Example rating (can be from 1 to 5)
    images: [
      {
        src: "/images/illustration/luxury-bedroom.jpg",
        alt: "bedroom",
      },
      {
        src: "/images/illustration/luxury-bedroom.jpg",
        alt: "bedroom",
      },
      {
        src: "/images/illustration/luxury-bedroom.jpg",
        alt: "bedroom",
      },
      {
        src: "/images/illustration/luxury-bedroom.jpg",
        alt: "bedroom",
      },
      {
        src: "/images/illustration/luxury-bedroom.jpg",
        alt: "bedroom",
      },
    ],
  },
];

interface ComponentProps {
  data: any;
  scrollToChooseRoom: () => void;
}

const BannerViewHotel = ({ data, scrollToChooseRoom }: ComponentProps) => {
  if (!data) {
    return;
  }
  const [copyText, setCopyText] = useState<string>("");

  const [isCopied, setIsCopied] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const shareUrl = "https://htrip.com/hotel/detail/673c0710-15f8-c0ddf3df7be9"; // URL yang akan dibagikan
  const title = hotelDetails[0].title;

  const user = localStorage.getItem("_id");

  useEffect(() => {
    // Set copyText dengan URL halaman saat ini
    setCopyText(window.location.href);
  }, []); // Hanya dijalankan sekali setelah render pertama

  const handleShareClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsCopied(false);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copyText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000); // Reset status setelah 3 detik
  };

  const handleWishlist = async () => {
    const payload = {
      userId: user,
      hotelId: data?.id,
      destinationId: null,
    };
    const remove = {
      hotelName: data?.name,
      userId: user,
    };
    if (isBookmarked) {
      const req = await wishlistRepository.api.remove(remove);
      if (req) {
        message.success("Wishlist Added Successfully");
      }
      console.log("REMOVE");
    } else {
      const req = await wishlistRepository.api.create(payload);
      if (req) {
        message.success("Wishlist Remove Successfully");
      }
      console.log("ADD");
    }
  };

  console.log(isBookmarked);
  // console.log("data", data);
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-6`}>
        {/* title and address */}
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-lg">{data?.name}</span>
          <div className="flex gap-1">
            {/* Render 5 stars: filled for rating, empty for unfilled */}
            {Array.from({ length: 5 }, (_, index) =>
              index < data?.rating ? (
                <RiStarFill key={index} className="text-[#FFD700]" />
              ) : (
                <RiStarLine key={index} className="text-[#FFD700]" />
              )
            )}
          </div>
        </div>
        {/* end title and address */}

        {/* deal */}
        <div className="flex justify-between items-center">
          <span className="text-xs">
            {`${data?.address}, ${data?.city?.name}, ${data?.city?.province?.name}, ${data?.city?.province?.country?.name}`}{" "}
            -{" "}
            <Link
              href={hotelDetails[0].mapLink}
              className="text-RoyalAmethyst-700 no-underline"
            >
              SEE MAP
            </Link>
          </span>

          <div className="flex gap-2 items-center">
            <span className="text-xs ">Start from</span>
            <span className="text-InfernoEcho-600 text-base font-semibold">
              Rp{data?.roomhotels[0]?.price}
            </span>

            <div
              onClick={scrollToChooseRoom}
              className="px-5 py-2 rounded-xl bg-RoyalAmethyst-700 cursor-pointer"
            >
              <span className="text-white">view this deal</span>
            </div>
          </div>
        </div>
        {/* end deal */}

        <div className="relative flex items-center gap-2 w-full mt-4">
          {/* Icons on the top-left corner of the first image */}
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
              onClick={() => {
                setIsBookmarked(!isBookmarked);
                handleWishlist();
              }}
            >
              {isBookmarked ? (
                <RiBookmarkFill className="text-RoyalAmethyst-700 text-lg" />
              ) : (
                <RiBookmarkLine className="text-white text-lg" />
              )}
            </div>
          </div>

          {/* Main Image */}
          <div className="w-3/6 rounded-xl">
            <Image.PreviewGroup>
              {data?.photohotels?.[0] && (
                <Image
                  src={`http://localhost:3222/photo-hotels/${data.photohotels[0].pathPhoto}`}
                  alt={hotelDetails[0]?.images?.[0]?.alt || "Main Image"}
                  className="rounded-xl w-full h-full object-cover"
                />
              )}
            </Image.PreviewGroup>
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-2 gap-2 w-3/6">
            <Image.PreviewGroup>
              {data?.photohotels?.slice(1)?.map((photo: any, index: number) => (
                <Image
                  key={index}
                  src={`http://localhost:3222/photo-hotels/${photo.pathPhoto}`}
                  alt={`Additional Image ${index + 1}`}
                  height={185}
                  className="rounded-xl w-full h-full object-cover"
                />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Modal
        title="Share this Hotel"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
      >
        <div className="flex flex-col">
          <div className="flex gap-4 r">
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
};

export default BannerViewHotel;
