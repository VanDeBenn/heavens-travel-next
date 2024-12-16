"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const pathname = usePathname();

  if (!pathname) {
    return <Loading />;
  }

  const pathSegments = pathname.split("/");
  const hotelId = pathSegments[3];
  const chooseRoomRef = useRef<HTMLDivElement>(null);
  const [hotelData, setHotelData] = useState<any>();

  const getHotel = async () => {
    const res = await hotelRepository.api.getHotel(hotelId);
    setHotelData(res.data);
  };

  useEffect(() => {
    getHotel();
  }, []);

  const scrollToChooseRoom = () => {
    if (chooseRoomRef.current) {
      chooseRoomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  //   // console.log(hotelData);
  if (!hotelData) {
    return;
  }
  return (
    <div className="bg-Lilac-50">
      <HeaderComponent />
      <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-4 pt-20">
        <BannerViewHotel
          scrollToChooseRoom={scrollToChooseRoom}
          data={hotelData}
        />
        <DescriptionHotel data={hotelData} />
        <ServicesAmenities />
        <AboutNearbyLocation />
        <div ref={chooseRoomRef}>
          <ChooseRoonHotel data={hotelData} id={hotelId} />
        </div>
        <PropertyPoliciesHotel data={hotelData} />
        <SomeHelpfulFacts />
        <RecommendedDestiNearby data={hotelData} />
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
import { hotelRepository } from "#/repository/hotels";
import Loading from "#/app/loading";
import { usePathname } from "next/navigation";
