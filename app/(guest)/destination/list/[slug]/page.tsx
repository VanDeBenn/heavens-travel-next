import BannerDestinationList from "#/app/components/user/bannerDestinationList";
import Footer from "#/app/components/user/footer";
import HeaderComponent from "#/app/components/user/header";
import ResultDesti from "#/app/components/user/resultDesti";
import React from "react";

export default function page({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-Lilac-50 flex flex-col">
      <HeaderComponent />
      <BannerDestinationList />
      {/* <div className="px-28 2xl:px-48 pb-16 flex flex-col gap-16">
      <ResultDesti />
    </div> */}
      <Footer />
    </div>
  );
}
