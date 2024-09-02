"use client";
import React from "react";
import { CalendarOutlined, ShareAltOutlined } from "@ant-design/icons";
import PopularNews from "../../components/user/popularNews";
import Image from "next/image";

export default function BlogDetail() {
  return (
    <div>
      <div className="flex gap-3">
        <a href="/" className="no-underline text-black">
          home
        </a>
        /
        <a href="/blog" className="no-underline text-black">
          blog
        </a>
        /
        <a href="/blog/list" className="no-underline text-black">
          list
        </a>
        /
        <a href="" className="no-underline text-black">
          Hawaii
        </a>
      </div>

      <div className="my-5 h-px bg-gray-300"></div>
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Blog Detail Section */}
        <div className="flex-1 lg:w-4/5 p-4 bg-white rounded-xl">
          {Detail.slice(0, 1).map((Details, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-2xl font-bold mb-4">{Details.title}</span>
              <div className="relative w-full mb-4">
                <Image
                  alt="News Image"
                  src={Details.imageSrc}
                  className="w-full rounded-xl"
                  width={1280}
                  height={500}
                />
                <div className="absolute top-4 left-4 bg-black bg-opacity-60 p-2 rounded-full">
                  <ShareAltOutlined className="text-white" />
                </div>
              </div>
              <div className="text-gray-700 my-4">
                {Details.description.map((paragraph, i) => (
                  <p key={i} className="mb-4 font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex items-center text-gray-500">
                <CalendarOutlined size={26} className="mr-2" />
                <span>{Details.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Popular News Section */}
        <div className="lg:w-1/5 bg-white rounded-xl p-3 ">
          <PopularNews />
        </div>
      </div>
    </div>
  );
}

const Detail = [
  {
    title: "Discover the Hidden Waterfalls of Hawaii",
    date: "August 25, 2024",
    imageSrc: "/images/illustration/hawaii-beach.jpg",
    description: [
      "Nusa Penida is a stunning island located southeast of Bali, Indonesia, renowned for its breathtaking natural beauty and dramatic landscapes. This relatively untouched gem is part of the Nusa Islands, which also include Nusa Lembongan and Nusa Ceningan. Nusa Penida stands out for its rugged cliffs, crystal-clear turquoise waters, and picturesque beaches, making it a sought-after destination for travelers looking to escape the more crowded areas of Bali.",
      "The island’s pristine environment offers a unique escape from the usual tourist spots, with its serene landscapes and vibrant natural surroundings. Its rugged terrain and natural features create an ideal setting for those who love outdoor adventures and wish to experience the raw beauty of Bali's lesser-known locales.",
      "One of the island's most iconic attractions is Keling King Beach, often referred to as 'T-Rex Bay' due to its unique rock formation that resembles a dinosaur's head. The cliffside viewpoint offers panoramic views of the pristine coastline and azure ocean, creating a perfect backdrop for memorable photographs. Visitors can also descend the steep staircase to reach the secluded beach below, where the dramatic scenery continues to captivate.",
      "Another must-visit site on Nusa Penida is Angel's Billabong, known for its natural infinity pool that forms between the rocky cliffs and the ocean. The clear, calm waters of the pool provide a serene spot for swimming and relaxing, surrounded by the rugged beauty of the coastline. The pool’s tranquil environment contrasts beautifully with the surrounding rugged cliffs.",
      "Adjacent to Angel's Billabong is Broken Beach, where a large archway has formed through the cliffs, creating a unique and photogenic landscape with waves crashing through the natural arch. The area around Broken Beach offers breathtaking views and a fantastic opportunity for nature photography.",
      "For those interested in marine life, Nusa Penida offers incredible snorkeling and diving opportunities. The island is home to diverse marine ecosystems, including vibrant coral reefs and an array of fish species. The underwater scenery provides a spectacular experience for those exploring the island's rich marine biodiversity.",
      "Manta Point is particularly famous for its manta ray sightings, where visitors can swim alongside these majestic creatures in their natural habitat. Nusa Penida’s pristine waters and rich marine biodiversity make it a haven for underwater enthusiasts seeking unforgettable experiences. The island’s commitment to preserving its natural environment ensures that visitors continue to enjoy its stunning underwater world.",
    ],
    link: "/blog/detail",
  },
];
