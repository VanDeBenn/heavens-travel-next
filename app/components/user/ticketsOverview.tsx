"use client";
import { Button, DatePicker } from "antd";
import { Montserrat } from "next/font/google";
import { Dayjs } from "dayjs";
import React, { useState } from "react";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
import dayjs from "dayjs";

export default function TicketsOverview() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()); // Default hari ini
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const daysOfWeek = Array(7)
    .fill(0)
    .map((_, i) => selectedDate.startOf("week").add(i, "day"));

  const handleDatePickerChange = (date: Dayjs | null) => {
    if (date) {
      setSelectedDate(date.startOf("week"));
      setActiveIndex(0);
    }
  };

  const handleTicket = (value: number) => {
    if (value >= 0) {
      setNumberOfTicket(value);
    }
  };

  const [numberOfTicket, setNumberOfTicket] = useState(0);

  const handleChange = (value: number) => {
    if (value >= 0) {
      setNumberOfDesti(value);
    }
  };

  const [numberOfDesti, setNumberOfDesti] = useState(0);
  return (
    <div className={`${mediumMontserrat.className} flex flex-col gap-3`}>
      {/* Calendar */}
      <div className="p-6 border-solid border-gray-200 border rounded-xl bg-white">
        <span className="font-semibold text-lg text-black">
          Available Ticket(s) for You
        </span>
        <div className="flex items-center justify-between gap-5 pt-3">
          {/* DatePicker Week cuk */}
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
              onClick={() => setActiveIndex(index)}
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
      <div className=" p-6 border-solid border-gray-200 border rounded-xl bg-white">
        <span className="font-semibold text-lg text-black">Ticket Qty</span>
        <div className="mt-4 border-solid border-gray-300 border rounded-xl p-5 flex justify-between">
          <div className="text-base text-black">
            <span className="text-lg font-semibold">Adult</span> (12 years old
            and over)
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-lg font-semibold text-InfernoEcho-600">
              Rp2.000.000
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
              Rp200.000
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
            <div className="px-6 py-2 cursor-pointer border border-solid border-RoyalAmethyst-700 text-RoyalAmethyst-700 text-base rounded-xl">
              Add Cart
            </div>
            <div className="px-6 py-2 cursor-pointer border bg-RoyalAmethyst-700 text-white text-base rounded-xl">
              Book now
            </div>
          </div>
        </div>
      </div>
      {/* End Ticket */}
    </div>
  );
}
