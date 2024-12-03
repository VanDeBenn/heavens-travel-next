"use client";
import BookingDetail from "#/app/components/user/bookingDetail";
import MyBooking from "#/app/components/user/myBooking";
import { usersRepository } from "#/repository/users";
import React, { useEffect, useState } from "react";

export default function booking() {
  const [bookingsData, setBookingsData] = useState<any>();
  const id = localStorage.getItem("_id");

  const getAllBooking = async () => {
    const res = await usersRepository.api.getUser(id || "");
    setBookingsData(res.body.data.bookings);
  };
  useEffect(() => {
    getAllBooking();
  }, []);

  return (
    <>
      <MyBooking data={bookingsData} />
      {/* <BookingDetail data={undefined} /> */}
    </>
  );
}
