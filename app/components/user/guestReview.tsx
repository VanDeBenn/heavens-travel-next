"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiStarFill,
  RiStarLine,
} from "react-icons/ri";
import "keen-slider/keen-slider.min.css";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { GB, ID, MY } from "country-flag-icons/react/3x2";

// Load Montserrat font with specific weight
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

// Interface for guest review data
interface GuestReviewData {
  name: string;
  country: string;
  countryFlag: JSX.Element;
  rating: number;
  date: string;
  review: string;
  images: string[];
}

const reviewsData: GuestReviewData[] = [
  {
    name: "Pitung",
    country: "United Kingdom",
    countryFlag: (
      <GB title="United Kingdom" style={{ width: "19px", height: "19px" }} />
    ),
    rating: 5,
    date: "Nov 18, 2023",
    review:
      "A fantastic destination! The snorkeling was great, and the views were even better than expected.",
    images: [
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
    ],
  },
  {
    name: "John Doe",
    country: "Malaysia",
    countryFlag: (
      <ID title="Indonesia" style={{ width: "19px", height: "19px" }} />
    ),
    rating: 4,
    date: "Oct 25, 2023",
    review:
      "The experience was amazing! The cliffs and beaches were absolutely stunning, perfect for an adventure holiday.",
    images: [
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
    ],
  },
  {
    name: "Jane Smith",
    country: "Australia",
    countryFlag: (
      <MY title="Malaysia" style={{ width: "19px", height: "19px" }} />
    ),
    rating: 4,
    date: "Sep 12, 2023",
    review:
      "A fantastic destination! The snorkeling was great, and the views were even better than expected.",
    images: [
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
    ],
  },
  {
    name: "John",
    country: "Malaysia",
    countryFlag: (
      <ID title="Indonesia" style={{ width: "19px", height: "19px" }} />
    ),
    rating: 3,
    date: "Oct 25, 2023",
    review:
      "The experience was amazing! The cliffs and beaches were absolutely stunning, perfect for an adventure holiday.",
    images: [
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
    ],
  },
  {
    name: "Jane Smith",
    country: "Australia",
    countryFlag: (
      <MY title="Malaysia" style={{ width: "19px", height: "19px" }} />
    ),
    rating: 4,
    date: "Sep 12, 2023",
    review:
      "A fantastic destination! The snorkeling was great, and the views were even better than expected.",
    images: [
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
      "/images/illustration/mountainous-landscape-with-fog.jpg",
    ],
  },
  // Add more reviews as needed
];

// Calculate average rating and total reviews
const totalReviews = reviewsData.length;
const averageRating =
  reviewsData.reduce((acc, review) => acc + review?.rating, 0) / totalReviews;

interface ComponentProps {
  data: any;
}

export default function GuestReview({ data }: ComponentProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 15,
    },
    mode: "snap",
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // console.log(data?.reviews);
  return (
    <div className={`${mediumMontserrat.className} flex flex-col gap-3`}>
      <div className="flex flex-col gap-5 p-5 bg-white rounded-xl border border-gray-200 border-solid">
        <div className="flex justify-between">
          <div>
            <span className="text-black font-semibold text-lg">
              Guest Reviews
            </span>
            <div className="flex gap-3 items-center pt-4">
              <div className="bg-RoyalAmethyst-700 w-max h-10 rounded-3xl px-6 py-3 flex items-center justify-center">
                <span className="text-white text-lg">
                  {averageRating.toFixed(1)}/5
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-RoyalAmethyst-700 font-bold text-base">
                  {averageRating >= 4 ? "Good" : "Average"}
                </span>
                <span className="text-gray-500 font-semibold text-base">
                  {totalReviews} reviews
                </span>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={"/images/illustration/Traveler.png"}
              alt="illustration"
              height={300}
              width={300}
              className="w-32 h-28"
            />
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {data?.reviews.map((review: any) => (
              <div
                key={review?.id}
                className="keen-slider__slide flex flex-col items-center justify-center bg-[#F5F7FA] border-solid border-gray-200 border rounded-xl p-5"
              >
                <div className="w-full flex gap-3">
                  <FaUserCircle className="text-3xl" />
                  <div className="flex w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <div>
                        <div className="flex justify-between w-full">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-black text-base">
                              {review?.user?.fullName}
                            </span>
                            {/* {review?.countryFlag} */}
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, idx) =>
                              idx < review?.rating ? (
                                <RiStarFill
                                  key={idx}
                                  className="text-[#FFD700]"
                                />
                              ) : (
                                <RiStarLine
                                  key={idx}
                                  className="text-[#FFD700]"
                                />
                              )
                            )}
                          </div>
                        </div>

                        <span className="text-sm text-gray-500">
                          {new Date(review?.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <div className="flex gap-3 items-end">
                          {review?.photoreviews.map((item: any) => (
                            <Image
                              key={item?.id}
                              src={`http://localhost:3222/photo-reviews/${item?.pathPhoto}`}
                              alt={`Review Image ${item?.id}`}
                              height={200}
                              width={300}
                              className="rounded-xl w-16 h-12"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-black text-sm">
                        {review?.comment}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 border-solid border-RoyalAmethyst-700 border text-RoyalAmethyst-700 rounded-full p-1 flex items-center justify-center"
            onClick={() => instanceRef.current?.prev()}
          >
            <RiArrowLeftLine className="text-xl" />
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 border-solid border-RoyalAmethyst-700 border text-RoyalAmethyst-700 rounded-full p-1 flex items-center justify-center"
            onClick={() => instanceRef.current?.next()}
          >
            <RiArrowRightLine className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
