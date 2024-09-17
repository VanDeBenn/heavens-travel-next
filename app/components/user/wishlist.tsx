"use client";
import React, { useState } from "react";
import {
  RiGlassesLine,
  RiHome3Line,
  RiBookmarkFill,
  RiMapPinLine,
} from "react-icons/ri";
import { Rate, Modal, Button } from "antd";
import Image from "next/image";
import Link from "next/link";

// Interface untuk item Wishlist
interface WishlistItem {
  category: "Hotel" | "Destination";
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  link: string;
}

// Data array wishlist
const initialWishlistItems: WishlistItem[] = [
  {
    category: "Hotel",
    name: "Atlasong Hotel",
    location: "Bali",
    description:
      "Luxury stay with stunning ocean views, offering top-notch service and unforgettable.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
  },
  {
    category: "Destination",
    name: "Ubud Palace",
    location: "Ubud, Bali",
    description:
      "Explore Ubud Palace, a historical and cultural landmark showcasing Bali’s traditional architecture and rich heritage.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 4,
    link: "/",
  },
  {
    category: "Hotel",
    name: "Mandarin Oriental",
    location: "Jakarta",
    description:
      "Modern luxury and comfort with excellent service at Mandarin Oriental Jakarta.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 3,
    link: "/",
  },
  {
    category: "Destination",
    name: "Mount Bromo",
    location: "East Java",
    description:
      "A must-see natural wonder, Mount Bromo offers unforgettable views.",
    image: "/images/illustration/rainbow-appearing-sky.jpg",
    rating: 5,
    link: "/",
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] =
    useState<WishlistItem[]>(initialWishlistItems);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);

  const showConfirmModal = (index: number) => {
    setCurrentItemIndex(index);
    setModalVisible(true);
  };

  const handleRemove = () => {
    if (currentItemIndex !== null) {
      setWishlistItems((prevItems) =>
        prevItems.filter((_, index) => index !== currentItemIndex)
      );
      setModalVisible(false);
    }
  };

  return (
    <div className="bg-white rounded-xl">
      {/* title */}
      <p className="text-xl font-semibold my-6 mx-9">Wishlist</p>
      <div className="h-px bg-gray-300"></div>

      {/* grid */}
      <div className="px-8 py-6 grid grid-cols-2 gap-6">
        {wishlistItems.map((item, index) => (
          <div
            key={index}
            className="p-3 border border-solid border-[#DBDBDB] rounded-xl"
          >
            <div className="flex justify-between items-center">
              {/* title and icon */}
              <div className="border bg-[#4F28D9] border-solid border-[#DBDBDB] rounded-xl py-1 px-3 w-max flex items-center gap-1">
                {item.category === "Hotel" ? (
                  <RiHome3Line size={18} color="#ffff" />
                ) : (
                  <RiGlassesLine size={18} color="#ffff" />
                )}
                <span className="text-xs font-semibold text-white">
                  {item.category}
                </span>
              </div>
              {/* end title and icon */}
              <div>
                <RiBookmarkFill
                  size={25}
                  color="#4F28D9"
                  onClick={() => showConfirmModal(index)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Link href={item.link}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-xl w-44"
                />
              </Link>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                  <Link
                    href={item.link}
                    className="font-semibold no-underline text-black hover:text-[#4F28D9] duration-300 transition-all"
                  >
                    {item.name}
                  </Link>
                  <Rate
                    disabled
                    value={item.rating}
                    allowHalf={false}
                    style={{ fontSize: 16, color: "#F59E0B" }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <RiMapPinLine size={16} color="#6b7280 " />
                  <span className="text-xs text-gray-500">{item.location}</span>
                </div>

                <span className="text-sm text-gray-500">
                  {item.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* end grid */}

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Remove"
        visible={modalVisible}
        closable={false}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="remove"
            type="primary"
            danger
            onClick={handleRemove}
            style={{ backgroundColor: "#4F28D9", borderColor: "#4F28D9" }}
          >
            Remove
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to remove this destination/hotel from your
          wishlist?
        </p>
      </Modal>
    </div>
  );
}
