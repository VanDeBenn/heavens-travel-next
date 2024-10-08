"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

export default function DescriptionHotel() {
  return (
    <div className="flex justify-between gap-4">
      <div className="bg-white rounded-xl border-solid border-gray-200 border w-2/3">
        <div className={`${mediumMontserrat.className} p-6`}>
          <div>
            <div className="pb-4">
              <span className="text-base font-semibold">Description</span>
            </div>
            <div className="border border-gray-300 border-dashed h-0"></div>
            <div className="pt-6 text-sm">
              {hotelDescriptions.map((description, index) => (
                <p key={index}>{description}</p>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-solid border-gray-200 border w-1/3 h-2/3">
        <div className={`${mediumMontserrat.className} p-6 h-full`}>
          <div className="w-full h-full">
            {hotelImages.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                height={image.height}
                width={image.width}
                className="w-full h-full rounded-xl" // Added margin-bottom for spacing
              />
            ))}
          </div>
        </div>
      </div>
    </div>
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
const hotelDescriptions = [
  "Wahid Borobudur is a 5-star hotel that offers exceptional service and amenities. Guests can enjoy an outdoor swimming pool, complimentary internet access, and free parking. The hotel has on-site eateries serving delicious meals, and a restaurant is also available. Recreational amenities include a pool and other activities. Wahid Borobudur is not just a place to stay but a destination in itself.",
  "The hotel’s architecture and design seamlessly blend modern luxury with traditional Indonesian elements, creating a unique ambiance that reflects the rich cultural heritage of the region. Whether you are traveling for business or leisure, the hotel offers a range of services and facilities to cater to all your needs. The attentive staff is always on hand to ensure that every guest’s stay is comfortable and memorable.",
  "In addition to its exquisite dining options, Wahid Borobudur provides a variety of recreational activities to keep guests entertained. The well-maintained swimming pool is perfect for a refreshing dip, while the surrounding lounging area offers a great place to relax and soak up the sun. For those looking to stay active, the hotel offers fitness facilities and other leisure activities. The hotel’s strategic location also makes it an excellent base for exploring the nearby attractions, including the famous Borobudur Temple.",
];

const hotelImages = [
  {
    src: "/images/illustration/property-map-entry.png",
    alt: "Property Map Entry",
    height: 200,
    width: 300,
  },
];
