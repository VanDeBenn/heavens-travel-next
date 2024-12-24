"use client";
import { Button, DatePicker, message } from "antd";
import { Montserrat } from "next/font/google";
import { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { bookingRepository } from "#/repository/bookings";
import { cartRepository } from "#/repository/carts";
import { useRouter } from "next/navigation";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface dataDestination {
  data: any;
}

export default function TicketsOverview({ data }: dataDestination) {
  if (!data) {
    return null;
  }

  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [numberOfTicket, setNumberOfTicket] = useState(0);
  const [numberOfDesti, setNumberOfDesti] = useState(0);
  const [bookingId, setBookingId] = useState<any>();
  const [dataBooking, setDataBooking] = useState<any>();

  const daysOfWeek = Array(7)
    .fill(0)
    .map((_, i) => selectedDate.startOf("week").add(i, "day"));

  const handleDatePickerChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date.startOf("week"));
      setActiveIndex(0);
      setStartDate(date);
      setEndDate(date);
    }
  };

  const handleTicket = (value: number) => {
    if (value >= 0) {
      setNumberOfTicket(value);
    }
  };

  const handleChange = (value: number) => {
    if (value >= 0) {
      setNumberOfDesti(value);
    }
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("_id");

    if (!userId) {
      message.info("Please login to continue.");
      return;
    }

    if (!startDate || !endDate) {
      message.info("Please select a start and end date.");
      return;
    }

    const dataToCart = {
      userId,
      quantityAdult: numberOfTicket,
      quantityChildren: numberOfDesti,
      startDate: startDate.toISOString(),
      endDate: startDate.toISOString(),
      destinationId: data?.id,
    };

    try {
      if (dataToCart.quantityAdult === 0 && dataToCart.quantityChildren === 0) {
        message.warning(
          "Please select at least one ticket (adult or children)."
        );
        return;
      }
      const req = await cartRepository.api.addToCart(dataToCart);
      if (req) {
        message.success("Added to cart!");
        router.push("/cart");
      }
    } catch (error) {
      message.error("Failed to add to cart");
    }
  };

  const handleBookNow = async () => {
    const userId = localStorage.getItem("_id");

    if (!userId) {
      message.info("Please login to continue.");
      return;
    }

    if (!startDate || !endDate) {
      message.info("Please select a start and end date.");
      return;
    }

    const dataBookNow = {
      userId,
      quantityAdult: numberOfTicket,
      quantityChildren: numberOfDesti,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      destinationId: data?.id,
    };

    try {
      if (
        dataBookNow.quantityAdult === 0 &&
        dataBookNow.quantityChildren === 0
      ) {
        message.warning(
          "Please select at least one ticket (adult or children)."
        );
        return;
      }

      const req = await bookingRepository.api.create(dataBookNow);
      setDataBooking(req.body.data);
    } catch (error) {
      message.error("Failed to book now. Please try again later.");
    }
  };

  useEffect(() => {
    if (dataBooking) {
      setBookingId(dataBooking.id);
      localStorage.setItem("_booking", dataBooking.id);
      message.success("Booking Successful!");
      router.push("/booking");
    }
  }, [dataBooking]);

  return (
    <div className={`${mediumMontserrat.className} flex flex-col gap-3`}>
      {/* Calendar */}
      <div className="p-6 border-solid border-gray-200 border rounded-xl bg-white">
        <span className="font-semibold text-lg text-black">
          Available Ticket(s) for You
        </span>
        <div className="flex items-center justify-between gap-5 pt-3">
          {/* DatePicker Week */}
          <DatePicker
            className="border border-gray-300 rounded-xl p-2 text-base font-semibold"
            picker="week"
            value={selectedDate}
            onChange={handleDatePickerChange}
          />

          {/* Days of the week */}
          {daysOfWeek.map((date, index) => (
            <div
              key={index}
              className={`flex gap-1 items-center border-solid border-gray-300 border rounded-xl p-3 cursor-pointer ${
                activeIndex === index
                  ? "text-RoyalAmethyst-700 border-RoyalAmethyst-700"
                  : ""
              }`}
              onClick={() => {
                setActiveIndex(index);
                setStartDate(date);
                setEndDate(date);
              }}
            >
              <span className="text-sm font-semibold">
                {date.format("ddd")},
              </span>
              <span className="text-sm font-semibold">
                {date.format("DD MMM")}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* End Calendar */}

      {/* Ticket */}
      <div className="p-6 border-solid border-gray-200 border rounded-xl bg-white">
        <span className="font-semibold text-lg text-black">Ticket Qty</span>
        <div className="mt-4 border-solid border-gray-300 border rounded-xl p-5 flex justify-between">
          <div className="text-base text-black">
            <span className="text-lg font-semibold">Adult</span> (12 years old
            and over)
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-lg font-semibold text-InfernoEcho-600">
              Rp{data.priceAdult.toLocaleString("id-ID").replace(",", ".")}
            </span>

            {/* Input Ticket */}
            <div className="w-full">
              <div className="flex items-center justify-between border-solid border-gray-200 border rounded-xl">
                <Button
                  onClick={() => handleTicket(numberOfTicket - 1)}
                  disabled={numberOfTicket === 0}
                >
                  -
                </Button>
                <span className="mx-3">{numberOfTicket}</span>
                <Button onClick={() => handleTicket(numberOfTicket + 1)}>
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 border-solid border-gray-300 border rounded-xl p-5 flex justify-between">
          <div className="text-base text-black">
            <span className="text-lg font-semibold">Children</span> (3 - 12
            years old)
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-lg font-semibold text-InfernoEcho-600">
              Rp{data.priceChildren.toLocaleString("id-ID").replace(",", ".")}
            </span>

            {/* Input Children */}
            <div className="w-full">
              <div className="flex items-center justify-between border-solid border-gray-200 border rounded-xl">
                <Button
                  onClick={() => handleChange(numberOfDesti - 1)}
                  disabled={numberOfDesti === 0}
                >
                  -
                </Button>
                <span className="mx-3">{numberOfDesti}</span>
                <Button onClick={() => handleChange(numberOfDesti + 1)}>
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 justify-end flex">
          <div className="flex gap-4 items-center">
            <div
              onClick={handleAddToCart}
              className="px-6 py-2 cursor-pointer border border-solid border-RoyalAmethyst-700 text-RoyalAmethyst-700 text-base rounded-xl"
            >
              Add to Cart
            </div>
            <div
              onClick={handleBookNow}
              className="px-6 py-2 cursor-pointer border bg-RoyalAmethyst-700 text-white text-base rounded-xl"
            >
              Book Now
            </div>
          </div>
        </div>
      </div>
      {/* End Ticket */}
    </div>
  );
}
