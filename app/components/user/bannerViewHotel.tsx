import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import {
  RiStarFill,
  RiStarLine,
  RiShareFill,
  RiBookmarkLine,
  RiBookmarkFill,
} from "react-icons/ri";
import Link from "next/link";
import { Image } from "antd"; // Import Image dari Ant Design

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

const BannerViewHotel = ({
  scrollToChooseRoom,
}: {
  scrollToChooseRoom: () => void;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-6`}>
        {/* title and address */}
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-lg">{hotelDetails[0].title}</span>
          <div className="flex gap-1">
            {/* Render 5 stars: filled for rating, empty for unfilled */}
            {Array.from({ length: 5 }, (_, index) =>
              index < hotelDetails[0].rating ? (
                <RiStarFill key={index} className="text-[#FFD700]" /> // Full star for rating
              ) : (
                <RiStarLine key={index} className="text-[#FFD700]" /> // Empty star for unfilled rating
              )
            )}
          </div>
        </div>
        {/* end title and address */}

        {/* deal */}
        <div className="flex justify-between items-center">
          <span className="text-xs">
            {hotelDetails[0].address} -
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
              {hotelDetails[0].price}
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
            <div className="h-10 w-10 bg-black/60 rounded-full cursor-pointer flex items-center justify-center">
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

          {/* Main Image */}
          <div className="w-3/6 rounded-xl">
            <Image.PreviewGroup>
              <Image
                src={hotelDetails[0].images[0].src}
                alt={hotelDetails[0].images[0].alt}
                className="rounded-xl w-full h-auto"
              />
            </Image.PreviewGroup>
          </div>

          {/* Additional Images */}
          <div className="grid grid-cols-2 gap-2 w-3/6">
            <Image.PreviewGroup>
              {hotelDetails[0].images.slice(1, 5).map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  className="rounded-xl w-full h-auto"
                />
              ))}
            </Image.PreviewGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerViewHotel;
