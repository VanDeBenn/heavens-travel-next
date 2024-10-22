"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";
 
import BasicInfoHotel from "#/app/components/admin/basicInfoHotel";
import LocationInfoHotel from "#/app/components/admin/locationInfoHotel";
import PhotoHotel from "#/app/components/admin/photoHotel";
import FacilityInfoHotel from "#/app/components/admin/facilityInfoHotel";
import NearbyLocationHotel from "#/app/components/admin/nearbyLocationHotel";
import PoliciesHotel from "#/app/components/admin/PoliciesHotel";
import SomeHelpfulFactsHotel from "#/app/components/admin/someHelpfulFactsHotel";
import FaqsHotel from "#/app/components/admin/faqsHotel";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
export default function page() {
  return (
    <>
      <div
        className={`${mediumMontserrat.className} flex gap-2 items-center text-sm text-black`}
      >
        <Link href={"/admin/destinations"} className="no-underline text-black">
          Hotel
        </Link>
        <span>/</span>
        <Link
          href={"/admin/destinations/create"}
          className="no-underline text-black"
        >
          Create
        </Link>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <BasicInfoHotel />
        <LocationInfoHotel />
        <PhotoHotel />
        <FacilityInfoHotel />
        <NearbyLocationHotel />
        <PoliciesHotel />
        <SomeHelpfulFactsHotel />
        <FaqsHotel />
      </div>
      <div className="flex justify-end mt-5">
        <Link
          href={"/admin/hotels/create/result"}
          className="bg-RoyalAmethyst-700 text-center w-32 py-1 no-underline text-white text-sm rounded-xl cursor-pointer"
        >
          Done
        </Link>
      </div>
    </>
    // <div>
    //   <NextStepHotel />
    // </div>
  );
}
