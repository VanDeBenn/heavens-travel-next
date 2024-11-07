"use client";
import React, { useEffect, useState } from "react";
import ChangePasswordAdmin from "#/app/components/admin/changePasswordAdmin";
import InformationAdmin from "#/app/components/admin/informationAdmin";
import ProfileLayout from "../layout";
import HotelList from "#/app/components/admin/hotelList";
import { hotelRepository } from "#/repository/hotels";

const HotelPage = () => {
  const [hotelsData, setHotelsData] = useState<any>();

  const getAllHotels = async () => {
    const res = await hotelRepository.api.getHotels();
    setHotelsData(res.data);
  };

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <div>
      <HotelList data={hotelsData} />
    </div>
  );
};

export default HotelPage;
