import React from "react";
import Coba from "../components/user/coba";
import Wishlist from "../components/user/wishlist";
import InformationPersonal from "../components/user/informationPersonal";
import ChangePassword from "../components/user/changePassword";

export default function page() {
  return (
    <div className="bg-[#F8F8FF] p-9 flex flex-col gap-9">
      <InformationPersonal id={""} data={undefined} />
      <ChangePassword id={""} data={undefined} />
      {/* <Wishlist /> */}
      {/* <Coba /> */}
    </div>
  );
}
