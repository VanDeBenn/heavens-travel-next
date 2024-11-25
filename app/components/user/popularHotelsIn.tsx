// import React, { useEffect, useState } from "react";
// import { Tabs, Card, Typography, Row, Col, Rate } from "antd";
// import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
// import Image from "next/image";
// import Link from "next/link";
// import "antd/dist/reset.css"; // Ant Design reset styles
// import "tailwindcss/tailwind.css"; // Tailwind CSS styles

// const { TabPane } = Tabs;
// const { Paragraph } = Typography;

// interface ComponentProps {
//   data: any;
//   dataCity: any;
// }

// const PopularHotelsIn = ({ data, dataCity }: ComponentProps) => {
//   const [activeTab, setActiveTab] = useState<string>("");

//   useEffect(() => {
//     if (dataCity.length > 0) {
//       setActiveTab(dataCity[0].name);
//     }
//   }, [dataCity]);

//   const handleTabChange = (key: string) => {
//     setActiveTab(key);
//   };

//   const filteredHotels = data.filter(
//     (hotel: any) => hotel.district.city.name === activeTab
//   );

//   return (
//     <div className="">
//       <div className="flex items-center mb-6">
//         <div className="text-RoyalAmethyst-700 text-3xl mr-3">
//           <StarOutlined style={{ fontSize: "27px", color: "#4F28D9" }} />
//         </div>
//         <span className="text-xl font-semibold">
//           Popular Hotels In Indonesia
//         </span>
//       </div>

//       <Tabs
//         defaultActiveKey={activeTab}
//         onChange={handleTabChange}
//         className="mb-6"
//       >
//         {dataCity.map((city: any) => (
//           <TabPane tab={city.name} key={city.name} />
//         ))}
//       </Tabs>

//       <Row gutter={16}>
//         {filteredHotels.map((hotel: any) => (
//           <Col span={6} key={hotel.id}>
//             <Card
//               cover={
//                 <Link href={`/hotel/detail/${hotel.id}`}>
//                   <Image
//                     alt={hotel.name}
//                     src={hotel.pathLocation}
//                     layout="responsive"
//                     width={500}
//                     height={300}
//                     className="object-cover"
//                   />
//                 </Link>
//               }
//               className="shadow-lg rounded-md"
//             >
//               {/* Title and Rating */}
//               <div className="flex items-center justify-between mb-2 gap-2">
//                 <h1 className="text-xl font-semibold">{hotel.name}</h1>
//                 <Rate
//                   disabled
//                   defaultValue={hotel.rating}
//                   className="text-yellow-500 text-xl"
//                 />
//               </div>
//               {/* Location */}
//               <div className="flex items-center text-gray-500 mb-2">
//                 <EnvironmentOutlined className="mr-1" />
//                 {hotel.district.city.name}
//               </div>
//               {/* Description */}
//               <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
//                 {hotel.description}
//               </Paragraph>
//               {/* Price */}
//               <div className="text-right text-base font-medium text-gray-700">
//                 Start from <span className="text-InfernoEcho-600">{hotel.price}</span>
//               </div>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default PopularHotelsIn;

"use client";

import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { LiaBinocularsSolid } from "react-icons/lia";
import { FaUmbrellaBeach } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import {
  RiArrowRightDoubleLine,
  RiArrowRightSLine,
  RiHotelLine,
  RiMapPin2Fill,
  RiStarFill,
  RiStarHalfFill,
} from "react-icons/ri";
import { Button } from "antd";
import React from "react";
import { citieRepository } from "#/repository/cities";
import { hotelRepository } from "#/repository/hotels";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

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

export default function PopularHotelsIn() {
  const [citiesData, setCitiesData] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("Bali");
  const [hotelsData, setHotelsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllHotels = async () => {
    const res = await hotelRepository.api.getHotels();
    setHotelsData(res.data);
  };

  const getAllCities = async () => {
    try {
      const res = await citieRepository.api.getCities();
      const randomCities = res.data
        .sort(() => 0.5 - Math.random())
        .slice(0, 8)
        .map((city: any) => city.name);
      setCitiesData(randomCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    Promise.all([getAllHotels(), getAllCities()]).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Filter hotels by selected city
  const filteredHotels = hotelsData.filter(
    (hotel: any) =>
      hotel?.city?.name === selectedCity ||
      hotel?.city?.name === `Kota ${selectedCity}` ||
      hotel?.city?.name === `Kabupaten ${selectedCity}` ||
      hotel?.city?.province?.name === selectedCity
  );

  const citiesList = ["Bali", "Bekasi", "Bandung", "Jakarta"]; // Define the cities explicitly

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <FaUmbrellaBeach className="text-3xl text-RoyalAmethyst-700" />
          <span className="text-xl font-semibold">
            Popular Hotels in Indonesia
          </span>
        </div>
        <span className="text-base text-black">
          Top Stays for Your Next Adventure
        </span>
      </div>

      {/* City Buttons */}
      <div className="flex items-center gap-4 py-2 font-semibold">
        {citiesList.map((city) => (
          <Button
            key={city}
            type={selectedCity === city ? "primary" : "default"}
            onClick={() => setSelectedCity(city)}
            className={
              selectedCity === city
                ? "bg-RoyalAmethyst-700 text-white"
                : "border border-RoyalAmethyst-700 text-RoyalAmethyst-700"
            }
          >
            {city}
          </Button>
        ))}
      </div>

      {/* Hotel Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filteredHotels.length > 0 ? (
          filteredHotels.slice(0, 4).map((hotel) => (
            <div
              key={hotel.id}
              className="no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
            >
              <Link
                href={`/hotel/detail/${hotel.id}`}
                className="flex flex-col items-center"
              >
                <Image
                  src={`http://localhost:3222/photo-hotels/${hotel.image}`}
                  alt={hotel.name}
                  className="h-52 w-full rounded-t-xl"
                  height={300}
                  width={300}
                />
              </Link>
              <div className="px-4 pb-2 flex flex-col gap-2">
                <div className="flex justify-between gap-1">
                  <Link
                    href={`/hotel/detail/${hotel.id}`}
                    className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                  >
                    {hotel.name}
                  </Link>
                  <div className="flex gap-1 items-center">
                    {[...Array(5)].map((_, index) => (
                      <React.Fragment key={index}>
                        {index + 0.5 < hotel.stars ? (
                          <RiStarFill className="text-[#FFD700] text-lg" />
                        ) : index < hotel.stars ? (
                          <RiStarHalfFill className="text-[#FFD700] text-lg" />
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPin2Fill className="text-lg text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {hotel.city.name}
                  </span>
                </div>
                <Link
                  href={`/hotel/detail/${hotel.id}`}
                  className="text-black text-base font-semibold no-underline leading-6"
                >
                  {hotel.description}
                </Link>
                <div className="flex justify-end">
                  <div className="flex gap-2 items-center">
                    <span className="text-gray-400 text-sm align-text-bottom">
                      Start from
                    </span>
                    <Link
                      href={`/hotel/detail/${hotel.id}`}
                      className="text-InfernoEcho-600 text-lg font-semibold no-underline"
                    >
                      {hotel.price}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-500">
            No hotels available for this city.
          </div>
        )}
      </div>
    </div>
  );
}

const cityData: { [key: string]: HotelCard[] } = {
  Bali: [
    {
      id: 1,
      text: "Ayana Resort and Spa",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bali",
      desc: "Experience luxury in the heart.",
      loc: "Bali",
      price: "Rp290.000",
      stars: 4.5,
    },
    {
      id: 2,
      text: "Four Seasons Resort",
      imgSrc: "/images/illustration/road-bridge.jpg",
      link: "/kota/bali",
      desc: "Discover tranquility in Ubud.",
      loc: "Bali",
      price: "Rp320.000",
      stars: 4,
    },
    {
      id: 3,
      text: "Oberoi Beach Resort",
      imgSrc: "/images/illustration/beautiful-church.jpg",
      link: "/kota/bali",
      desc: "A beachside paradise.",
      loc: "Bekasi",
      price: "Rp340.000",
      stars: 2.5,
    },
  ],
  Bekasi: [
    {
      id: 1,
      text: "Ayana Resort and Spa",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bali",
      desc: "Experience luxury in the heart.",
      loc: "Bali",
      price: "Rp290.000",
      stars: 4.5,
    },
  ],
  Bandung: [
    {
      id: 1,
      text: "Ayana Resort and Spa",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bali",
      desc: "Experience luxury in the heart.",
      loc: "Bali",
      price: "Rp290.000",
      stars: 4.5,
    },
    {
      id: 2,
      text: "Four Seasons Resort",
      imgSrc: "/images/illustration/road-bridge.jpg",
      link: "/kota/bali",
      desc: "Discover tranquility in Ubud.",
      loc: "Bali",
      price: "Rp320.000",
      stars: 4,
    },
    {
      id: 3,
      text: "Oberoi Beach Resort",
      imgSrc: "/images/illustration/beautiful-church.jpg",
      link: "/kota/bali",
      desc: "A beachside paradise.",
      loc: "Bekasi",
      price: "Rp340.000",
      stars: 2.5,
    },
  ],
  Manila: [
    {
      id: 1,
      text: "Manila Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/manila",
      desc: "Experience the vibrant culture of Manila.",
      loc: "Manila",
      price: "Rp320.000",
      stars: 4,
    },
    {
      id: 2,
      text: "Rizal Park Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/manila",
      desc: "Stay near Rizal Park.",
      loc: "Manila",
      price: "Rp340.000",
      stars: 4.2,
    },
    {
      id: 3,
      text: "New World Manila Bay Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/manila",
      desc: "Luxury at Manila Bay.",
      loc: "Manila",
      price: "Rp400.000",
      stars: 4.8,
    },
    {
      id: 4,
      text: "Sofitel Manila",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/manila",
      desc: "Elegance by the bay.",
      loc: "Manila",
      price: "Rp370.000",
      stars: 4.3,
    },
    {
      id: 5,
      text: "Red Planet Manila",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/manila",
      desc: "Affordable stays in Manila.",
      loc: "Manila",
      price: "Rp250.000",
      stars: 3.9,
    },
    {
      id: 6,
      text: "Okada Manila",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/manila",
      desc: "Experience luxury at Okada.",
      loc: "Manila",
      price: "Rp480.000",
      stars: 5,
    },
  ],
  Bangkok: [
    {
      id: 1,
      text: "Bangkok Marriott Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bangkok",
      desc: "Luxury and culture in the heart of Bangkok.",
      loc: "Bangkok",
      price: "Rp310.000",
      stars: 4.5,
    },
    {
      id: 2,
      text: "Mandarin Oriental Bangkok",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bangkok",
      desc: "Heritage meets luxury.",
      loc: "Bangkok",
      price: "Rp550.000",
      stars: 5,
    },
    {
      id: 3,
      text: "Chatrium Hotel Riverside",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bangkok",
      desc: "Riverside luxury.",
      loc: "Bangkok",
      price: "Rp450.000",
      stars: 4.6,
    },
    {
      id: 4,
      text: "The Peninsula Bangkok",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bangkok",
      desc: "Stay by the river.",
      loc: "Bangkok",
      price: "Rp530.000",
      stars: 4.9,
    },
    {
      id: 5,
      text: "Siam Kempinski Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/bangkok",
      desc: "Luxury near Siam.",
      loc: "Bangkok",
      price: "Rp500.000",
      stars: 4.8,
    },
  ],
  Singapore: [
    {
      id: 1,
      text: "Marina Bay Sands",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/singapore",
      desc: "The iconic luxury resort in Singapore.",
      loc: "Singapore",
      price: "Rp450.000",
      stars: 5,
    },
    {
      id: 2,
      text: "Raffles Singapore",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/singapore",
      desc: "Historic luxury in Singapore.",
      loc: "Singapore",
      price: "Rp600.000",
      stars: 5,
    },
    {
      id: 3,
      text: "Shangri-La Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/singapore",
      desc: "An oasis of serenity.",
      loc: "Singapore",
      price: "Rp420.000",
      stars: 4.7,
    },
    {
      id: 4,
      text: "Fullerton Bay Hotel",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/singapore",
      desc: "Luxury by the bay.",
      loc: "Singapore",
      price: "Rp480.000",
      stars: 4.9,
    },
    {
      id: 5,
      text: "Hotel Jen Orchardgateway",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/singapore",
      desc: "Convenient and stylish.",
      loc: "Singapore",
      price: "Rp300.000",
      stars: 4.2,
    },
    {
      id: 6,
      text: "Crowne Plaza Changi Airport",
      imgSrc: "/images/illustration/bali-indonesia.jpg",
      link: "/kota/singapore",
      desc: "Convenient for travelers.",
      loc: "Singapore",
      price: "Rp390.000",
      stars: 4.5,
    },
  ],
};
