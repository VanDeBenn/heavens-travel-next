"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { RiMoonClearFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Montserrat } from "next/font/google";

export const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});
export const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: "500",
});
export const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function HeaderComponent() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", href: "/home" },
    { label: "Hotel", href: "/hotel" },
    { label: "Destination", href: "/destination" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div className="bg-white border-solid border-gray-200 border fixed top-0 left-0 w-full z-50 px-16">
      <div className="flex items-center justify-between container mx-auto py-3">
        {/* Logo or App Name */}
        <Link href={"/"} className="w-32">
          <Image
            src="/images/icon/icon-lanscape-black.png"
            alt="logo"
            width={100}
            height={80}
            className="w-full h-9"
          />
        </Link>

        {/* Menu Items */}
        <div
          className={`${mediumMontserrat.className} flex space-x-6 items-center`}
        >
          {menuItems.map((item) => (
            <div key={item.href} className="">
              <Link
                href={item.href}
                className={`text-black font-semibold transition-all hover:text-RoyalAmethyst-700 no-underline `}
              >
                {item.label}
              </Link>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Link href={"/cart"} className="no-underline">
              <FaCartShopping className="text-xl text-black " />
            </Link>

            <Link href={"/profile"} className="no-underline">
              <FaUserCircle className="text-3xl text-black " />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
