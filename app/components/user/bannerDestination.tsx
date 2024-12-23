"use client";

import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Input, Select, Button } from "antd";
// import { RiSearchLine } from "react-icons/ri";

// const { Option } = Select;

// const BannerDestination = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
//     undefined
//   );
//   const router = useRouter();

//   const popularLocations = [
//     "Bali",
//     "Jakarta",
//     "Yogyakarta",
//     "Bandung",
//     "Lombok",
//   ];

//   const handleSearch = () => {
//     if (selectedLocation) {
//       router.push(`/destination/list/${selectedLocation.toLowerCase()}`);
//     } else {
//       alert("Please select a location.");
//     }
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <Input
//         placeholder="Search destination"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//         className="w-full border rounded-lg"
//       />
//       <Select
//         placeholder="Location"
//         value={selectedLocation}
//         onChange={(value) => setSelectedLocation(value)}
//         className="w-36"
//         showSearch
//       >
//         {popularLocations.map((location) => (
//           <Option key={location} value={location}>
//             {location}
//           </Option>
//         ))}
//       </Select>
//       <Button
//         type="primary"
//         onClick={handleSearch}
//         className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg"
//       >
//         <RiSearchLine />
//       </Button>
//     </div>
//   );
// };

// export default BannerDestination;

import { Julee } from "next/font/google";
import { Montserrat } from "next/font/google";
import { RiSearchLine } from "react-icons/ri";
import { Input, Select, Button } from "antd";
import { useState } from "react";

const { Option } = Select;

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const JuleeNormal = Julee({
  subsets: ["latin"],
  weight: ["400"],
});

export default function BannerDestination() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery) {
      router.push(`/destination/list/${searchQuery.toLowerCase()}`);
    } else {
      alert("Please select a location.");
    }
  };

  console.log(searchQuery);
  return (
    <div className="flex flex-col">
      <div>
        <div
          className="relative pt-16 pb-32 flex content-center items-center justify-center"
          style={{ minHeight: "110vh" }}
        >
          {/* Background Image */}
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/illustration/destination.png')",
            }}
          ></div>

          {/* Overlay Hitam untuk Menggelapkan Gambar */}
          <div className="absolute top-0 w-full h-full bg-black opacity-20"></div>

          {/* Teks di Atas Background */}
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="flex flex-col gap-1 z-10 text-white">
                  <span
                    className={`${JuleeNormal.className} text-[90px] font-semibold text-center`}
                  >
                    Destinations
                  </span>
                  <span
                    className={`${mediumMontserrat.className} text-xl font-semibold text-center`}
                  >
                    Handpicked Destinations for Every Traveler
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak Pertengahan */}
        <div className="relative -mt-36 z-10 ">
          <div className="py-12 px-28 2xl:px-48">
            <div className="border-solid border-gray-200 border bg-white rounded-xl px-5 py-3">
              <div className="flex items-center gap-3">
                {/* Input Search */}
                <Input
                  placeholder="Search Location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full border rounded-lg"
                />
                {/* <Select
                  placeholder="Location"
                  value={selectedLocation}
                  onChange={(value) => setSelectedLocation(value)}
                  className="w-36"
                  showSearch
                >
                  {popularLocations.map((location) => (
                    <Option key={location} value={location}>
                      {location}
                    </Option>
                  ))}
                </Select> */}
                <Button
                  type="primary"
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 flex items-center rounded-lg"
                >
                  <RiSearchLine />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Kotak bg-Lilac-50 di Bawah */}
        <div className="relative -mt-24 w-full">
          <div className="bg-Lilac-50 w-full rounded-t-[35px]">
            <div className="px-28 2xl:px-48 pt-16 pb-7 flex flex-col gap-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
