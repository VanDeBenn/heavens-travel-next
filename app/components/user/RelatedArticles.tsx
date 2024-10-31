"use client";
import React from "react";
import { cardData } from "./news";
import Image from "next/image";
import { FileTextOutlined } from "@ant-design/icons"; // Ikon dari Ant Design
import Link from "next/link";

export default function RelatedArticles() {
  return (
    <div className="pt-9">
      {/* Header Section */}
      <div className="flex items-center mb-5">
        <FileTextOutlined className="text-2xl mr-2 text-RoyalAmethyst-700" />
        <span className="text-xl font-semibold">
          You might enjoy reading this article.
        </span>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-3 gap-5">
        {cardData.slice(0, 6).map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border-solid border-gray-200 border overflow-hidden"
          >
            <div className="p-3 flex flex-col gap-2">
              <Link href={card.link}>
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  width={300}
                  height={300}
                  className="w-full rounded-xl"
                />
              </Link>

              <Link
                href={card.link}
                className="text-lg font-semibold text-black hover:text-RoyalAmethyst-700 transition-all duration-300 no-underline leading-6"
              >
                {card.title}
              </Link>
              <span className="text-sm text-gray-600">{card.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
