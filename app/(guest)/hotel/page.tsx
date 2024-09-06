import React from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import Hotels from "#/app/components/user/hotels";
import PopularHotelsIn from "#/app/components/user/popularHotelsIn";
import PromoteSlider from "#/app/components/user/promoteSlider";

export default function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <Header />
      <div className="">
        <Hotels />
      </div>
      <div className=" px-16 pb-8 pt-24">
        <PromoteSlider />
        <PopularHotelsIn />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
