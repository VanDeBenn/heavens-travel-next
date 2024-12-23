"use client";
import BannerDestination from "#/app/components/user/bannerDestination";
import BestHotelFinder from "#/app/components/user/bestHotelFinder";
import Faq from "#/app/components/user/faq";
import FindBestDestination from "#/app/components/user/findBestDestination";
import Footer from "#/app/components/user/footer";
import HolidayIntroduction from "#/app/components/user/holidayIntroduction";
import PromoteSliderDesti from "#/app/components/user/promoteSliderDesti";
import TopHotel from "#/app/components/user/topHotel";

import { destinationRepository } from "#/repository/destinations";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function page() {
  const [dataDestination, setDataDestinations] = useState<any[]>([]);

  const fetchAllDestination = async () => {
    try {
      const destination = await destinationRepository.api.getDestinations();
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllDestination();
  }, []);

  return (
    <div className="bg-Lilac-50">
      <BannerDestination />
      <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-16">
        <PromoteSliderDesti />
        <FindBestDestination />
        <TopHotel />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}
export default page;
