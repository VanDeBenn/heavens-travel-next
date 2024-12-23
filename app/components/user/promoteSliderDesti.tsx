"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import Image from "next/image";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";

const PromoteSliderDesti: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isReady) {
    return (
      <div className="flex justify-center items-center w-full h-[400px] bg-gray-200"></div>
    );
  }

  return (
    <div className="w-full">
      <Carousel autoplay>
        <div className="w-full h-[400px] relative rounded-xl">
          <Image
            src="https://img.freepik.com/free-vector/watercolor-winter-sale-banner-template_23-2149913530.jpg?t=st=1734923411~exp=1734927011~hmac=9911a43d52c66d8829f9e94fd707997989348caa52a77f6fe4854f3f32df6d10&w=1060"
            alt="Promote Image 1"
            layout="fill"
            objectFit="cover"
            className="object-cover rounded-xl"
          />
        </div>

        <div className="w-full h-[400px] relative rounded-xl">
          <Image
            src="https://img.freepik.com/free-vector/watercolor-winter-sale-banner-template_23-2149913515.jpg?t=st=1734923437~exp=1734927037~hmac=de23e7d9d2f879fa434d518e49bd18bd17d5959654b84a3e85ebb76e5551170d&w=1060"
            alt="Promote Image 2"
            layout="fill"
            objectFit="cover"
            className="object-cover rounded-xl"
          />
        </div>

        <div className="w-full h-[400px] relative rounded-xl">
          <Image
            src="https://img.freepik.com/free-vector/watercolor-winter-sale-banner-template_23-2149913512.jpg?t=st=1734923480~exp=1734927080~hmac=0b0fa49edd8341ec71844b04f6f38bf8343211d3fb3d49a0f5ce1c7561939368&w=1060"
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
