"use client";
import React, { useEffect, useState } from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";

import HeavensCare from "#/app/components/user/heavensCare";
import { bookingRepository } from "#/repository/bookings";
import { bookingDetailRepository } from "#/repository/bookingDetail";
function page() {
  const [bookingData, setBookingData] = useState<any>();

  const id = "a18bdf76-85f0-4959-947a-3addebe58536";
  const getBooking = async () => {
    const res = await bookingDetailRepository.api.getBookingDetail(id);
    setBookingData(res.data);
    // console.log(res.data);
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
        <HeavensCare id={id} data={bookingData} />
      </div>
    </main>
  );
}

export default page;
