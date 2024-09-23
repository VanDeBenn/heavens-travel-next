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
import { useCookies } from "next-client-cookies";
import { TokenUtil } from "#/utils/token";

interface PageProps {
  id: string;
  data: any;
  role: string;
}

export default function Page({ id, data, role }: PageProps) {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [userData, setUserData] = useState<any>("");
  const [userRole, setUserRole] = useState<string>("");
  const cookies = useCookies();

  const idCookie = cookies.get("id");
  const accessTokenByCookie = cookies.get("access_token");
  const refreshTokenByCookie = cookies.get("refresh_token");

  const idLocal: any = idCookie;

  useEffect(() => {
    if (accessTokenByCookie) {
      TokenUtil.setAccessToken(accessTokenByCookie);
    }
    if (refreshTokenByCookie) {
      TokenUtil.setRefreshToken(refreshTokenByCookie);
    }
    TokenUtil.persistToken();
    fetchProfile();
  }, [idCookie, accessTokenByCookie, refreshTokenByCookie]);

  const fetchProfile = async () => {
    try {
      const res = await authRepository.api.getUser();
      if (res) {
        setUserId(res.sub);
      } else {
        setUserId(idLocal);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUserId(idLocal);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
    }
  }, [userId]);

  const fetchProfileData = async (userId: string) => {
    try {
      const res = await usersRepository.api.getUser(userId);
      setUserData(res.body.data);
      setUserRole(res.body.data.role.id);

      cookies.remove("id");
      cookies.remove("access_token");
      cookies.remove("refresh_token");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  if (!userData) {
    return <div>kasih loading ui aaa...</div>;
  }

  return (
    <main className="bg-[#F8F8FF]">
      <div className="px-24 py-10 flex gap-3 w-full">
        <NavProfile />
        <div className="flex flex-col gap-4 w-full">
          <InformationPersonal id={userId} data={userData} role={userRole} />
          <ChangePassword id={userId} data={userData} />
          <Wishlist />
          <MyBooking />
          <BookingDetail />
        </div>
      </div>
    </main>
  );
}
