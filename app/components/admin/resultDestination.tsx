"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Import Image from next/image
import {
  largeMontserrat,
  mediumMontserrat,
  smallMontserrat,
} from "#/app/components/user/myBooking";
import Link from "next/link";
import { destinationRepository } from "#/repository/destinations";
import Loading from "#/app/loading";
import { useRouter } from "next/navigation";

const ResultDestination: React.FC = () => {
  const router = useRouter();
  const [destinationData, setDestinationData] = useState<any>(null);
  const id: any = localStorage.getItem("_destination");

  const fetchDestination = async () => {
    try {
      if (id == null) {
        router.push("/admin/destinations");
      }
      const res = await destinationRepository.api.getDestination(id);
      setDestinationData(res.body.data); // Save data to state
      console.log("data:", res.body.data); // Log to confirm
      localStorage.removeItem("_destination");
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  useEffect(() => {
    fetchDestination();
    // localStorage.removeItem("_destination");
  }, []);

  if (!destinationData) {
    return <Loading />;
  }

  const guestDetails = [
    {
      label: "Name Destination",
      value: destinationData.name,
    },
    {
      label: "Rating",
      value: destinationData.rating,
    },
    {
      label: "Description",
      value: destinationData.description,
    },
    {
      label: "Adult Price",
      value: `Rp${destinationData.priceAdult || null}`,
    },
    {
      label: "Children Price",
      value: `Rp${destinationData.priceChildren || null}`,
    },
  ];

  const guestDetails2 = [
    {
      label: "Address",
      value: destinationData.address,
    },
    {
      label: "Path Location",
      value: destinationData.pathLocation,
    },
    {
      label: "District",
      value: "Unknown", // You can update this when you have more detailed data
    },
    {
      label: "City",
      value: "Unknown", // You can update this when you have more detailed data
    },
    {
      label: "Province",
      value: "Unknown", // You can update this when you have more detailed data
    },
    {
      label: "Country",
      value: "Unknown", // You can update this when you have more detailed data
    },
  ];

  return (
    <div>
      <div className={`${mediumMontserrat.className} py-6 px-7`}>
        <span className="text-lg font-semibold">
          Create Destination Success
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {/* Basic Information Section */}
        <div
          className={`bg-white rounded-xl border-solid border-gray-200 border p-7`}
        >
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-lg font-semibold">Basic Information</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className}`}>
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
        </div>

        {/* Location Section */}
        <div
          className={`bg-white rounded-xl border-solid border-gray-200 border p-7`}
        >
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-lg font-semibold">Location</span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className={`${mediumMontserrat.className}`}>
            {guestDetails2.map((detail, index) => (
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
                  <div className="w-full">
                    <div className={`text-base text-black ${mediumMontserrat}`}>
                      {detail.value}
                    </div>
                  </div>
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Photos Section */}
        <div
          className={`bg-white rounded-xl border-solid border-gray-200 border p-7`}
        >
          <div className={`${mediumMontserrat.className} pb-6`}>
            <span className="text-lg font-semibold">Photos</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div
            className={`${mediumMontserrat.className} grid grid-cols-4 gap-4 pt-6`}
          >
            {guestDetails3.map((detail, index) => (
              <div key={index}>
                <div className="w-full">
                  {/* Using next/image for responsive image */}
                  <Image
                    src={detail.value}
                    alt="Location Map"
                    width={400} // Image width
                    height={150} // Image height
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="h-px bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-7 flex justify-end">
          <Link
            href={"/admin/destinations"}
            className="bg-[#4F28D9] border-solid no-underline border transition-all duration-300 text-white rounded-xl py-2 px-20 text-center font-semibold"
          >
            Done
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultDestination;

const guestDetails3 = [
  {
    value: "/images/illustration/bedroom-suite.jpg", // Path gambar (example)
  },
  {
    value: "/images/illustration/luxury-bedroom.jpg", // Path gambar (example)
  },
  {
    value: "/images/illustration/bedroom-suite.jpg", // Path gambar (example)
  },
  {
    value: "/images/illustration/luxury-bedroom.jpg", // Path gambar (example)
  },
];
