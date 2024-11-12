"use client";
import React, { useEffect, useState } from "react";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import ProfileLayout from "../layout";
import UserList from "#/app/components/admin/userList";
import { usersRepository } from "#/repository/users";
import { Users } from "#/app/types/Users";

const UserPage = () => {
  const [allUsersData, setAllUsersData] = useState<Users[]>([]);

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

  // console.log(allUsersData);
  return (
    <div className="flex flex-col gap-5">
      <UserList data={allUsersData} />
    </div>
  );
};

export default UserPage;
