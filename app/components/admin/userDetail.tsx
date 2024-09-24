"use client";
import React from "react";

import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "#/app/components/user/myBooking";

interface UserDetailsProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthdate: string;
  district: string;
  city: string;
  province: string;
  country: string;
}

// Dummy user data
const userDetailsData: UserDetailsProps = {
  fullName: "John Doe",
  email: "johndoe@example.com",
  phoneNumber: "+1 123 456 7890",
  gender: "Male",
  birthdate: "1990-01-01",
  district: "Central District",
  city: "New York City",
  province: "New York",
  country: "USA",
};

const UserDetail: React.FC = () => {
  const userDetailsArray = [
    { label: "Full Name", value: userDetailsData.fullName },
    { label: "Email", value: userDetailsData.email },
    { label: "Phone Number", value: userDetailsData.phoneNumber },
    { label: "Gender", value: userDetailsData.gender },
    { label: "Birthdate", value: userDetailsData.birthdate },
    { label: "District", value: userDetailsData.district },
    { label: "City", value: userDetailsData.city },
    { label: "Province", value: userDetailsData.province },
    { label: "Country", value: userDetailsData.country },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-7">
      {/* Title Section */}
      <h2 className={`text-xl font-bold mb-5 ${largeMontserrat}`}>
        User Detail
      </h2>

      {/* User Details Section */}
      <div>
        {userDetailsArray.map((detail, index) => (
          <div
            className={`flex items-center mb-4 gap-3 border-b border-gray-300`}
            key={detail.label}
          >
            <div className="flex items-center">
              <div
                className={`text-gray-500 w-60 font-semibold ${mediumMontserrat}`}
              >
                {detail.label}
              </div>
              <span className="font-semibold">:</span>
            </div>
            <div className={`font-semibold  ${smallMontserrat}`}>
              {detail.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetail;
