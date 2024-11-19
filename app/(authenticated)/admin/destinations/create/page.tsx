"use client";

import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { destinationRepository } from "#/repository/destinations";
import BasicInfoDestination from "#/app/components/admin/basicInfoDestination";
import LocationInfoDestination from "#/app/components/admin/locationInfoDestination";
import PhotoDestination from "#/app/components/admin/photoDestination";

const mediumMontserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });

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
  cityName: string;
  provinceName: string;
  countryName: string;
  address: string;
}

export default function Page() {
  const router = useRouter();
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
    cityName: "",
    provinceName: "",
    countryName: "",
    address: "",
  });

  const finish = async () => {
    try {
      const finalData = {
        name: basicInfoDestination.name,
        priceAdult: basicInfoDestination.adultPrice,
        priceChildren: basicInfoDestination.childrenPrice,
        cityName: locationDestination.cityName,
        provinceName: locationDestination.provinceName,
        countryName: locationDestination.countryName,
        address: locationDestination.address,
        description: basicInfoDestination.description,
        maxCapacity: basicInfoDestination.maxCapacity,
        rating: basicInfoDestination.rating,
        pathLocation: locationDestination.pathLocation,
      };

      const res = await destinationRepository.api.create(finalData);
      const idDestination = res.body.data.id;

      if (idDestination) {
        localStorage.setItem("_destination", idDestination);
        setDestinationId(idDestination);
        router.push("/admin/destinations/create/result");
      }

      message.success("Destination created successfully!");
    } catch (error) {
      console.error("Error while creating destination:", error);
      message.error("Failed to create destination.");
    }
  };

  useEffect(() => {
    if (submitForms) {
      finish();
      setSubmitForms(false);
    }
  }, [submitForms]);

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
          destinationId={destinationId}
          submitPhotoForm={submitForms}
        />
      </div>

      <div className="flex justify-end mt-5">
        <Button
          onClick={() => {
            setSubmitForms(true);
          }}
          className="bg-RoyalAmethyst-700 text-center w-32 py-1 text-white text-sm rounded-xl"
        >
          Done
        </Button>
      </div>
    </>
  );
}
