"use client";
import React, { useEffect, useState } from "react";
import {
  RiCalendarLine,
  RiTeamLine,
  RiHome3Line,
  RiGlassesLine,
  RiDeleteBin6Line,
  RiCheckboxFill,
  RiCheckboxBlankLine,
} from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { Button, Modal } from "antd";
import { usersRepository } from "#/repository/users";
import { cartRepository } from "#/repository/carts";
import { bookingRepository } from "#/repository/bookings";
import { bookingDetailRepository } from "#/repository/bookingDetail";
import { useRouter } from "next/navigation";
import NextStep from "./next-step";

const formatCurrency = (amount: number) =>
  `Rp${amount.toLocaleString("id-ID").replace(",", ".")}`;

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function MyCart() {
  const router = useRouter();
  const [dataCart, setDataCart] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);
  const [selectedItemsId, setSelectedItemsId] = useState<string[]>([]);
  const [bookingDetailId, setBookingDetailId] = useState<string[]>([]);

  const fetchCart = async () => {
    const id: any = localStorage.getItem("_id");
    try {
      const res = await usersRepository.api.getUser(id);
      const dataCart = res.body.data.carts.filter(
        (cart: any) => !cart.bookingDetail || !cart.bookingDetail.booking
      );
      setDataCart(dataCart);

      setSelectedItems(new Array(res.body.data.carts.length).fill(false));
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalPrice = () => {
    return dataCart.reduce((total, item, index) => {
      if (selectedItems[index]) {
        const priceForAdults = item.quantityAdult * item.destination.priceAdult;
        const priceForChildren =
          item.quantityChildren * item.destination.priceChildren;
        total += priceForAdults + priceForChildren;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // if (!dataCart.length) {
  //   return <div>Loading...</div>;
  // }

  const hanndleDelete = async (id: string) => {
    try {
      await cartRepository.api.deleteCart(id);
      const updatedCart = dataCart.filter((item) => item.id !== id);
      setDataCart(updatedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckboxChange = (index: number, id: string) => {
    const updatedSelectedItems = [...selectedItems];
    const updatedSelectedItemsId = [...selectedItemsId];

    updatedSelectedItems[index] = !updatedSelectedItems[index];

    if (updatedSelectedItems[index]) {
      updatedSelectedItemsId.push(id);
    } else {
      const idIndex = updatedSelectedItemsId.indexOf(id);
      if (idIndex > -1) {
        updatedSelectedItemsId.splice(idIndex, 1);
      }
    }

    setSelectedItems(updatedSelectedItems);
    setSelectedItemsId(updatedSelectedItemsId);
  };

  const handleAddBooking = async () => {
    try {
      if (!localStorage.getItem("_booking")) {
        const data = {
          userId: localStorage.getItem("_id"),
        };
        const req = await bookingRepository.api.create(data);
        // console.log("booking id:", req);
        const bookingId = req.body.data.id;
        localStorage.setItem("_booking", bookingId);
      }
      const bookingId = localStorage.getItem("_booking");
      handleSelectedCarts(bookingId);
      // handleCreateBookingDetail(bookingId)
    } catch (error) {}
  };

  const handleCreateBookingDetail = async (bookingId: string) => {
    try {
      for (const cartId of selectedItemsId) {
        const data = {
          cartId: cartId,
          bookingId: bookingId,
        };

        const req = await bookingDetailRepository.api.create(data);
        const id = req.body.data.id;
      }

      // {
      //   "bookingId": "be1c08c2-e778-4f24-854d-f701e261e0e5",
      //     "selectedCartIds": ["6bf4eda8-a8da-4c11-af75-3c501b305739"]
      // }
    } catch (error) {
      console.error("Error creating booking details:", error);
    }
  };

  const handleSelectedCarts = async (bookingId: any) => {
    try {
      const data = {
        bookingId: bookingId,
        selectedCartIds: selectedItemsId,
      };
      const req = await bookingDetailRepository.api.createBookingDetail(
        bookingId,
        data
      );
    } catch (error) {}
  };

  // bookingDetailId.push(id);
  // const bookingDetailId = [];
  // setBookingDetailId(bookingDetailId);
  // localStorage.setItem('_details', bookingDetailId)

  return (
    <div className="w-full">
      <div className="flex gap-5">
        <div className="bg-white w-full rounded-xl">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">My Cart</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className="grid grid-cols-1 px-8 py-6 gap-6 w-full">
            {dataCart.map(
              (
                {
                  roomhotel,
                  destination,
                  id,
                  startDate,
                  endDate,
                  quantityAdult,
                  quantityChildren,
                }: any,
                index: number
              ) => {
                const isSelected = selectedItems[index];
                const totalPrice =
                  quantityAdult * destination.priceAdult +
                  quantityChildren * destination.priceChildren;

                return (
                  <div
                    key={id}
                    className="p-3 border border-solid border-[#DBDBDB] rounded-xl w-full"
                  >
                    <div className="flex justify-between items-center">
                      <div className="border bg-RoyalAmethyst-700 border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                        {roomhotel ? (
                          <RiHome3Line size={18} color="#ffff" />
                        ) : (
                          <RiGlassesLine size={18} color="#ffff" />
                        )}
                        <span className="text-xs font-semibold text-white">
                          {roomhotel ? "Hotel" : "Destination"}
                        </span>
                      </div>

                      <RiDeleteBin6Line
                        size={24}
                        color="#DC143C"
                        className="cursor-pointer"
                        onClick={() => hanndleDelete(id)}
                      />
                    </div>

                    <div className="flex items-center gap-2 py-3">
                      <Image
                        src={
                          "https://imgs.search.brave.com/hoIxdncmtwEaAIJzTZljZdl4LAfd52BAD3Bo_qMxTjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pay5p/bWFnZWtpdC5pby90/dmxrL2Jsb2cvMjAy/MS8wMi9IdXRhbi1C/YW1idS1QZW5nbGlw/dXJhbi1zaHV0dGVy/c3RvY2tfMTAxMzEz/MTAwNi5qcGc_dHI9/ZHByLTEuNSxoLTQ4/MCxxLTQwLHctMTAy/NA"
                        }
                        alt={destination.name || roomhotel.name}
                        width={100}
                        height={100}
                        className="rounded-xl w-44"
                      />

                      <div className="flex flex-col gap-1 w-full">
                        <div className="font-semibold">
                          {destination.name || roomhotel.name}
                        </div>

                        <div className="flex items-center gap-1">
                          <RiCalendarLine className="text-lg text-black" />
                          <span className="text-xs text-gray-400">
                            {startDate} - {endDate}
                          </span>
                        </div>

                        <div className="flex gap-1">
                          <RiTeamLine size={16} color="#6b7280" />
                          <span className="text-xs text-gray-500">
                            Guests: {quantityAdult} Adult, {quantityChildren}
                            Children
                          </span>
                        </div>

                        <div className="flex justify-between w-full">
                          <div
                            className="flex gap-1 cursor-pointer"
                            onClick={() => handleCheckboxChange(index, id)}
                          >
                            {isSelected ? (
                              <RiCheckboxFill className="text-RoyalAmethyst-700 text-lg" />
                            ) : (
                              <RiCheckboxBlankLine className="text-gray-400 text-lg" />
                            )}
                            <span
                              className={`text-sm font-semibold ${
                                isSelected
                                  ? "text-RoyalAmethyst-700"
                                  : "text-gray-400"
                              }`}
                            >
                              {destination.name || roomhotel.name}
                            </span>
                          </div>

                          <div className="flex items-end gap-1">
                            {quantityAdult} x Rp
                            {destination.priceAdult ||
                              roomhotel.priceAdult} - {quantityChildren} x Rp
                            {destination.priceChildren ||
                              roomhotel.priceChildren}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-gray-300"></div>

                    <div className="pt-5 pb-3 flex justify-end w-full gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-xs">
                          Total Price
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            isSelected ? "text-[#DC143C]" : "text-gray-400"
                          }`}
                        >
                          {formatCurrency(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="w-1/3 bg-white rounded-xl h-full sticky top-4">
          <div className={`${mediumMontserrat.className} py-6 px-9`}>
            <span className="text-lg font-semibold">Price Details</span>
          </div>
          <div className="h-px bg-gray-300"></div>

          <div className="flex justify-between items-center py-6 px-9">
            <span className="text-gray-500">Total</span>
            <span className="font-semibold text-lg text-gray-900">
              {formatCurrency(getTotalPrice())}
            </span>
          </div>

          <Button
            onClick={() => {
              // handleCreateBookingDetail();
              handleAddBooking();

              if (selectedItemsId.length > 0) {
                setTimeout(() => {
                  router.push("/booking");
                }, 3000);
              }
            }}
          >
            <div className="bg-RoyalAmethyst-700 text-center text-white text-sm rounded-xl cursor-pointer py-3 px-9 mx-9 mb-3">
              <span>Booking Now</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
