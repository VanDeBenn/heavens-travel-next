"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { RiArrowRightSLine, RiNewspaperLine } from "react-icons/ri";
import Loading from "#/app/loading";
import { destinationRepository } from "#/repository/destinations";
import { title } from "process";

interface dataDestination {
  id: string;
  blogs: dataBlog[];
  name: string;
  pathPhoto: string;
  createdAt: string;
}

interface dataBlog {
  id: string;
  title: string;
  pathPhoto: string;
  createdAt: string;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function NewsFrom({ data }: { data: dataDestination }) {
  const [blogs, setBlogs] = useState<dataBlog[]>([]);

  useEffect(() => {
    // Set blogs data from the destination data
    if (data?.blogs) {
      setBlogs(data.blogs);
    }
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  // const [dataDestination, setDataDestinations] = useState<any[]>([]);

  // const fetchAllDestination = async () => {
  //   const res = await destinationRepository.api.getDestinations();
  // };

  // useEffect (() => {
  //   fetchAllDestination()
  // }, []);

  console.log("data:", data);
  // console.log(blog);
  // const NewsFrom = dataDestination.filter(
  //   (item: any) => item.blog?.title == blog
  // );

  console.log("news", NewsFrom);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2`}
          >
            <RiNewspaperLine className="text-3xl text-RoyalAmethyst-700" />
            <span className="text-xl font-semibold">
              Exciting News from {data.name}
            </span>
          </div>
          <span
            className={`${mediumMontserrat.className} text-base text-black`}
          >
            filled with wonders and new marvels at every turn.{" "}
          </span>
        </div>

        <div className={`${mediumMontserrat.className} `}>
          <Link
            href="/blog/list"
            className="border-solid border-RoyalAmethyst-700 border hover:bg-RoyalAmethyst-700 hover:border-gray-300 transition-all duration-300 px-7 py-2 rounded-xl no-underline group flex items-center "
          >
            <span className="text-RoyalAmethyst-700 text-sm font-semibold group-hover:text-white transition-all duration-300 ">
              Read Inspiring Articles 
            </span>
            <RiArrowRightSLine className="text-2xl text-RoyalAmethyst-700 group-hover:text-white transition-all duration-300 " />
          </Link>
        </div>
      </div>

      {/* Card News */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
      {blogs.sort(() => 0.5 - Math.random())
          .slice(0, 4)
          .map((item: dataBlog) => (
          <div
            key={item.id}
            // href={card.link}
            //yang bener buat abang beckend
            // href={`/news/popular/${index}`}
          >
            <div className="relative bg-white border border-gray-200 rounded-xl  ">
              <Link href={`/blog/list/detail/${item.id}`}>
                <div className="relative w-full h-[440px]">
                  <Image
                    src={"/images/illustration/hawaii-beach.jpg"}
                    alt={item.title}
                    // width={300}
                    // height={300}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0  rounded-xl "
                  />
                </div>
              </Link>

              <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 p-3 rounded-md border-solid border-gray-200 border">
                <div className="flex flex-col">
                  <Link
                    href={''}
                    className="text-base font-semibold mb-1 leading-5 text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline"
                  >
                    {item.title}
                  </Link>
                  <span className="text-xs text-gray-600">
                  {`${formatDate(item.createdAt)}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const DiscoverData = [
  {
    title:
      "The Ultimate Guide to Experiencing Hawaii’s Natural Beauty and Adventure",
    date: "August 25, 2024",
    imageSrc: "/images/illustration/ocean-sky.jpg",
    description:
      "Unveil the secrets of Hawaii's hidden waterfalls, tucked away in lush jungles and accessible only to those willing to explore.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii’s Volcanic Landscapes: A Photographer’s Dream",
    date: "August 24, 2024",
    imageSrc: "/images/illustration/mount-batur.jpg",
    description:
      "Capture the dramatic beauty of Hawaii’s volcanic landscapes with tips from top photographers.",
    link: "/blog/list/detail",
  },
  {
    title: "Hawaii's Marine Life: Dive into a Blue Wonderland",
    date: "August 23, 2024",
    imageSrc: "/images/illustration/vertical-aerial.jpg",
    description:
      "Explore Hawaii’s vibrant underwater world, home to a rich array of marine life and colorful coral reefs.",
    link: "/blog/list/detail",
  },
  {
    title: "A Journey Through Hawaii's Cultural Heritage",
    date: "August 22, 2024",
    imageSrc: "/images/illustration/7708552_1280.jpg",
    description:
      "Learn about Hawaii's rich cultural heritage, from ancient traditions to modern-day practices that define the islands.",
    link: "/blog/list/detail",
  },
];
