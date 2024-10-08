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

export default function page() {
  return (
    <div className="bg-[#F8F8FF] px-28 2xl:px-48 py-14 flex flex-col gap-4">
      {/* <BannerViewHotel />
      <DescriptionHotel />
      <ServicesAmenities />
      <AboutNearbyLocation />
      <ChooseRoonHotel />
      <PropertyPolicesHotel />
      <SomeHelpfulFacts /> */}

      {/* <UserList />
      <UserDetail /> */}

      <DestinationList />
    </div>
  );
}
