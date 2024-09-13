"use client";
import ChangePassword from "#/app/components/user/changePassword";
import InformationPersonal from "#/app/components/user/informationPersonal";
import MyBooking from "#/app/components/user/myBooking";
import NavProfile from "#/app/components/user/navProfile";
import Wishlist from "#/app/components/user/wishlist";
import React, { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import BookingDetail from "#/app/components/user/bookingDetail";

export default function Page() {
  const router = useRouter();

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("access-token");
  //   const refreshToken = localStorage.getItem("refresh-token");
  //   const cookies = document.cookie;

  //   if (!accessToken && !refreshToken) {
  //     redirect("/login");
  //   }
  // }, [router]);

  return (
    <main className="bg-[#F8F8FF]">
      <div className=" px-24 py-10 flex gap-3 w-full">
        <NavProfile />
        <div className="flex flex-col gap-4 w-full">
          <InformationPersonal />
          <ChangePassword />
          <Wishlist />
          <MyBooking />
          <BookingDetail />
        </div>
      </div>
    </main>
  );
}
