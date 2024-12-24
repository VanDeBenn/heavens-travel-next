// "use client";

// import { Julee } from "next/font/google";
// import { Montserrat } from "next/font/google";
// import {
//   RiSearchLine,
//   RiMapPin2Fill,
//   RiStarFill,
//   RiStarHalfFill,
// } from "react-icons/ri";
// import { Input, Select, Button, Pagination, DatePicker, Empty } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { usePathname } from "next/navigation";

// const { Option } = Select;
// import dayjs from "dayjs";

// const mediumMontserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["500"],
// });
// const { RangePicker } = DatePicker;
// const JuleeNormal = Julee({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// type HotelCard = {
//   id: number;
//   text: string;
//   imgSrc: string;
//   link: string;
//   desc: string;
//   loc: string;
//   price: string;
//   stars: number;
// };

// export default function BannerHotelList() {
//   const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null); // State for date range

//   const pathname = usePathname();
//   if (!pathname) {
//     return;
//   }
//   const pathSegments = pathname.split("/");

//   const destinationName = pathSegments[3];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
//     undefined
//   );

//   const pageSize = 8;

//   const cityData: { [key: string]: HotelCard[] } = {
//     bali: [
//       {
//         id: 1,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Bali",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 2,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Bali",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 3,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Bali",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 4,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Bali",
//         price: "Rp310.000",
//         stars: 4,
//       },
//       {
//         id: 5,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Bali",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 6,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Bali",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 7,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Bali",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 8,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-s parkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Bali",
//         price: "Rp310.000",
//         stars: 4,
//       },
//       {
//         id: 9,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Bali",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 10,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Bali",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 11,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Bali",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 12,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Bali",
//         price: "Rp310.000",
//         stars: 4,
//       },
//     ],
//     lombok: [
//       {
//         id: 1,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Lombok",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 2,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Lombok",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 3,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Lombok",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 4,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Lombok",
//         price: "Rp310.000",
//         stars: 4,
//       },
//       {
//         id: 5,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Lombok",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 6,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Lombok",
//         price: "Rp320.000",
//         stars: 4,
//       },
//     ],
//   };

//   const popularLocations = [
//     "bali",
//     "jakarta",
//     "yogyakarta",
//     "bandung",
//     "lombok",
//   ];

//   const getFilteredData = () => {
//     const allData = selectedLocation ? cityData[selectedLocation] || [] : [];
//     return allData.filter((item) =>
//       item.text.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   const filteredData = getFilteredData();
//   const currentData = filteredData.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handle Search = () => {
//     setCurrentPage(1);
//   };

//   return (
//     <div>
//       <div
//         className="relative pt-16 pb-32 flex content-center items-center justify-center"
//         style={{ minHeight: "75vh" }}
//       >
//         <div
//           className="absolute top-0 w-full h-full bg-center bg-cover"
//           style={{
//             backgroundImage:
//               "url('/images/illustration/banner-search-hotel.png')",
//           }}
//         ></div>
//         <div className="absolute top-0 w-full h-full bg-black opacity-20"></div>
//         <div className="container relative mx-auto">
//           <div className="items-center flex flex-wrap">
//             <div className="w-full px-4 ml-auto mr-auto text-center">
//               <div className="flex flex-col gap-1 z-10 text-white">
//                 <span
//                   className={`${mediumMontserrat.className} text-[35px] font-semibold text-center`}
//                 >
//                   find the best hotel for you.
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Input Pencarian */}
//       <div className="relative -mt-36 z-10">
//         <div className="py-12 px-28 2xl:px-48">
//           <div className="border-solid border-gray-200 border bg-white rounded-xl px-5 py-3">
//             <div className="flex items-center gap-3">
//               <Input
//                 placeholder="Search destination"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full border-solid border-gray-200 border rounded-lg text-sm"
//               />
//               {/* Schedule */}
//               <RangePicker
//                 format="DD MMM, YYYY"
//                 onChange={(dates) =>
//                   setDates(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
//                 }
//                 className="border-solid border-gray-200 border rounded-lg w-[350px]"
//               />

//               <Select
//                 defaultValue={destinationName}
//                 placeholder="Location"
//                 value={selectedLocation || destinationName}
//                 onChange={(value) =>
//                   setSelectedLocation(value || destinationName)
//                 }
//                 className="w-36"
//                 showSearch
//                 filterOption={(input, option) =>
//                   (option?.label as string)
//                     ?.toLowerCase()
//                     .includes(input.toLowerCase())
//                 }
//               >
//                 {popularLocations.map((location) => (
//                   <Option key={location} value={location} label={location}>
//                     {location}
//                   </Option>
//                 ))}
//               </Select>

//               <Button
//                 type="primary"
//                 onClick={handleSearch}
//                 className="bg-RoyalAmethyst-700 px-7 py-3 cursor-pointer rounded-lg flex items-center"
//               >
//                 <RiSearchLine className="text-white text-xl" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Kotak bg-Lilac-50 di Bawah */}
//       <div className="relative -mt-24 w-full">
//         <div className="bg-Lilac-50 w-full rounded-t-[35px]">
//           <div className="px-28 2xl:px-48 pt-16 pb-7 flex flex-col gap-16"></div>
//         </div>
//       </div>

//       {/* Hasil Pencarian */}
//       <div className="flex flex-col gap-6 px-28 2xl:px-48 pb-16">
//         {filteredData.length === 0 ? (
//           <Empty description="No hotels found" />
//         ) : (
//           <>
//             <div className="grid grid-cols-4 gap-4">
//               {currentData.map((card) => (
//                 <div
//                   key={card.id}
//                   className="no-underline border border-gray-300 border-solid rounded-xl flex flex-col gap-3 bg-white"
//                 >
//                   <Link href={card.link} className="flex flex-col items-center">
//                     <Image
//                       src={card.imgSrc}
//                       alt={card.text}
//                       className="h-52 w-full rounded-t-xl"
//                       height={300}
//                       width={300}
//                     />
//                   </Link>
//                   <div
//                     className={`${mediumMontserrat.className} px-4 pb-2 flex flex-col gap-2`}
//                   >
//                     <div className="flex justify-between gap-1">
//                       <Link
//                         href={card.link}
//                         className="font-semibold text-black text-base no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
//                       >
//                         {card.text}
//  </Link>
//                       <div className="flex gap-1 items-center">
//                         {[...Array(5)].map((_, index) => (
//                           <React.Fragment key={index}>
//                             {index + 0.5 < card.stars ? (
//                               <RiStarFill className="text-[#FFD700] text-lg" />
//                             ) : index < card.stars ? (
//                               <RiStarHalfFill className="text-[#FFD700] text-lg" />
//                             ) : null}
//                           </React.Fragment>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <RiMapPin2Fill className="text-lg text-gray-400" />
//                       <span className="text-sm text-gray-400">{card.loc}</span>
//                     </div>
//                     <Link
//                       href={card.link}
//                       className="text-black text-base font-semibold no-underline leading-6"
//                     >
//                       {card.desc}
//                     </Link>
//                     <div className="flex justify-end">
//                       <div className="flex gap-2 items-center">
//                         <span className="text-gray-400 text-sm align-text-bottom ">
//                           Start from
//                         </span>
//                         <Link
//                           href={card.link}
//                           className="text-InfernoEcho-600 text-lg font-semibold no-underline"
//                         >
//                           {card.price}
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <Pagination
//               current={currentPage}
//               pageSize={pageSize}
//               total={filteredData.length}
//               onChange={handlePageChange}
//               className="self-center bg-white border rounded-lg border-gray-200 border-solid"
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { Julee } from "next/font/google";
// import { Montserrat } from "next/font/google";
// import {
//   RiSearchLine,
//   RiMapPin2Fill,
//   RiStarFill,
//   RiStarHalfFill,
// } from "react-icons/ri";
// import { Input, Select, Button, Pagination, DatePicker, Empty } from "antd";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { usePathname } from "next/navigation";

// const { Option } = Select;
// import dayjs from "dayjs";

// const mediumMontserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["500"],
// });
// const { RangePicker } = DatePicker;
// const JuleeNormal = Julee({
//   subsets: ["latin"],
//   weight: ["400"],
// });

// type HotelCard = {
//   id: number;
//   text: string;
//   imgSrc: string;
//   link: string;
//   desc: string;
//   loc: string;
//   price: string;
//   stars: number;
// };

// export default function BannerHotelList() {
//   const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null); // State for date range

//   const pathname = usePathname();
//   if (!pathname) {
//     return;
//   }
//   const pathSegments = pathname.split("/");

//   const destinationName = pathSegments[3];

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
//     undefined
//   );

//   const pageSize = 8;

//   const cityData: { [key: string]: HotelCard[] } = {
//     bali: [
//       {
//         id: 1,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Bali",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 2,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Bali",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 3,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Bali",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 4,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Bali",
//         price: "Rp310.000",
//         stars: 4,
//       },
//       {
//         id: 5,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Bali",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 6,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Bali",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 7,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Bali",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 8,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Bali",
//         price: "Rp310.000",
//         stars: 4,
//       },
//       {
//         id: 9,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Bali",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 10,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Bali",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 11,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Bali",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 12,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Bali",
//         price: "Rp310.000",
//         stars: 4,
//       },
//     ],
//     lombok: [
//       {
//         id: 1,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Lombok",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 2,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Lombok",
//         price: "Rp320.000",
//         stars: 4,
//       },
//       {
//         id: 3,
//         text: "Oberoi Beach Resort",
//         imgSrc: "/images/illustration/beautiful-church.jpg",
//         link: "/kota/bali",
//         desc: "A beachside paradise.",
//         loc: "Lombok",
//         price: "Rp340.000",
//         stars: 2.5,
//       },
//       {
//         id: 4,
//         text: "Alila Villas Uluwatu",
//         imgSrc:
//           "/images/illustration/nightlife-city-sparkles-light-streets.jpg",
//         link: "/kota/bali",
//         desc: "Enjoy the vibrant Kuta Beach.",
//         loc: "Lombok",
//         price: "Rp310.000",
//         stars: 4,
//       },
//       {
//         id: 5,
//         text: "Ayana Resort and Spa",
//         imgSrc: "/images/illustration/bali-indonesia.jpg",
//         link: "/kota/bali",
//         desc: "Experience luxury in the heart.",
//         loc: "Lombok",
//         price: "Rp290.000",
//         stars: 4.5,
//       },
//       {
//         id: 6,
//         text: "Four Seasons Resort",
//         imgSrc: "/images/illustration/road-bridge.jpg",
//         link: "/kota/bali",
//         desc: "Discover tranquility in Ubud.",
//         loc: "Lombok",
//         price: "Rp320.000",
//         stars: 4,
//       },
//     ],
//   };

//   const popularLocations = [
//     "bali",
//     "jakarta",
//     "yogyakarta",
//     "bandung",
//     "lombok",
//   ];

//   const getFilteredData = () => {
//     const allData = selectedLocation ? cityData[selectedLocation] || [] : [];
//     return allData.filter((item) =>
//       item.text.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   const filteredData = getFilteredData();
//   const currentData = filteredData.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

// const handleSearch = () => {
//   setCurrentPage(1);
// };

//   return (
//     <div>
//       <div
//         className="relative pt-
