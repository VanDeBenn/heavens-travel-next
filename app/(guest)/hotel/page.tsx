// "use client";
// import React, { useEffect, useState } from "react";
// import Footer from "#/app/components/user/footer";
// import Header from "#/app/components/user/header";
// import Hotels from "#/app/components/user/hotels";
// import PopularHotelsIn from "#/app/components/user/popularHotelsIn";
// import PromoteSlider from "#/app/components/user/promoteSlider";
// import { cityRepository } from "#/repository/cities";
// import { hotelRepository } from "#/repository/hotels";

// interface PageProps {
//   data: any;
//   dataCity: any;
// }

// export default function page({ data, dataCity }: PageProps) {
//   const [dataHotels, setDataHotels] = useState<any[]>([]);
//   const [dataCities, setDataCities] = useState<any[]>([]);

//   const fetchCities = async () => {
//     try {
//       const res = await cityRepository.api.getCitys();
//       setDataCities(res.body.data);
//     } catch (error) {}
//   };

//   const fetchHotels = async () => {
//     try {
//       const res = await hotelRepository.api.getHotels();
//       setDataHotels(res.body.data);
//     } catch (error) {}
//   };

//   useEffect(() => {
//     fetchHotels();
//     fetchCities();
//   }, []);

//   return (
//     <main className="bg-Lilac-50">
//       <Header />
//       <div className="">
//         <Hotels data={dataHotels} dataCity={dataCities} />
//       </div>
//       <div className=" px-16 pb-8 pt-24 flex flex-col gap-10">
//         <PromoteSlider />
//         <PopularHotelsIn data={dataHotels} dataCity={dataCities} />
//       </div>
//       <div>
//         <Footer />
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import BannerHotel from "#/app/components/user/bannerHotel";
import Footer from "#/app/components/user/footer";
import PromoteSliderHotel from "#/app/components/user/promoteSliderHotel";
import PopularHotelsIn from "#/app/components/user/popularHotelsIn";
import BudgetHotelsAsia from "#/app/components/user/budgetHotelsAsia";
import FindBestDestination from "#/app/components/user/findBestDestination";
import WhatInterestsYou from "#/app/components/user/whatInterestsYou";
import Faq from "#/app/components/user/faq";
import SimpleInfo from "#/app/components/user/simpleInfo";
import { hotelRepository } from "#/repository/hotels";
import HeaderComponent from "#/app/components/user/header";

export default function page() {
  const [hotelsData, setHotelsData] = useState<any>();

  const getAllHotels = async () => {
    try {
      const hotels = await hotelRepository.api.getHotels();
      // console.log(hotels);
    } catch (error) {}
  };

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <div className="bg-Lilac-50 flex flex-col">
      <HeaderComponent />
      <BannerHotel />
      <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-16">
        <PromoteSliderHotel />
        <PopularHotelsIn />
        <BudgetHotelsAsia />
        <FindBestDestination />
        <WhatInterestsYou />
        <Faq />
        <SimpleInfo />
      </div>
      <Footer />
    </div>
  );
}
