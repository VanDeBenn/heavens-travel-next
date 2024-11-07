"use client";
import HotelDetail from "#/app/components/admin/hotelDetail";
import { hotelRepository } from "#/repository/hotels";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [hotelsData, setHotelsData] = useState<any>();

  const getHotel = async () => {
    const res = await hotelRepository.api.getHotel(params.id);
    setHotelsData(res.data);
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <HotelDetail data={hotelsData} />
    </>
  );
}
