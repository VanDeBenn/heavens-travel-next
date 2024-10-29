"use client";

import NextStepDestination from "#/app/components/admin/nextStepDestination";
import BasicInfoDestination from "#/app/components/admin/basicInfoDestination";
import LocationInfoDestination from "#/app/components/admin/locationInfoDestination";
import PhotoDestination from "#/app/components/admin/photoDestination";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { destinationRepository } from "#/repository/destinations";
import { useRouter } from "next/navigation";

interface BasicInfo {
  name: string;
  adultPrice: number;
  childrenPrice: number;
  description: string;
  maxCapacity: number;
  rating: number;
}

interface LocationInfo {
  pathLocation: string;
  district: string;
  city: string;
  province: string;
  country: string;
  address: string;
}

export default function page() {
  const router = useRouter();
  const [photoData, setPhotoData] = useState();
  const [submitForms, setSubmitForms] = useState(false);
  const [destinationId, setDestinationId] = useState<string>("");

  const [basicInfoDestination, setBasicInfoDestination] = useState<BasicInfo>({
    name: "",
    adultPrice: 0,
    childrenPrice: 0,
    description: "",
    maxCapacity: 0,
    rating: 0,
  });

  const [locationDestination, setLocationDestination] = useState<LocationInfo>({
    pathLocation: "",
    district: "",
    city: "",
    province: "",
    country: "",
    address: "",
  });

  const finish = async () => {
    try {
      const finalData = {
        name: basicInfoDestination.name,
        priceAdult: basicInfoDestination.adultPrice,
        priceChildren: basicInfoDestination.childrenPrice,
        // district: locationDestination.district,
        // city: locationDestination.city,
        // province: locationDestination.province,
        // country: locationDestination.country,
        address: locationDestination.address,
        description: basicInfoDestination.description,
        maxCapacity: basicInfoDestination.maxCapacity,
        rating: basicInfoDestination.rating,
        pathLocation: locationDestination.pathLocation,
        // photos: photoInfo,
      };
      // console.log("Final Data:", finalData);
      const res = await destinationRepository.api.create(finalData);
      const idDestination = res.body.data.id;
      if (idDestination) {
        localStorage.setItem("_destination", idDestination);
        setDestinationId(idDestination);
        // router.push("/admin/destinations/create/result");
      }
      // console.log("return:", res.body.data.id);
      // console.log("id desti", idDestination);
      message.success("Destination created successfully!");
    } catch (error) {
      console.error("Error while creating destination:", error);
      message.error("Failed to create destination.");
    }
  };

  useEffect(() => {
    if (submitForms) {
      // console.log("Location Data:", locationDestination);
      // console.log("Photo Data:", photoData);
      // console.log("Destination Data:", basicInfoDestination);

      finish();

      setSubmitForms(false);
    }
  }, [locationDestination, photoData, basicInfoDestination, submitForms]);

  return (
    <>
      <div
        className={`${mediumMontserrat.className} flex gap-2 items-center text-sm text-black`}
      >
        <Link href={"/admin/destinations"} className="no-underline text-black">
          Destination
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
        <BasicInfoDestination
          setBasicInfoDestination={setBasicInfoDestination}
          submitBasicInfoForm={submitForms}
        />
        <LocationInfoDestination
          setLocationDestination={setLocationDestination}
          submitLocationForm={submitForms}
        />
        <PhotoDestination
          setPhotoData={setPhotoData}
          destinationId={destinationId}
          submitPhotoForm={submitForms}
        />
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
          className="bg-RoyalAmethyst-700 text-center w-32 py-1 no-underline text-white text-sm rounded-xl cursor-pointer"
        >
          Done
        </Button>
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
