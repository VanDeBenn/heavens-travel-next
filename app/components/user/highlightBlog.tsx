"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Loading from "#/app/loading";

interface dataBlog {
  id: string;
  title: string;
  pathPhoto: string;
  description: string;
}

export default function HighlightBlog({ data }: { data: dataBlog[] }) {
  if (!data) {
    return <Loading />;
  }

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: NodeJS.Timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div
      ref={sliderRef}
      className="keen-slider relative w-full h-80 overflow-hidden shadow-lg"
    >
      {data.map((item:dataBlog) => (
        <div
          key={item.id}
          className="keen-slider__slide relative flex items-center justify-center rounded-lg overflow-hidden"
        >
          <Image
            src={"/images/illustration/hawaii-beach.jpg"}
            alt={item.title}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          
          {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}
          {/* Dark overlay with 30% opacity */}
          <div className="absolute bottom-4 left-4 max-w-[40%] text-white p-4">
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p className="text-lg">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const blogData = [
  {
    id: "1",
    title: "Hawaii Beach",
    pathPhoto: "/images/illustration/hawaii-beach.jpg",
    description: "Experience the beauty of Hawaii Beach with its golden sands and crystal-clear waters. A perfect getaway destination for relaxation and adventure.",
  },
  {
    id: "2",
    title: "Tropical Paradise",
    pathPhoto: "/images/illustration/hawaii-beach.jpg",
    description: "Discover the lush greenery and stunning views of this tropical paradise. Ideal for those seeking both relaxation and thrilling outdoor activities.",
  },
  {
    id: "3",
    title: "Sunset Views",
    pathPhoto: "/images/illustration/hawaii-beach.jpg",
    description: "Enjoy breathtaking sunset views from this picturesque location. A serene escape that offers peace, tranquility, and stunning natural beauty.",
  },
  {
    id: "4",
    title: "Ocean Breeze",
    pathPhoto:  "/images/illustration/hawaii-beach.jpg",
    description: "Feel the gentle ocean breeze and enjoy the calming sounds of the waves. This is the ultimate spot for those who appreciate nature’s tranquility.",
  },
];