"use client";

import { Montserrat } from "next/font/google";

import React from "react";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function SimpleInfo() {
  return (
    <div className={`${mediumMontserrat.className} flex flex-col gap-3`}>
      <span className="text-black font-semibold text-lg">
        Hotels on HTrip.com
      </span>

      <div className="flex flex-col gap-5 p-5 bg-white rounded-xl border-solid border-gray-200 border">
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold">
            Hotels to Suit Everyone
          </span>
          <span className="text-sm">
            offers a wide range of accommodation options designed to meet the
            needs of every guest. From luxurious hotels with full amenities for
            an unforgettable stay, to cozy inns at affordable prices for those
            looking to be adventurous without sacrificing comfort. Whatever your
            style and preference-family vacation, business trip, or romantic
            getaway-here you will find the perfect place to rest your head.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-base font-semibold">Best Price Guaranteed</span>
          <span className="text-sm">
            Guarantees that you&apos;ll get the best prices on flights, hotels,
            and vacation packages. No need to compare prices across multiple
            sites—it&apos;s all done for you. Every transaction comes with a
            best price guarantee, giving you peace of mind that you&apos;re
            getting the most value for your money. Whether you&apos;re booking a
            last-minute getaway or planning the trip of a lifetime, this promise
            ensures you won&apos;t find a better deal anywhere else. Imagine
            effortlessly securing the perfect hotel room, the ideal flight, or a
            comprehensive vacation package, all while knowing you&apos;re paying
            the lowest possible price. Plus, with the confidence of a best price
            guarantee, you can rest easy knowing that if a better deal does
            exist, you&apos;ll be covered. From luxurious resorts to
            budget-friendly accommodations, and from direct flights to the most
            convenient connections, everything is tailored to your preferences
            and budget, making your travel planning not only stress-free but
            also incredibly rewarding. It&apos;s not just about saving
            money—it&apos;s about enhancing your entire travel experience with
            unbeatable value, convenience, and satisfaction.
          </span>
        </div>
      </div>
    </div>
  );
}
