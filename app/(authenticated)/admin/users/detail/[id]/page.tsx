"use client";
import UserDetail from "#/app/components/admin/userDetail";
import { usersRepository } from "#/repository/users";
import React, { useEffect, useState } from "react";

interface PageProps {
  data: any;
}

export default function Page(
  { params }: { params: { id: string } },
  { data }: PageProps
) {
  const [userData, setUserData] = useState<any[]>([]);

  const fetchUser = async () => {
    try {
      const res = await usersRepository.api.getUser(params.id);
      setUserData(res.body.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="bg-Lilac-50 flex flex-col gap-4">
      <UserDetail userData={userData} />
    </div>
  );
}
