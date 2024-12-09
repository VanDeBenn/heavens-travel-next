  "use client";

  import { Montserrat } from "next/font/google";
  import Image from "next/image";
  import Link from "next/link";
  import { Pagination } from "antd";
  import { RiMapPin2Fill, RiStarFill, RiStarHalfFill } from "react-icons/ri";
  import React, { useState } from "react";

  const mediumMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["500"],
  });

  // Define the HotelCard type
  type HotelCard = {
    id: number;
    text: string;
    imgSrc: string;
    link: string;
    desc: string;
    loc: string;
    price: string;
    stars: number;
  };

  export default function ResultDesti() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const cityData: { [key: string]: HotelCard[] } = {
      Asia: [
        {
          id: 1,
          text: "Ayana Resort and Spa",
          imgSrc: "/images/illustration/bali-indonesia.jpg",
          link: "/kota/bali",
          desc: "Experience luxury in the heart.",
          loc: "Ciledug",
          price: "Rp290.000",
          stars: 4.5,
        },
        {
          id: 2,
          text: "Four Seasons Resort",
          imgSrc: "/images/illustration/road-bridge.jpg",
          link: "/kota/bali",
          desc: "Discover tranquility in Ubud.",
          loc: "Kuala Lumpur",
          price: "Rp320.000",
          stars: 4,
        },
        {
          id: 3,
          text: "Oberoi Beach Resort",
          imgSrc: "/images/illustration/beautiful-church.jpg",
          link: "/kota/bali",
          desc: "A beachside paradise.",
          loc: "Hongkong",
          price: "Rp340.000",
          stars: 2.5,
        },
        {
          id: 4,
          text: "Alila Villas Uluwatu",
          imgSrc:
            "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
          link: "/kota/bali",
          desc: "Enjoy the vibrant Kuta Beach.",
          loc: "Bali",
          price: "Rp310.000",
          stars: 4,
        },
        {
          id: 5,
          text: "Ayana Resort and Spa",
          imgSrc: "/images/illustration/bali-indonesia.jpg",
          link: "/kota/bali",
          desc: "Experience luxury in the heart.",
          loc: "Ciledug",
          price: "Rp290.000",
          stars: 4.5,
        },
        {
          id: 6,
          text: "Four Seasons Resort",
          imgSrc: "/images/illustration/road-bridge.jpg",
          link: "/kota/bali",
          desc: "Discover tranquility in Ubud.",
          loc: "Kuala Lumpur",
          price: "Rp320.000",
          stars: 4,
        },
        {
          id: 7,
          text: "Oberoi Beach Resort",
          imgSrc: "/images/illustration/beautiful-church.jpg",
          link: "/kota/bali",
          desc: "A beachside paradise.",
          loc: "Hongkong",
          price: "Rp340.000",
          stars: 2.5,
        },
        {
          id: 8,
          text: "Alila Villas Uluwatu",
          imgSrc:
            "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
          link: "/kota/bali",
          desc: "Enjoy the vibrant Kuta Beach.",
          loc: "Bali",
          price: "Rp310.000",
          stars: 4,
        },
        {
          id: 9,
          text: "Ayana Resort and Spa",
          imgSrc: "/images/illustration/bali-indonesia.jpg",
          link: "/kota/bali",
          desc: "Experience luxury in the heart.",
          loc: "Ciledug",
          price: "Rp290.000",
          stars: 4.5,
        },
        {
          id: 10,
          text: "Four Seasons Resort",
          imgSrc: "/images/illustration/road-bridge.jpg",
          link: "/kota/bali",
          desc: "Discover tranquility in Ubud.",
          loc: "Kuala Lumpur",
          price: "Rp320.000",
          stars: 4,
        },
        {
          id: 11,
          text: "Oberoi Beach Resort",
          imgSrc: "/images/illustration/beautiful-church.jpg",
          link: "/kota/bali",
          desc: "A beachside paradise.",
          loc: "Hongkong",
          price: "Rp340.000",
          stars: 2.5,
        },
        {
          id: 12,
          text: "Alila Villas Uluwatu",
          imgSrc:
            "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
          link: "/kota/bali",
          desc: "Enjoy the vibrant Kuta Beach.",
          loc: "Bali",
          price: "Rp310.000",
          stars: 4,
        },
      ],
    };

    const data = cityData["Asia"];
    const currentData = data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <div className="flex flex-col gap-6">
        {/* Grid card */}
        <div className="grid grid-cols-4 gap-4">
          {currentData.map((card) => (
            <div
              key={card.id}
              className="no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
            >
              <Link href={card.link} className="flex flex-col items-center">
                <Image
                  src={card.imgSrc}
                  alt={card.text}
                  className="h-52 w-full rounded-t-xl"
                  height={300}
                  width={300}
                />
              </Link>
              <div
                className={`${mediumMontserrat.className} px-4 pb-2 flex flex-col gap-2`}
              >
                <div className="flex justify-between gap-1">
                  <Link
                    href={card.link}
                    className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                  >
                    {card.text}
                  </Link>
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <React.Fragment key={index}>
                        {index + 0.5 < card.stars ? (
                          <RiStarFill className="text-[#FFD700] text-lg" />
                        ) : index < card.stars ? (
                          <RiStarHalfFill className="text-[#FFD700] text-lg" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPin2Fill className="text-lg text-gray-400" />
                  <span className="text-sm text-gray-400">{card.loc}</span>
                </div>
                <Link
                  href={card.link}
                  className="text-black text-base font-semibold no-underline leading-6"
                >
                  {card.desc}
                </Link>
                <div className="flex justify-end">
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-400 text-sm align-text-bottom">
                      Start from
                    </span>
                    <Link
                      href={card.link}
                      className="text-InfernoEcho-600 text-lg font-semibold no-underline"
                    >
                      {card.price}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
          className="self-center bg-white border rounded-lg border-gray-200 border-solid "
        />
      </div>
    );
  }
