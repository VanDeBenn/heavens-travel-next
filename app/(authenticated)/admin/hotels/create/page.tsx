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
import { useEffect, useState } from "react";
import { hotelRepository } from "#/repository/hotels";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface BasicInfo {
  name: string;
  roomType: string;
  rating: number;
  description: string;
}

interface LocationInfo {
  address: string;
  pathLocation: string;
  district: string;
  cityName: string;
  provinceName: string;
  countryName: string;
}

export default function page() {
  const router = useRouter();
  const [hotelId, setHotelId] = useState<string>("");
  const [submitForms, setSubmitForms] = useState(false);
  const [basicInfoHotel, setBasicInfoHotel] = useState<BasicInfo>({
    name: "",
    roomType: "",
    rating: 0,
    description: "",
  });

  const [locationHotel, setLocationHotel] = useState<LocationInfo>({
    pathLocation: "",
    district: "",
    cityName: "",
    provinceName: "",
    countryName: "",
    address: "",
  });

  const finish = async () => {
    try {
      // Validasi data sebelum submit
      if (
        !basicInfoHotel.name ||
        // !basicInfoHotel.roomType ||
        !basicInfoHotel.rating ||
        !basicInfoHotel.description
        // !locationHotel.cityName ||
        // !locationHotel.provinceName
      ) {
        console.log("Data tidak lengkap!");
        return;
      }

      const finalData = {
        name: basicInfoHotel.name,
        // roomType: basicInfoHotel.roomType,
        rating: basicInfoHotel.rating,
        description: basicInfoHotel.description,
        cityName: locationHotel.cityName,
        provinceName: locationHotel.provinceName,
        countryName: locationHotel.countryName,
        address: locationHotel.address,
        pathLocation: locationHotel.pathLocation,
      };

      console.log("Final data:", finalData);

      const res = await hotelRepository.api.create(finalData);
      const idHotel = res.body.data?.id;

      if (idHotel) {
        localStorage.setItem("_hotel", idHotel);
        setHotelId(idHotel);
        router.push("/admin/hotels/create/result");
      }
    } catch (error) {
      console.error("Error while creating hotel:", error);
    }
  };

  useEffect(() => {
    if (submitForms) {
      // finish();
      setSubmitForms(false);
    }
  }, [submitForms]);

  return (
    <>
      <div
        className={`${mediumMontserrat.className} flex gap-2 items-center text-sm text-black`}
      >
        <Link href={"/admin/hotels"} className="no-underline text-black">
          Hotel
        </Link>
        <span>/</span>
        <Link href={"/admin/hotels/create"} className="no-underline text-black">
          Create
        </Link>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <BasicInfoHotel
          setBasicInfoHotel={setBasicInfoHotel}
          submitBasicInfoForm={submitForms}
        />
        <LocationInfoHotel
          setLocationHotel={setLocationHotel}
          submitLocationForm={submitForms}
        />
        <PhotoHotel hotelId={hotelId} />

        <FacilityInfoHotel />
        <NearbyLocationHotel />

        <PoliciesHotel hotelId={hotelId} />

        <SomeHelpfulFactsHotel />
        
      </div>
      <div className="flex justify-end mt-5">
        <Button
          onClick={() => {
            setSubmitForms(true);
            finish();
            // setTimeout(() => {
            //   router.push("/admin/hotels/create/result");
            // }, 3000);
          }}
          // href={"/admin/hotels/create/result"}
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

// "use client";

// import { Montserrat } from "next/font/google";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Button } from "antd";

// import BasicInfoHotel from "#/app/components/admin/basicInfoHotel";
// import LocationInfoHotel from "#/app/components/admin/locationInfoHotel";
// import PhotoHotel from "#/app/components/admin/photoHotel";
// import PoliciesHotel from "#/app/components/admin/PoliciesHotel";
// import { hotelRepository } from "#/repository/hotels";

// const mediumMontserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["500"],
// });

// interface BasicInfo {
//   name: string;
//   roomType: string;
//   rating: number;
//   description: string;
// }

// interface LocationInfo {
//   address: string;
//   pathLocation: string;
//   district: string;
//   cityName: string;
//   provinceName: string;
//   countryName: string;
// }

// export default function Page() {
//   const router = useRouter();
//   const [hotelId, setHotelId] = useState<string>("");
//   const [basicInfoHotel, setBasicInfoHotel] = useState<BasicInfo>({
//     name: "",
//     roomType: "",
//     rating: 0,
//     description: "",
//   });
//   const [locationHotel, setLocationHotel] = useState<LocationInfo>({
//     address: "",
//     pathLocation: "",
//     district: "",
//     cityName: "",
//     provinceName: "",
//     countryName: "",
//   });

//   const finish = async () => {
//     try {
//       // Validasi data sebelum submit
//       if (
//         !basicInfoHotel.name ||
//         !basicInfoHotel.roomType ||
//         !basicInfoHotel.rating ||
//         !basicInfoHotel.description
//         // !locationHotel.cityName ||
//         // !locationHotel.provinceName
//       ) {
//         console.log("Data tidak lengkap!");
//         return;
//       }

//       const finalData = {
//         name: basicInfoHotel.name,
//         roomType: basicInfoHotel.roomType,
//         rating: basicInfoHotel.rating,
//         description: basicInfoHotel.description,
//         cityName: locationHotel.cityName,
//         provinceName: locationHotel.provinceName,
//         countryName: locationHotel.countryName,
//         address: locationHotel.address,
//         pathLocation: locationHotel.pathLocation,
//       };

//       console.log("Final data:", finalData);

//       const res = await hotelRepository.api.create(finalData);
//       const idHotel = res.body.data?.id;

//       if (idHotel) {
//         localStorage.setItem("_hotel", idHotel);
//         setHotelId(idHotel);
//         router.push("/admin/hotels/create/result");
//       }
//     } catch (error) {
//       console.error("Error while creating hotel:", error);
//     }
//   };

//   console.log("basic", basicInfoHotel);
//   return (
//     <>
//       <div
//         className={`${mediumMontserrat.className} flex gap-2 items-center text-sm text-black`}
//       >
//         <Link href={"/admin/hotels"} className="no-underline text-black">
//           Hotel
//         </Link>
//         <span>/</span>
//         <Link href={"/admin/hotels/create"} className="no-underline text-black">
//           Create
//         </Link>
//       </div>
//       <div className="flex flex-col gap-2 pt-4">
//         <BasicInfoHotel
//           setBasicInfoHotel={setBasicInfoHotel}
//           submitBasicInfoForm={true} // Tidak langsung submit
//         />
//         <LocationInfoHotel setLocationHotel={setLocationHotel} />
//         <PhotoHotel hotelId={hotelId} submitPhotoForm={true} />
//         <PoliciesHotel />
//       </div>
//       <div className="flex justify-end mt-5">
//         <Button
//           onClick={finish}
//           className="bg-RoyalAmethyst-700 text-center w-32 py-1 no-underline text-white text-sm rounded-xl cursor-pointer"
//         >
//           Done
//         </Button>
//       </div>
//     </>
//   );
// }
