"use client";
import NewsFrom from "#/app/components/user/newsFrom";
import BannerViewDesti from "#/app/components/user/bannerViewDesti";
import DescriptionDesti from "#/app/components/user/descriptionDesti";
import Footer from "#/app/components/user/footer";
import GuestReviewDesti from "#/app/components/user/guestReviewDesti";
import HeaderComponent from "#/app/components/user/header";
import TicketsOverview from "#/app/components/user/ticketsOverview";
import TopFourHotel from "#/app/components/user/topFourHotel";
import OtherRecommendedCities from "#/app/components/user/otherRecommendedCities";
import Faq from "#/app/components/user/faq";
import React, { useEffect, useState } from "react";
import InstagrammableHotels from "#/app/components/user/instagrammableHotels";
import { destinationRepository } from "#/repository/destinations";

export default function page() {
  const [dataDestinations, setDataDestinations] = useState<any>();

  const getAllDestination = async () => {
    try {
      const destinations = await destinationRepository.api.getDestinations();
      console.log(destinations);
    } catch (error) {}
  };

  useEffect(() => {
    getAllDestination();
  }, []);

  return (
    <div className="bg-Lilac-50">
      <HeaderComponent />
      <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-5 pt-20">
        <BannerViewDesti />
        <DescriptionDesti />
        <TicketsOverview />
        <GuestReviewDesti />
        <NewsFrom />
        <InstagrammableHotels />
        <TopFourHotel />
        <OtherRecommendedCities />
        <Faq />
      </div>
      <Footer />
    </div>
  );
}

