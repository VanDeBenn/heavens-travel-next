import React from "react";
import Coba from "../components/user/coba";

import GuestForm from "../components/user/guestForm";
import PaymentMethod from "../components/user/paymentMethod";
import BannerViewHotel from "../components/user/bannerViewHotel";
import DescriptionHotel from "../components/user/descriptionHotel";
import ServicesAmenities from "../components/user/servicesAmenities";
import AboutNearbyLocation from "../components/user/aboutNearbyLocation";
import ChooseRoonHotel from "../components/user/chooseRoonHotel";
import PropertyPolicesHotel from "../components/user/propertyPolicesHotel";
import SomeHelpfulFacts from "../components/user/someHelpfulFacts";
import UserList from "#/app/components/admin/userList";
import UserDetail from "../components/admin/userDetail";
import DestinationList from "../components/admin/destinationList";
import DestinationDetail from "../components/admin/destinationDetail";
import NextStepDestination from "../components/admin/nextStepDestination";
import ResultDestination from "../components/admin/resultDestination";
import HotelList from "../components/admin/hotelList";
import HotelDetail from "../components/admin/hotelDetail";
import NextStepHotel from "../components/admin/nextStepHotel";
import FacilityInfoHotel from "../components/admin/facilityInfoHotel";
import CreateFacilityHotel from "../components/admin/createFacilityHotel";
import NearbyLocationHotel from "../components/admin/nearbyLocationHotel";

export default function page() {
  return (
    <div className="bg-Lilac-50 px-28 2xl:px-48 py-14 flex flex-col gap-4">
      {/* <BannerViewHotel />
      <DescriptionHotel />
      <ServicesAmenities />
      <AboutNearbyLocation />
      <ChooseRoonHotel />
      <PropertyPolicesHotel />
      <SomeHelpfulFacts /> */}

      {/* <UserList />
      <UserDetail /> */}
      {/* 
      <DestinationList /> */}

      {/* <NextStepDestination /> */}

      {/* <DestinationDetail /> */}

      {/* <ResultDestination /> */}
      {/* 
      <HotelList /> */}

      {/* <HotelDetail /> */}

      {/* <NextStepHotel /> */}
      {/* <FacilityInfoHotel /> */}
      {/* <CreateFacilityHotel /> */}

      <NearbyLocationHotel />
    </div>
  );
}
