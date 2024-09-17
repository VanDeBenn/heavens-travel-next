"use client";
import ChangePassword from "#/app/components/user/changePassword";
import InformationPersonal from "#/app/components/user/informationPersonal";
import MyBooking from "#/app/components/user/myBooking";
import NavProfile from "#/app/components/user/navProfile";
import Wishlist from "#/app/components/user/wishlist";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingDetail from "#/app/components/user/bookingDetail";
import { authRepository } from "#/repository/auth";
import { usersRepository } from "#/repository/users";

interface PageProps {
  id: string;
  data: any;
}

export default function Page({ id, data }: PageProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState();

  const fetchProfile = async () => {
    try {
      const res = await authRepository.api.getUser();
      if (!res) {
        router.push("/login");
        return;
      }
      setUserId(res.sub);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // router.push("/login");
    }
  };

  const fetchProfileData = async (userId: string) => {
    try {
      const res = await usersRepository.api.getUser(userId);
      const userData = res.body.data;
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <main className="bg-[#F8F8FF]">
      <div className="px-24 py-10 flex gap-3 w-full">
        <NavProfile />
        <div className="flex flex-col gap-4 w-full">
          <InformationPersonal id={userId} data={userData} />
          <ChangePassword id={userId} data={userData} />
          <Wishlist />
          <MyBooking />
          <BookingDetail />
        </div>
      </div>
    </main>
  );
}
