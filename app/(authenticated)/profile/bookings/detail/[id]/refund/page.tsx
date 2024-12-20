"use client";
import BookingRefund from "#/app/components/user/bookingRefund";
import Loading from "#/app/loading";
import { bookingRepository } from "#/repository/bookings";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [bookingData, setBookingData] = useState<any>();

  const pathname = usePathname();

  if (!pathname) {
    return <Loading />;
  }

  const pathSegments = pathname.split("/");
  const bookingId = pathSegments[4];

  const getBookingRefund = async () => {
    const res = await bookingRepository.api.getBooking(bookingId);
    setBookingData(res?.data);
  };

  useEffect(() => {
    getBookingRefund();
  }, []);

  return (
    <>
      <BookingRefund data={bookingData} bookingId={bookingId} />
    </>
  );
}
