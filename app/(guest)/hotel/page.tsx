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
