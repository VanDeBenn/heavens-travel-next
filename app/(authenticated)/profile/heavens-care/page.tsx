"use client";

import React, { useEffect, useState } from "react";
import Footer from "#/app/components/user/footer";
import Header from "#/app/components/user/header";
import HeavensCare from "#/app/components/user/heavensCare";
import { bookingRepository } from "#/repository/bookings";
import { bookingDetailRepository } from "#/repository/bookingDetail";
import { useSearchParams } from "next/navigation";

function Page() {
  const [bookingId, setBookingId] = useState<any>();
  const [bookingDetailId, setBookingDetailId] = useState<any>();
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState(null);
  const [bookingDetailData, setBookingDetailData] = useState(null);

  useEffect(() => {
    const bookings = searchParams?.get("books");
    const bookdetail = searchParams?.get("book");
    setBookingId(bookings);
    setBookingDetailId(bookdetail);
  }, [searchParams]);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        if (bookingId) {
          const res = await bookingRepository.api.getBooking(bookingId);
          setBookingData(res.data);
          console.log("bookings", res);
        } else if (bookingDetailId) {
          const res = await bookingDetailRepository.api.getBookingDetail(
            bookingDetailId
          );
          setBookingDetailData(res.data);
          console.log("detail", res);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookingData();
  }, [bookingId, bookingDetailId]);

  console.log("ini ", bookingData || bookingDetailData);
  return (
    <main className="bg-Lilac-50">
      <Header />
      <div className="px-16 pb-8 pt-24">
        <HeavensCare
          bookingsId={bookingId}
          bookingDetailId={bookingDetailId}
          data={bookingData || bookingDetailData}
        />
      </div>
      <Footer />
    </main>
  );
}

export default Page;
