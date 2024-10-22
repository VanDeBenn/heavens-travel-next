"use client";
import CreateInfoRoom from "#/app/components/admin/createInfoRoom";
import FacilityRoom from "#/app/components/admin/facilityRoom";
import PhotoRoomHotel from "#/app/components/admin/photoRoomHotel";
import { mediumMontserrat } from "#/app/components/user/myBooking";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="">
      <div
        className={`${mediumMontserrat.className} flex items-center gap-2 mb-5`}
      >
        <Link
          href={"/admin/hotels/"}
          className="no-underline text-black text-sm"
        >
          Hotel
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/"}
          className="no-underline text-black text-sm"
        >
          Detail
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/room-list"}
          className="no-underline text-black text-sm"
        >
          Room Listing
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/room-list/room-create"}
          className="no-underline text-black text-sm"
        >
          Create
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <CreateInfoRoom />
        <PhotoRoomHotel />
        <FacilityRoom />
      </div>
    </div>
  );
}
