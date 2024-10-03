import MyBooking from "#/app/components/user/myBooking";
import Wishlist from "#/app/components/user/wishlist";
import React from "react";

export default function wishlist({
  userData,
  userRole,
}: {
  userData: any;
  userRole: string;
}) {
  return (
    <main className="bg-[#a7a7d5]">
      <div className="flex flex-col gap-4 w-full">
        <Wishlist id={""} data={undefined} />
      </div>
    </main>
  );
}
