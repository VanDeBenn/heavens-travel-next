"use client";
import RoomList from "#/app/components/admin/roomList";
import Loading from "#/app/loading";
import { hotelRepository } from "#/repository/hotels";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const pathname = usePathname();
  const [roomHotelsData, setRoomHotelsData] = useState<any>();

  if (!pathname) {
    return <Loading />;
  }

  const pathSegments = pathname.split("/");
  const hotelId = pathSegments[4]; // path to array

  const getRoomHotels = async () => {
    const res = await hotelRepository.api.getHotel(hotelId);
    setRoomHotelsData(res.data.roomhotels);
  };

  useEffect(() => {
    getRoomHotels();
  }, []);

  return (
    <div>
      <RoomList data={roomHotelsData} id={hotelId} />
    </div>
  );
}
