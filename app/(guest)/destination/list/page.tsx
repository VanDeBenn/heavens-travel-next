import BannerDestinationList from "#/app/components/user/bannerDestinationList";
import Footer from "#/app/components/user/footer";
import HeaderComponent from "#/app/components/user/header";
import React from "react";

export default function page() {
  return (
    <div className="bg-Lilac-50 flex flex-col">
      <HeaderComponent />
      <BannerDestinationList />
      <Footer />
    </div>
  );
}
