import ChangePassword from "#/app/components/user/changePassword";
import InformationPersonal from "#/app/components/user/informationPersonal";
import NavProfile from "#/app/components/user/navProfile";
import Wishlist from "#/app/components/user/wishlist";
import React from "react";

export default function page() {
  return (
    <div className="bg-[#F8F8FF] px-24 py-10 flex gap-3 w-full">
      <NavProfile />
      <div className="flex flex-col gap-4 w-full">
        <InformationPersonal />
        <ChangePassword />
        <Wishlist />
      </div>
    </div>
  );
}
