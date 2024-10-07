import React from "react";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import ProfileLayout from "../layout";
import UserList from "#/app/components/admin/userList";

const UserPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <UserList />
    </div>
  );
};

export default UserPage;
