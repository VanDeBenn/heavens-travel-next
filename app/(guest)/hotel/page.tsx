"use client";
import React, { useEffect, useState } from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import Hotels from "#/app/components/user/hotels";
import PopularHotelsIn from "#/app/components/user/popularHotelsIn";
import PromoteSlider from "#/app/components/user/promoteSlider";
import { cityRepository } from "#/repository/cities";
import { hotelRepository } from "#/repository/hotels";

interface PageProps {
  data: any;
  dataCity: any;
}

export default function page({ data, dataCity }: PageProps) {
  const [dataHotels, setDataHotels] = useState<any[]>([]);
  const [dataCities, setDataCities] = useState<any[]>([]);

  const fetchCities = async () => {
    try {
      const res = await cityRepository.api.getCitys();
      setDataCities(res.data);
    } catch (error) {}
  };

  const fetchHotels = async () => {
    try {
      const res = await hotelRepository.api.getHotels();
      setDataHotels(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  return (
    <main className="bg-[#F8F8FF]">
      <Header />
      <div className="">
        <Hotels data={dataHotels} dataCity={dataCities} />
      </div>
      <div className=" px-16 pb-8 pt-24 flex flex-col gap-10">
        <PromoteSlider />
        <PopularHotelsIn data={dataHotels} dataCity={dataCities} />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
