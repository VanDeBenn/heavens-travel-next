import React from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import DestinasitionHighlights from "#/app/components/user/destinasitionHighlights";
import HotelHighlights from "#/app/components/user/hotelHighlights";
import MoreNews from "#/app/components/user/moreNews";

function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <Header />
      <div className=" px-16 pb-8 pt-24">
        <div className="flex gap-3">
          <a href="/" className="no-underline text-black font-medium">
            home
          </a>
          /
          <a href="/blog" className="no-underline text-black font-medium">
            blog
          </a>
          /
          <a href="/blog/list" className="no-underline text-black font-medium">
            list
          </a>
        </div>
        <div className="my-5 h-px bg-gray-300"></div>
        <DestinasitionHighlights />
        <HotelHighlights />
        <MoreNews />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}

export default page;
