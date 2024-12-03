"use client";
import BookingDetail from "#/app/components/user/bookingDetail";
import DestinationDetail from "#/app/components/admin/destinationDetail";
import { destinationRepository } from "#/repository/destinations";
import React, { useEffect, useState } from "react";
import { bookingRepository } from "#/repository/bookings";

export default function page({ params }: { params: { id: string } }) {
  const [bookingData, setBookingData] = useState<any>();

  const getBooking = async () => {
    const res = await bookingRepository.api.getBooking(params.id);
    setBookingData(res.data);
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
