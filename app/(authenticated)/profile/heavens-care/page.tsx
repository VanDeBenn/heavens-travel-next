"use client";
import React, { useEffect, useState } from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";

import HeavensCare from "#/app/components/user/heavensCare";
import { bookingRepository } from "#/repository/bookings";
import { bookingDetailRepository } from "#/repository/bookingDetail";
function page() {
  const [bookingData, setBookingData] = useState<any>();

  const getBooking = async () => {
    const res = await bookingDetailRepository.api.getBookingDetail(
      "dec35f2d-40e2-48ce-a39b-0efc1d0e1661"
    );
    setBookingData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <main className="bg-Lilac-50">
      <div>
        <Header />
      </div>

      <div className=" px-16 pb-8 pt-24">
        <HeavensCare data={bookingData} />
      </div>
    </main>
  );
}

export default page;
