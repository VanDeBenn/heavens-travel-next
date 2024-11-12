"use client";
import UserDetail from "#/app/components/admin/userDetail";
import Loading from "#/app/loading";
import { User } from "#/app/types/Users";
import { usersRepository } from "#/repository/users";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [userData, setUserData] = useState<User>();

  const fetchUser = async () => {
    try {
      const res = await usersRepository.api.getUser(params.id);
      setUserData(res.body.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="bg-Lilac-50 flex flex-col gap-4">
      <UserDetail userData={userData} />
    </div>
  );
}
