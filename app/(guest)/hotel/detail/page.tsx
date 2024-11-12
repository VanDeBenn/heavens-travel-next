import React from "react";
import Footer from "#/app/components/user/footer";
import HeaderComponent from "#/app/components/user/header";
import BannerViewHotel from "#/app/components/user/bannerViewHotel";
import DescriptionHotel from "#/app/components/user/descriptionHotel";
import ServicesAmenities from "#/app/components/user/servicesAmenities";
import AboutNearbyLocation from "#/app/components/user/aboutNearbyLocation";
import ChooseRoonHotel from "#/app/components/user/chooseRoonHotel";
import PropertyPoliciesHotel from "#/app/components/user/propertyPolicesHotel";
import SomeHelpfulFacts from "#/app/components/user/someHelpfulFacts";
import RecommendedDestiNearby from "#/app/components/user/recommendedDestiNearby";

export default function page() {
  return (
    <div className="bg-Lilac-50">
      <HeaderComponent />
      <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-4 pt-20">
        <BannerViewHotel />
        <DescriptionHotel />
        <ServicesAmenities />
        <AboutNearbyLocation />
        <ChooseRoonHotel />
        <PropertyPoliciesHotel />
        <SomeHelpfulFacts />
        <RecommendedDestiNearby />
      </div>
      <Footer />
    </div>
  );
}
