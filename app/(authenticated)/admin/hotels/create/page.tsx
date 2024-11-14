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
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { hotelRepository } from "#/repository/hotels";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface HotelInformation {
  name: string;
  roomType: string;
  rating: number | string;
  description: string;
  location: {
    address: string;
    pathLocation: string;
    district: string;
    city: string;
    province: string;
    country: string;
  };
  hotelPhoto?: string;
  policies?: string[];
}

export default function page() {
  const router = useRouter();
  const [submitForms, setSubmitForms] = useState(false);

  const finish = async () => {
    try {
      const finalData = {};
      const res = await hotelRepository.api.create(finalData);
    } catch (error) {}
  };

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
        <LocationInfoHotel
          setLocationDestination={function (data: {
            address: string;
            pathLocation: string;
            district: string;
            city: string;
            province: string;
            country: string;
          }): void {
            throw new Error("Function not implemented.");
          }}
          submitLocationForm={false}
        />
        <PhotoHotel />
        {/* <FacilityInfoHotel /> */}
        {/* <NearbyLocationHotel /> */}
        <PoliciesHotel />
        {/* <SomeHelpfulFactsHotel /> */}
        {/* <FaqsHotel /> */}
      </div>
      <div className="flex justify-end mt-5">
        <Button
          onClick={() => {
            setSubmitForms(true);
            finish();

            setTimeout(() => {
              router.push("/admin/destinations/create/result");
            }, 3000);
          }}
          href={"/admin/hotels/create/result"}
          className="bg-RoyalAmethyst-700 text-center w-32 py-1 no-underline text-white text-sm rounded-xl cursor-pointer"
        >
          Done
        </Button>
      </div>
    </>
    // <div>
    //   <NextStepHotel />
    // </div>
  );
}
