// ORI
import React from "react";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import ProfileLayout from "../layout";
import Sidebar from "#/app/components/admin/sidebar";

const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <InformationAdmin id={""} data={undefined} />
      <ChangePasswordAdmin id={""} data={undefined} />
    </div>
  );
};

export default Page;
