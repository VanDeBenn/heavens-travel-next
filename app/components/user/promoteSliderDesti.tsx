"use client";
import React from "react";
import { Carousel } from "antd";
import Image from "next/image";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";

const PromoteSliderDesti: React.FC = () => {
  return (
    <div className="w-full">
      <Carousel autoplay>
        <div className="w-full h-[400px] relative rounded-xl">
          <Image
            src="/images/illustration/promote.png"
            alt="Promote Image 1"
            layout="fill" // Makes the image cover the entire container
            objectFit="cover" // Ensures the image covers the container while maintaining aspect ratio
            className="object-cover rounded-xl"
          />
        </div>

        <div className="w-full h-[400px] relative rounded-xl">
          <Image
            src="/images/illustration/promote.png"
            alt="Promote Image 2"
            layout="fill"
            objectFit="cover"
            className="object-cover rounded-xl"
          />
        </div>

        <div className="w-full h-[400px] relative rounded-xl">
          <Image
            src="/images/illustration/promote.png"
            alt="Promote Image 3"
            layout="fill"
            objectFit="cover"
            className="object-cover rounded-xl"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default PromoteSliderDesti;
