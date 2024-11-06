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
  const [allUsersData, setAllUsersData] = useState<any[]>([]);

  const getAllUsers = async () => {
    try {
      const res = await usersRepository.api.getAllUsers();
      setAllUsersData(res.body.data);
    } catch (error) {}
  };
  // console.log(allUsersData);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <UserList data={allUsersData} />
    </div>
  );
};

export default UserPage;
