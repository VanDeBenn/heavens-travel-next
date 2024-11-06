"use client";
import BookingDetail from "#/app/components/admin/bookingDetail";
import { bookingRepository } from "#/repository/bookings";
import React, { useEffect, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const [bookingData, setBookingData] = useState<any>();

  const getBooking = async () => {
    try {
      const res = await bookingRepository.api.getBooking(params.id);
      setBookingData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <>
      <BookingDetail data={bookingData} />
    </>
  );
}
