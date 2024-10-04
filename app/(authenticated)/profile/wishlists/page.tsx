"use client";
import MyBooking from "#/app/components/user/myBooking";
import Wishlist from "#/app/components/user/wishlist";
import Loading from "#/app/loading";
import { usersRepository } from "#/repository/users";
import React, { useEffect, useState } from "react";

export default function wishlist() {
  const [userData, setUserData] = useState<any[]>([]);

  const fetchProfileData = async () => {
    try {
      const res = await usersRepository.api.getUser(
        localStorage.getItem("_id") || ""
      );
      setUserData(res.body.data.wishlists);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <main className="bg-[#F8F8FF]">
      <div className="flex flex-col gap-4 w-full">
        <Wishlist data={userData} />
      </div>
    </main>
  );
}
