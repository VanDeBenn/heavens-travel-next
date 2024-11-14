"use client";
import React from "react";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import ProfileLayout from "../layout";
import Sidebar from "#/app/components/admin/sidebar";
import InformationPersonal from "#/app/components/user/informationPersonal";
import ChangePassword from "#/app/components/user/changePassword";

const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <InformationPersonal id={""} data={undefined} role={""} />
      <ChangePassword id={""} data={undefined} />
    </div>
  );
};

export default Page;
