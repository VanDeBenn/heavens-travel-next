"use client";
import React, { useEffect, useState } from "react";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import ProfileLayout from "../layout";
import UserList from "#/app/components/admin/userList";
import { usersRepository } from "#/repository/users";

interface PageProps {
  data: any;
}

const UserPage = ({ data }: PageProps) => {
  const [allUserData, setAllUserData] = useState<any[]>([]);

  const getAllUser = async () => {
    try {
      const res = await usersRepository.api.getAllUsers();
      setAllUserData(res.body.data);
    } catch (error) {}
  };
  console.log(allUserData);

  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <UserList data={allUserData} />
    </div>
  );
};

export default UserPage;
