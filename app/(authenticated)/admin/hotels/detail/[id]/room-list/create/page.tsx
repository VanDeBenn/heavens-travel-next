"use client";
import CreateInfoRoom from "#/app/components/admin/createInfoRoom";
import FacilityRoom from "#/app/components/admin/facilityRoom";
import PhotoRoomHotel from "#/app/components/admin/photoRoomHotel";
import { mediumMontserrat } from "#/app/components/user/myBooking";
import Loading from "#/app/loading";
import { roomHotelRepository } from "#/repository/roomHotels";
import { Button, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BasicInfo {
  roomType: string;
  price: number;
  adult: number;
  children: number;
  numberRoom: number;
  singleBed: number;
  doubleBed: number;
  queenBed: number;
  kingBed: number;
}

export default function page() {
  const router = useRouter();
  const [submitForms, setSubmitForms] = useState(false);
  const [roomHotelId, setRoomHotelId] = useState<string>("");
  const pathname = usePathname();

  if (!pathname) {
    return <Loading />;
  }

  const pathSegments = pathname.split("/");
  const hotelId = pathSegments[4]; // path to array

  const [basicInfoRoomHotel, setBasicInfoRoomHotel] = useState<BasicInfo>({
    roomType: "",
    price: 0,
    adult: 0,
    children: 0,
    numberRoom: 0,
    singleBed: 0,
    doubleBed: 0,
    queenBed: 0,
    kingBed: 0,
  });

  const finish = async () => {
    try {
      if (!basicInfoRoomHotel.roomType || !basicInfoRoomHotel.price) {
        // console.log("data tidak lengkap!");
        return;
      }

      const finalData = {
        roomType: basicInfoRoomHotel.roomType,
        price: basicInfoRoomHotel.price,
        adult: basicInfoRoomHotel.adult,
        children: basicInfoRoomHotel.children,
        numberRoom: basicInfoRoomHotel.numberRoom,
        singleBed: basicInfoRoomHotel.singleBed,
        doubleBed: basicInfoRoomHotel.doubleBed,
        queenBed: basicInfoRoomHotel.queenBed,
        kingBed: basicInfoRoomHotel.kingBed,
        hotelId: hotelId,
      };
      // console.log(finalData);

      const res = await roomHotelRepository.api.create(finalData);
      const idRoomHotel = res.body.data.id;
      // console.log(res);

      if (idRoomHotel) {
        localStorage.setItem("_roomHotel", idRoomHotel);
        setRoomHotelId(idRoomHotel);
        router.push("/admin/roomHotels/create/result");
      }

      message.success("RoomHotel created successfully!");
    } catch (error) {
      console.error("Error while creating roomHotel:", error);
      message.error("Failed to create roomHotel.");
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
      <div className="">
        <div
          className={`${mediumMontserrat.className} flex items-center gap-2 mb-5`}
        >
          <Link
            href={"/admin/hotels/"}
            className="no-underline text-black text-sm"
          >
            Hotel
          </Link>
          <span>/</span>
          <Link
            href={"/admin/hotels/detail/"}
            className="no-underline text-black text-sm"
          >
            Detail
          </Link>
          <span>/</span>
          <Link
            href={"/admin/hotels/detail/room-list"}
            className="no-underline text-black text-sm"
          >
            Room Listing
          </Link>
          <span>/</span>
          <Link
            href={"/admin/hotels/detail/room-list/room-create"}
            className="no-underline text-black text-sm"
          >
            Create
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <CreateInfoRoom
            setBasicInfoRoomHotel={setBasicInfoRoomHotel}
            submitBasicInfoForm={submitForms}
          />
          <PhotoRoomHotel
            roomHotelId={roomHotelId}
            submitPhotoForm={submitForms}
          />
          <FacilityRoom />
        </div>
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
