"use client";
import ChangePassword from "#/app/components/user/changePassword";
import InformationPersonal from "#/app/components/user/informationPersonal";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authRepository } from "#/repository/auth";
import { usersRepository } from "#/repository/users";
import { useCookies } from "next-client-cookies";
import { TokenUtil } from "#/utils/token";
import Loading from "#/app/loading";

export default function Page() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState("");
  const cookies = useCookies();

  const idCookie = cookies.get("id");
  const accessToken = cookies.get("access_token");
  const refreshToken = cookies.get("refresh_token");

  useEffect(() => {
    if (accessToken) TokenUtil.setAccessToken(accessToken);
    if (refreshToken) TokenUtil.setRefreshToken(refreshToken);
    TokenUtil.persistToken();
    fetchProfile();
  }, [idCookie, accessToken, refreshToken]);

  const fetchProfile = async () => {
    try {
      const res = await authRepository.api.getUser();
      if (res) {
        setUserId(res.sub);
      } else {
        setUserId(idCookie || "");
      }
      if (res?.status === 401) {
        TokenUtil.clearAccessToken();
        localStorage.removeItem("access_token");
        TokenUtil.persistToken();
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      localStorage.setItem("_id", userId);
      fetchProfileData(userId);
    }
  }, [userId]);

  const fetchProfileData = async (id: string) => {
    try {
      const res = await usersRepository.api.getUser(id);
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
    if (!TokenUtil.accessToken) {
      localStorage.removeItem("_id");
      cookies.remove("id");
      cookies.remove("access_token");
      cookies.remove("refresh_token");
    }
  }, []);

  if (!userData) return <Loading />;

  return (
    <main className="bg-Lilac-50">
      <div className="flex flex-col gap-4 w-full">
        <InformationPersonal id={userId} data={userData} role={userRole} />
        <ChangePassword id={userId} data={userData} />
      </div>
    </main>
  );
}
