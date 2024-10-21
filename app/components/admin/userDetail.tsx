"use client";
import React from "react";
import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "#/app/components/user/myBooking";
import Link from "next/link";

interface ComponentsProps {
  userData: any;
}

export default function UserDetail({ userData }: ComponentsProps) {
  const guestDetails = [
    {
      label: "Full Name",
      value: userData.fullName || "N/A",
    },
    {
      label: "Email",
      value: userData.email || "N/A",
    },
    {
      label: "Phone Number",
      value: userData.phoneNumber || "N/A",
    },
    {
      label: "Gender",
      value: userData.gender || "N/A",
    },
    {
      label: "Birthdate",
      value: userData.birthDate
        ? new Date(userData.birthDate).toLocaleDateString()
        : "N/A",
    },
    {
      label: "District",
      value: userData.district || "N/A",
    },
    {
      label: "City",
      value: userData.city || "N/A",
    },
    {
      label: "Province",
      value: userData.province || "N/A",
    },
    {
      label: "Country",
      value: userData.country || "N/A",
    },
    {
      label: "Role",
      value: userData.role?.name || "N/A",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-7">
      <div>
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
            className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white
             rounded-xl py-2 px-20 text-RoyalAmethyst-700 text-center font-semibold"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
