"use client";
import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { RiStarFill, RiStarLine } from "react-icons/ri";

export default function DescriptionDesti() {
  return (
    <div className="flex justify-between gap-4">
      {/* Container Deskripsi */}
      <div className="bg-white rounded-xl border border-gray-200 w-2/3 border-solid">
        <div className={`${mediumMontserrat.className} p-6`}>
          {descriptionDes.map((destination, index) => (
            <div key={index}>
              <div className="pb-4 flex items-center gap-3">
                <span className="text-lg font-semibold">
                  {destination.name}
                </span>
                {/* Render rating dengan bintang */}
                <div className="flex gap-1 ">
                  {Array.from({ length: 5 }, (_, index) =>
                    index < destination.rating ? (
                      <RiStarFill key={index} className="text-[#FFD700]" />
                    ) : (
                      <RiStarLine key={index} className="text-[#FFD700]" />
                    )
                  )}
                </div>
              </div>

              {/* Deskripsi */}
              <div className="text-sm">
                {destination.descriptions.map((description, descIndex) => (
                  <p key={descIndex}>{description}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Container Peta */}
      <div className="bg-white rounded-xl border border-gray-200 border-solid w-1/3 flex-shrink-0 h-auto">
        <div className={`p-6 h-full cursor-pointer`}>
          {descriptionDes[0].images.map((image, imgIndex) => (
            <Image
              key={imgIndex}
              src={image.src}
              alt={image.alt}
              height={400}
              width={300}
              className="w-full h-full object-cover rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

// Data destinasi
const descriptionDes = [
  {
    name: "Angel's Billabong",
    rating: 3, // Ganti angka ini untuk jumlah bintang terisi
    descriptions: [
      "Angel’s Billabong is one of the most iconic destinations in Nusa Penida, Bali. Known as a natural infinity pool formed between rugged cliffs, Angel’s Billabong offers a unique experience combining the pristine blue waters of the ocean with the textured beauty of coral rock formations. The name 'Billabong' refers to a natural pool formed from a disconnected river flow, and this serene spot lives up to its name with crystal-clear waters revealing the rocky bed below. Its magical allure captivates visitors, making it a must-see attraction for nature lovers and adventurers alike.",
      "Located near the famous Broken Beach, Angel’s Billabong is a haven for photographers and those seeking breathtaking views. During low tide, visitors can descend into the pool for a refreshing dip in the calm, salty waters, surrounded by panoramic ocean views and dramatic cliffs. The emerald-green and turquoise hues of the water blend beautifully with moss-covered rocks, creating a tranquil and picturesque atmosphere. However, caution is essential as the tide can rise quickly, and the waves can become dangerously strong, so it’s advisable to follow local guidance and avoid the area during high tide.",
      "More than just a visual delight, Angel’s Billabong offers a serene escape for reflection and connection with nature. The sound of waves crashing against the cliffs and the gentle ocean breeze create a soothing ambiance. It’s an ideal spot for travelers seeking peace and a chance to immerse themselves in the raw beauty of Bali. With improving accessibility, Angel’s Billabong stands as a hidden gem that deserves a place on every Bali itinerary.",
    ],
    images: [
      {
        src: "/images/illustration/property-map-entry.png",
        alt: "Property Map Entry",
        height: 200,
        width: 300,
      },
    ],
  },
];
