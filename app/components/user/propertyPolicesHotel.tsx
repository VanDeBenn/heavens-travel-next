"use client";

import { Montserrat } from "next/font/google";

// Mengatur font Montserrat
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

// Tipe untuk array policy list
const policyList: string[] = [
  "When booking more than 5 rooms, different policies and additional supplements may apply.",
  "Infant 0-2 year(s) stay for free if using existing bedding, baby cot/crib may be requested directly from the property.",
  "Children 3-12 year(s) stay for free if using existing bedding, if you need an extra bed, it will incur an additional charge.",
  "Guests 13 years and older are considered as adults, must use an extra bed which will incur an additional charge.",
  "Bed preference depends on check-in availability.",
  "Kids 12+ are adults; <8 not advised in specific rooms.",
  "Children 6-11 get 50% off restaurant breakfast.",
];

export default function PropertyPoliciesHotel() {
  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-6`}>
        <span className="text-base font-semibold">Property Policies</span>
        <div className="py-4">
          <span className="text-xs sm:text-sm text-black">
            Extra beds are dependent on the room you choose. Please check the
            individual room capacity for more details.
          </span>
        </div>
        <div className="  flex flex-col gap-2 text-xs sm:text-sm text-black">
          {policyList.map((policy, index) => (
            <span key={index}>• {policy}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
