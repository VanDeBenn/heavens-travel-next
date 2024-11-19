"use client";
import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function BannerViewDesti() {
  return (
    <div className="relative">
      <Carousel
        dots={false} // Disable default dots
        autoplay
        prevArrow={
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full cursor-pointer">
            <LeftOutlined className="text-white" />
          </div>
        }
        nextArrow={
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 p-2 rounded-full cursor-pointer">
            <RightOutlined className="text-white" />
          </div>
        }
      >
        <div>
          <Image
            src="/images/illustration/ocean-4076551_1920.jpg"
            alt="Luxury Bedroom"
            width={1600} // Set the width of the image
            height={400} // Set the height of the image
            className="object-cover"
          />
        </div>
        <div>
          <Image
            src="/images/illustration/luxury-bedroom.jpg"
            alt="Luxury Bedroom"
            width={1600} // Set the width of the image
            height={400} // Set the height of the image
            className="object-cover"
          />
        </div>
        <div>
          <Image
            src="/images/illustration/ocean-4076551_1920.jpg"
            alt="Luxury Bedroom"
            width={1600} // Set the width of the image
            height={400} // Set the height of the image
            className="object-cover"
          />
        </div>
      </Carousel>
    </div>
  );
}
