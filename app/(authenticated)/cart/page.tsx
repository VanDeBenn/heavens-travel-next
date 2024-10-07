import React from "react";
import Header from "#/app/components/user/header";
import MyCart from "#/app/components/user/myCart";

export default function page() {
  return (
    <main className="bg-[#F8F8FF]">
      <Header />
      <div className=" px-28 2xl:px-48 pb-8 pt-24">
        <MyCart />
      </div>
    </main>
  );
}
