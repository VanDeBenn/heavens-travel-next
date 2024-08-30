"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

export default function HighlightBlog() {
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
      <div className="keen-slider__slide relative flex items-center justify-center rounded-lg overflow-hidden">
        <Image
          src="/images/illustration/hawaii-beach.jpg"
          alt="Hawaii Beach"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
        {/* Dark overlay with 30% opacity */}
        <div className="absolute bottom-4 left-4 max-w-[40%] text-white p-4">
          <h2 className="text-2xl font-bold mb-2">Hawaii Beach</h2>
          <p className="text-lg">
            Experience the beauty of Hawaii Beach with its golden sands and
            crystal-clear waters. A perfect getaway destination for relaxation
            and adventure.
          </p>
        </div>
      </div>
      <div className="keen-slider__slide relative flex items-center justify-center rounded-lg overflow-hidden">
        <Image
          src="/images/illustration/hawaii-beach.jpg"
          alt="Hawaii Beach"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
        {/* Dark overlay with 30% opacity */}
        <div className="absolute bottom-4 left-4 max-w-[40%] text-white p-4">
          <h2 className="text-2xl font-bold mb-2">Tropical Paradise</h2>
          <p className="text-lg">
            Discover the lush greenery and stunning views of this tropical
            paradise. Ideal for those seeking both relaxation and thrilling
            outdoor activities.
          </p>
        </div>
      </div>
      <div className="keen-slider__slide relative flex items-center justify-center rounded-lg overflow-hidden">
        <Image
          src="/images/illustration/hawaii-beach.jpg"
          alt="Hawaii Beach"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
        {/* Dark overlay with 30% opacity */}
        <div className="absolute bottom-4 left-4 max-w-[40%] text-white p-4">
          <h2 className="text-2xl font-bold mb-2">Sunset Views</h2>
          <p className="text-lg">
            Enjoy breathtaking sunset views from this picturesque location. A
            serene escape that offers peace, tranquility, and stunning natural
            beauty.
          </p>
        </div>
      </div>
      <div className="keen-slider__slide relative flex items-center justify-center rounded-lg overflow-hidden">
        <Image
          src="/images/illustration/hawaii-beach.jpg"
          alt="Hawaii Beach"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>{" "}
        {/* Dark overlay with 30% opacity */}
        <div className="absolute bottom-4 left-4 max-w-[40%] text-white p-4">
          <h2 className="text-2xl font-bold mb-2">Ocean Breeze</h2>
          <p className="text-lg">
            Feel the gentle ocean breeze and enjoy the calming sounds of the
            waves. This is the ultimate spot for those who appreciate nature’s
            tranquility.
          </p>
        </div>
      </div>
    </div>
  );
}
