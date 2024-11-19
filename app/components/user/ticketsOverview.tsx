"use client";
import { Button } from "antd";
import { Montserrat } from "next/font/google";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCalendar2Line,
  RiShareFill,
} from "react-icons/ri";
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
import React, { useState } from "react";
export default function TicketsOverview() {
  const handleTicket = (value: number) => {
    // Mengizinkan nilai minimum 0
    if (value >= 0) {
      setNumberOfTicket(value);
    }
  };

  const [numberOfTicket, setNumberOfTicket] = useState(0);

  const handleChange = (value: number) => {
    // Mengizinkan nilai minimum 0
    if (value >= 0) {
      setNumberOfDesti(value);
    }
  };

  const [numberOfDesti, setNumberOfDesti] = useState(0);

  return (
    <div className={`${mediumMontserrat.className} flex flex-col gap-3`}>
      <div className=" p-6 border-solid border-gray-200 border rounded-xl bg-white">
        <span className="font-semibold text-lg text-black">
          Available Ticket(s) for You
        </span>
        <div className="flex items-center justify-between gap-5 pt-3">
          <div className="flex items-center gap-2 border-solid border-gray-300 border rounded-xl p-4">
            <RiCalendar2Line className="text-2xl" />
            <span className="text-base font-semibold">See Calender</span>
          </div>

          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3 text-RoyalAmethyst-700">
            <span className="text-sm font-semibold">Today</span>
            <span className="text-sm font-semibold">19 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Tue</span>
            <span className="text-sm font-semibold">20 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Wed</span>
            <span className="text-sm font-semibold">21 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Thu</span>
            <span className="text-sm font-semibold">22 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Fri</span>
            <span className="text-sm font-semibold">23 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Sat</span>
            <span className="text-sm font-semibold">24 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Sun</span>
            <span className="text-sm font-semibold">24 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Mon</span>
            <span className="text-sm font-semibold">25 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Tu</span>
            <span className="text-sm font-semibold">26 Aug</span>
          </div>
          <div className="flex flex-col items-center border-solid border-gray-300 border rounded-xl p-3">
            <span className="text-sm font-semibold">Wed</span>
            <span className="text-sm font-semibold">27 Aug</span>
          </div>

          <div className="h-10 w-10 border-black/60 border-solid border rounded-full cursor-pointer flex items-center justify-center">
            <RiArrowRightLine className="text-black text-lg" />
          </div>
        </div>
      </div>
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
    </div>
  );
}
