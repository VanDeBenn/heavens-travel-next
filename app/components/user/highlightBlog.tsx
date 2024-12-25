"use client";
import React, { useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Loading from "#/app/loading";
import Link from "antd/es/typography/Link";

interface dataBlog {
  id: string;
  title: string;
  pathPhoto: string;
  description: string;
}

// Fungsi untuk mengacak array
const shuffleArray = (array: any[]) => {
  return array
    .map((item) => ({ ...item, sortKey: Math.random() }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ sortKey, ...rest }) => rest);
};

// Fungsi untuk membatasi teks menjadi maksimal 20 kata
const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ");
};

export default function HighlightBlog({ data }: { data: dataBlog[] }) {
  if (!data || data.length === 0) {
    return <Loading />;
  }

  // Mengacak data dan membatasi hingga 4 elemen
  const shuffledData = useMemo(() => shuffleArray(data).slice(0, 4), [data]);

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
      {shuffledData.map((item: dataBlog) => (
        <div
          key={item.id}
          className="keen-slider__slide relative flex items-center justify-center rounded-lg overflow-hidden"
        >
          <Link href={`/blog/list/detail/${item.id}`}>
            <Image
              src={`http://localhost:3222/photo-hotels/${item.pathPhoto}`}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
          </Link>

          {/* Overlay dan teks pada slider */}
          <div className="absolute bottom-4 left-4 max-w-[40%] text-white p-4">
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            <p className="text-lg">{truncateText(item.description, 20)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
