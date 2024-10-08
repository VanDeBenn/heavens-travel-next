"use client";
import React from "react";

import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "#/app/components/user/myBooking";
import Link from "next/link";

const UserDetail: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-7">
      <div className={` `}>
        <div className={`${mediumMontserrat.className} pb-6`}>
          <span className="text-lg font-semibold">User Detail</span>
        </div>
        <div className="h-px bg-gray-300"></div>

        <div className={`${mediumMontserrat.className} `}>
          {guestDetails.map((detail, index) => (
            <div key={index}>
              <div className="flex items-center py-5 gap-2">
                <div className="flex items-center">
                  <div
                    className={`text-black w-60 font-semibold text-base ${mediumMontserrat}`}
                  >
                    {detail.label}
                  </div>
                  <span className="font-semibold">:</span>
                </div>
                <div className={`text-base text-black ${mediumMontserrat}`}>
                  {detail.value}
                </div>
              </div>
              <div className="h-px bg-gray-300"></div>
            </div>
          ))}
        </div>

        <div className="pt-7 flex justify-end">
          <Link
            href={"/admin/users"}
            className="border-[#4F28D9] border-solid no-underline border hover:bg-[#4F28D9] transition-all duration-300 hover:text-white
             rounded-xl py-2 px-20 text-[#4F28D9] text-center font-semibold"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

const guestDetails = [
  {
    label: "Full Name",
    value: "Disoue Oie",
  },
  {
    label: "Email",
    value: "DisoueOie@asolole.com",
  },
  {
    label: "Phone Number",
    value: "08123456789",
  },
  {
    label: "Gender",
    value: "Laki-Laki",
  },
  {
    label: "Birthdate",
    value: "26-05-2024",
  },
  {
    label: "District",
    value: "Tambun",
  },
  {
    label: "City",
    value: "Bekasi",
  },
  {
    label: "Province",
    value: "West Java",
  },
  {
    label: "Country",
    value: "Indonesia",
  },
];
