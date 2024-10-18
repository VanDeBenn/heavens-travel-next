"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiNewspaperLine } from "react-icons/ri";
import PopularNews from "../../components/user/popularNews";

export default function News() {
  return (
    <div className="py-5 flex flex-col items-center">
      {/* News Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
        <div className="lg:col-span-4">
          <div className="flex items-center mb-4">
            <RiNewspaperLine size={26} color="#4F28D9" className="mr-2" />
            <span className="text-xl font-semibold">News</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
            {cardData.slice(0, 8).map((card, index) => (
              <div
                key={index}
                // href={card.link}
                //yang bener buat abang beckend
                // href={`/news/popular/${index}`}
              >
                <div className="relative bg-white border border-gray-200 rounded-xl  ">
                  <Link href={card.link}>
                    <div className="relative w-full h-[400px]">
                      <Image
                        src={card.imageSrc}
                        alt={card.title}
                        // width={300}
                        // height={300}
                        layout="fill"
                        objectFit="cover"
                        className="absolute inset-0  rounded-xl "
                      />
                    </div>
                  </Link>

                  <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-3 rounded-md shadow-md">
                    <div className="flex flex-col">
                      <Link
                        href={card.link}
                        className="text-base font-semibold mb-1 leading-4 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                      >
                        {card.title}
                      </Link>
                      <span className="text-xs text-gray-600">{card.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button Section */}
          <div className="flex justify-center mt-6">
            <Link
              href={"/blog/list"}
              className="bg-[#ffffff] text-RoyalAmethyst-700 px-11 py-3 no-underline font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-RoyalAmethyst-700 hover:text-white shadow-lg"
            >
              See more
            </Link>
          </div>
        </div>

        {/* Popular News Section */}
        <div className="lg:col-span-1">
          <PopularNews />
        </div>
      </div>
    </div>
  );
}

export const cardData = [
  {
    title: "The Ultimate Guide to Experiencing Hawaii’s Natural Beauty and Adventure",
    date: "August 25, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Unveil the secrets of Hawaii's hidden waterfalls, tucked away in lush jungles and accessible only to those willing to explore.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii’s Volcanic Landscapes: A Photographer’s Dream",
    date: "August 24, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Capture the dramatic beauty of Hawaii’s volcanic landscapes with tips from top photographers.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii's Marine Life: Dive into a Blue Wonderland",
    date: "August 23, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Explore Hawaii’s vibrant underwater world, home to a rich array of marine life and colorful coral reefs.",
    link: "/blog/list/detail",
  },
  {
    title: "A Journey Through Hawaii's Cultural Heritage",
    date: "August 22, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Learn about Hawaii's rich cultural heritage, from ancient traditions to modern-day practices that define the islands.",
    link: "/blog/list/detail",
  },
  {
    title: "The Best Hiking Trails in Hawaii for Adventure Seekers",
    date: "August 21, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Find the best hiking trails in Hawaii for adventure seekers looking to experience the islands' rugged terrain and stunning views.",
    link: "/blog/list/detail",
  },
  {
    title: "Experience Hawaii's Unique Local Cuisine",
    date: "August 20, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Taste the unique flavors of Hawaiian cuisine, blending traditional ingredients with influences from around the world.",
    link: "/blog/list/detail",
  },
  {
    title: "The Ultimate Guide to Island Hopping in Hawaii",
    date: "August 19, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Plan the perfect island-hopping adventure in Hawaii, from transportation tips to must-see destinations on each island.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii's Nightlife: From Luaus to Beach Parties",
    date: "August 18, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Discover the best of Hawaii's nightlife, from traditional luaus to vibrant beach parties that keep the islands lively after dark.",
    link: "/blog/list/detail",
  },
  {
    title: "Sustainable Tourism in Hawaii: Protecting Paradise",
    date: "August 17, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Learn how to enjoy Hawaii's natural beauty while supporting sustainable tourism efforts to protect the islands for future generations.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii’s Top Luxury Resorts for a Dream Vacation",
    date: "August 16, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Indulge in the ultimate luxury experience at Hawaii's top resorts, offering world-class amenities and breathtaking views.",
    link: "/blog/list/detail",
  },
  {
    title: "Family Fun in Hawaii: Activities for All Ages",
    date: "August 15, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Find the best family-friendly activities in Hawaii, from beach outings to cultural experiences that everyone will enjoy.",
    link: "/blog/list/detail",
  },
  {
    title: "Why Hawaii is the Best Destination for Solo Travelers",
    date: "August 14, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    description:
      "Discover why Hawaii is a top destination for solo travelers seeking adventure, relaxation, and a welcoming community.",
    link: "/blog/list/detail",
  },
];

export const popularNewsData = [
  {
    title: "Hawaii’s Top Surfing Spots You Must Visit",
    date: "August 13, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    link: "/blog/list/detail",
  },
  {
    title: "Exploring Hawaii’s National Parks: A Visitor’s Guide",
    date: "August 12, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    link: "/blog/list/detail",
  },
  {
    title: "The History and Legends of Hawaii’s Volcanoes",
    date: "August 11, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii’s Best Spots for Snorkeling and Diving",
    date: "August 10, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    link: "/blog/list/detail",
  },
  {
    title: "Experience Hawaii’s Unique Wildlife Up Close",
    date: "August 9, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii’s Cultural Festivals You Don’t Want to Miss",
    date: "August 8, 2024",
    imageSrc: "/images/illustration/hawaii.jpg",
    link: "/blog/list/detail",
  },
];
