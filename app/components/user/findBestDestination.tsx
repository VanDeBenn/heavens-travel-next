"use client";

import { Montserrat } from "next/font/google";
import { LiaBinocularsSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import { BsSuitcaseLg } from "react-icons/bs";
import { citieRepository } from "#/repository/cities";
import { useEffect, useState } from "react";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const getCityImageUrl = (cityName: string) => {
  return `https://source.unsplash.com/800x600/?${cityName},city`;
};
export default function FindBestDestination() {
  const [citiesData, setCitiesData] = useState<any>();
  const getAllCities = async () => {
    try {
      const res = await citieRepository.api.getCities();
      setCitiesData(res.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // // console.log("hmm", citiesData);

  useEffect(() => {
    getAllCities();
  }, []);

  if (!citiesData) {
    return;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className=" ">
          <div
            className={`${mediumMontserrat.className} flex items-center gap-2`}
          >
            <BsSuitcaseLg className="text-3xl text-RoyalAmethyst-700" />
            <span className="text-xl font-semibold">
              Find the best destination for your family
            </span>
          </div>
        </div>

        <span className={`${mediumMontserrat.className} text-base text-black`}>
          Explore family-friendly destinations that offer fun, adventure, and
          relaxation for everyone.
        </span>
      </div>

      {/* grid kota */}
      <div className="grid grid-cols-4 gap-4">
        {citiesData
          .filter((item: any) => !item.name.includes("Kabupaten"))
          .sort(() => 0.5 - Math.random())
          .slice(0, 8)
          .map((card: any) => {
            const formattedName = card.name.replace(/^Kota\s/, "");
            // console.log(citiesData);
            return (
              <Link
                key={card.id}
                href={`/hotel/city/${card.id}`}
                className="no-underline "
              >
                <div className="flex flex-col items-center justify-end h-60 bg-gray-200 rounded-xl shadow-md relative overflow-hidden p-4 cursor-pointer group">
                  <Image
                    src={
                      "https://imgs.search.brave.com/5UqWhGgspBC66Dh1Hx2Vk5AZ74VDIQslE5LpxmlvlbE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9naXJs/ZWF0d29ybGQubmV0/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE4/LzA0L251c2EtcGVu/aWRhLWtlbGluZ2tp/bmctMS5qcGc"
                    }
                    alt={" "}
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <span
                    className={`${mediumMontserrat.className} relative z-10 text-center font-semibold text-white text-xl hover:text-RoyalAmethyst-700 transition-all duration-300`}
                  >
                    {formattedName}
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
      {/* end grid kota */}
    </div>
  );
}

const HolidayData = [
  {
    id: 1,
    text: "Bali",
    imgSrc: "/images/illustration/bali-indonesia.jpg",
    link: "/kota/bali",
  },
  {
    id: 2,
    text: "Bekasi",
    imgSrc: "/images/illustration/road-bridge.jpg",
    link: "/kota/bekasi",
  },
  {
    id: 3,
    text: "Banten",
    imgSrc: "/images/illustration/beautiful-church.jpg",
    link: "/kota/banten",
  },
  {
    id: 4,
    text: "Balikpapan",
    imgSrc: "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
    link: "/kota/balikpapan",
  },
  {
    id: 5,
    text: "Jakarta",
    imgSrc: "/images/illustration/city-with-forest-front.jpg",
    link: "/kota/jakarta",
  },
  {
    id: 6,
    text: "Jogja",
    imgSrc: "/images/illustration/religion-historic.jpg",
    link: "/kota/jogja",
  },
  {
    id: 7,
    text: "Bandung",
    imgSrc: "/images/illustration/high-angle.jpg",
    link: "/kota/bandung",
  },
  {
    id: 8,
    text: "Lampung",
    imgSrc: "/images/illustration/mountainous-landscape-with-fog.jpg",
    link: "/kota/lampung",
  },
];
