import React from "react";
import ProfileLayout from "#/app/components/admin/ProfileLayout";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";

const HotelPage = () => {
  return (
    <ProfileLayout>
      {/* example  */}
      <ChangePasswordAdmin id={""} data={undefined} />
      {/* end example  */}
    </ProfileLayout>
  );
};

export default HotelPage;
