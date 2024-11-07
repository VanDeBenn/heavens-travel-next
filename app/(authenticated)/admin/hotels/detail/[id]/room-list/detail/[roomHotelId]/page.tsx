"use client";
import RoomDetail from "#/app/components/admin/roomDetail";
import { roomHotelRepository } from "#/repository/roomHotels";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { roomHotelId: string } }) {
  const [roomHotelData, setRoomHotelData] = useState<any>();

  const getRoomHotel = async () => {
    const res = await roomHotelRepository.api.getRoomHotel(params.roomHotelId);
    setRoomHotelData(res.data);
  };

  useEffect(() => {
    getRoomHotel();
  }, []);

  return <RoomDetail data={roomHotelData} />;
}
