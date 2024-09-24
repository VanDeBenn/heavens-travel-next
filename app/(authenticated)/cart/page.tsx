import React from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import MyCart from "#/app/components/user/myCart";
import Wishlist from "#/app/components/user/wishlist";
import MyBooking from "#/app/components/user/myBooking";
export default function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <Header />
      <div className=" px-16 2xl:px-48 pb-8 pt-24">
        {/* <Wishlist /> */}
        {/* <MyBooking /> */}
        <MyCart />
      </div>
    </main>
  );
}
