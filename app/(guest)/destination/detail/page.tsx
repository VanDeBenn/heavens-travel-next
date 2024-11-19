import NewsFrom from "#/app/components/user/newsFrom";
import BannerViewDesti from "#/app/components/user/bannerViewDesti";
import DescriptionDesti from "#/app/components/user/descriptionDesti";
import Footer from "#/app/components/user/footer";
import GuestReviewDesti from "#/app/components/user/guestReviewDesti";
import HeaderComponent from "#/app/components/user/header";
import TicketsOverview from "#/app/components/user/ticketsOverview";

import React from "react";
import InstagrammableHotels from "#/app/components/user/InstagrammableHotels";

export default function page() {
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
      </div>
      <Footer />
    </div>
  );
}
