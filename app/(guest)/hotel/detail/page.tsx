"use client";
import React, { useRef } from "react";

export default function Page() {
  const chooseRoomRef = useRef<HTMLDivElement>(null);

  const scrollToChooseRoom = () => {
    if (chooseRoomRef.current) {
      chooseRoomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="bg-Lilac-50">
      <HeaderComponent />
      <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-4 pt-20">
        <BannerViewHotel scrollToChooseRoom={scrollToChooseRoom} />
        <DescriptionHotel />
        <ServicesAmenities />
        <AboutNearbyLocation />
        <div ref={chooseRoomRef}>
          <ChooseRoonHotel />
        </div>
        <PropertyPoliciesHotel />
        <SomeHelpfulFacts />
        <RecommendedDestiNearby />
        <GuestReview />
        <SimpleInfo />
      </div>
      <Footer />
    </div>
  );
}

import Footer from "#/app/components/user/footer";
import HeaderComponent from "#/app/components/user/header";
import BannerViewHotel from "#/app/components/user/bannerViewHotel";
import ChooseRoonHotel from "#/app/components/user/chooseRoonHotel";
import DescriptionHotel from "#/app/components/user/descriptionHotel";
import ServicesAmenities from "#/app/components/user/servicesAmenities";
import AboutNearbyLocation from "#/app/components/user/aboutNearbyLocation";
import PropertyPoliciesHotel from "#/app/components/user/propertyPolicesHotel";
import SomeHelpfulFacts from "#/app/components/user/someHelpfulFacts";
import RecommendedDestiNearby from "#/app/components/user/recommendedDestiNearby";
import SimpleInfo from "#/app/components/user/simpleInfo";
import GuestReview from "#/app/components/user/guestReview";
