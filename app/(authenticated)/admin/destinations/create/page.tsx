"use client";

import NextStepDestination from "#/app/components/admin/nextStepDestination";
import BasicInfoDestination from "#/app/components/admin/basicInfoDestination";
import LocationInfoDestination from "#/app/components/admin/locationInfoDestination";
import PhotoDestination from "#/app/components/admin/photoDestination";
import { Montserrat } from "next/font/google";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div
        className={`${mediumMontserrat.className} flex gap-2 items-center text-sm text-black`}
      >
        <Link href={"/admin/destinations"} className="no-underline text-black">
          Destination
        </Link>
        <span>/</span>
        <Link href={"/admin/destinations/create"} className="no-underline text-black">
          Create
        </Link>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        {/* <NextStepDestination /> */}
        <BasicInfoDestination />
        <LocationInfoDestination />
        <PhotoDestination />
      </div>
      <div className="flex justify-end mt-5">
        <Link
          href={"/admin/destinations/create/result"}
          className="bg-RoyalAmethyst-700 text-center w-32 py-1 no-underline text-white text-sm rounded-xl cursor-pointer"
        >
          Done
        </Link>
      </div>
    </>
  );
}

const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});
