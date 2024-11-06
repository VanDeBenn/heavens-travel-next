"use client";
import BookingList from "#/app/components/admin/bookingList";
import { bookingRepository } from "#/repository/bookings";
import React, { useEffect, useState } from "react";

export default function page() {
  const [bookingsData, setBookingsData] = useState<any>();

  const getAllBookings = async () => {
    try {
      const res = await bookingRepository.api.getBookings();
      setBookingsData(res.data);
    } catch (error) {}
  };
  console.log(bookingsData);

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div>
      <BookingList data={bookingsData} />
    </div>
  );
}
