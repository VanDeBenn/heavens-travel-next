"use client";
import ChangePassword from "#/app/components/user/changePassword";
import InformationPersonal from "#/app/components/user/informationPersonal";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

  const idCookie: any = cookies.get("id");
  const accessTokenByCookie = cookies.get("access_token");
  const refreshTokenByCookie = cookies.get("refresh_token");

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
        setUserId(idCookie);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUserId(idCookie);
    }
  };

  useEffect(() => {
    if (userId) {
      if (typeof window !== "undefined") {
        localStorage.setItem("_id", userId);
      }
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!TokenUtil.accessToken) {
        localStorage.removeItem("_id");
      }
    }
  }, []);

  if (!userData) {
    return <div>kasih loading ui aaa...</div>;
  }

  return (
    <main className="bg-[#F8F8FF]">
      <div className="flex flex-col gap-4 w-full">
        <InformationPersonal id={userId} data={userData} role={userRole} />
        <ChangePassword id={userId} data={userData} />
      </div>
    </main>
  );
}
