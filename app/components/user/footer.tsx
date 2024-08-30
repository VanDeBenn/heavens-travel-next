import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Footer = () => {
  return (
    <footer className="w-full sticky z-50 bottom-0 lg:relative bg-white px-16 overflow-hidden text-black">
      <div className="pt-16">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Logo and Description Section */}
          <div className="flex flex-col lg:w-1/5 ">
            <div className="flex pb-4">
              {/* <Image
                src="/images/Logo.png"
                alt="logo"
                width={100}
                height={100}
              /> */}
              <h1 className="text-lg md:text-xl uppercase font-semibold text-black">
                Logo
              </h1>
            </div>
            <span className="text-sm sm:text-base text-gray-500 ">
              We are ready to assist you in your travel and hospitality needs.
            </span>
          </div>

          {/* Table Section */}
          <div className="lg:w-4/5 bg-[#F5F7FA] rounded-xl p-7">
            <div className="flex justify-between">
              {/* Services Section */}
              <div>
                <span className="font-semibold text-xl">Services</span>
                <div className="flex flex-col gap-3 text-black pt-5">
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Solo travel
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Family Trip
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Hotel reservations
                  </Link>
                </div>
              </div>

              {/* Social Media Section */}
              <div>
                <span className="font-semibold text-xl">Social media</span>
                <div className="flex flex-col gap-3 text-black pt-5">
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Twitter/X
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Instagram
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Facebook
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Tiktok
                  </Link>
                </div>
              </div>

              {/* Network Section */}
              <div>
                <span className="font-semibold text-xl">Network</span>
                <div className="flex flex-col gap-3 text-black pt-5">
                  <Link href={"/"} className="text-gray-500 no-underline">
                    Google Email
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    example@gmail.com
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    WhatsApp Business
                  </Link>
                  <Link href={"/"} className="text-gray-500 no-underline">
                    +628123456789
                  </Link>
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="flex flex-col">
                <span className="font-semibold text-xl">Payment Methods</span>
                <div className="flex gap-5 pt-5">
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.dana.id/">
                      <Image
                        src="/images/payment/Logo_dana.png"
                        alt="payment"
                        width={90}
                        height={30}
                      />
                    </Link>
                    <Link href="https://www.dana.id/">
                      <Image
                        src="/images/payment/Apple-Pay-logo.png"
                        alt="payment"
                        width={80}
                        height={40}
                      />
                    </Link>
                    <Link href="https://www.dana.id/">
                      <Image
                        src="/images/payment/visa-logo-.png"
                        alt="payment"
                        width={70}
                        height={20}
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href="https://www.dana.id/">
                      <Image
                        src="/images/payment/bca-bank-logo.webp"
                        alt="payment"
                        width={100}
                        height={30}
                      />
                    </Link>
                    <Link href="https://www.dana.id/">
                      <Image
                        src="/images/payment/logo-ovo.png"
                        alt="payment"
                        width={80}
                        height={30}
                      />
                    </Link>
                    <Link href="https://www.dana.id/">
                      <Image
                        src="/images/payment/shopee-pay-logo.webp"
                        alt="payment"
                        width={80}
                        height={40}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="my-9 h-px bg-gray-300"></div>
        <p className="text-gray-500 text-sm text-center pb-4">
          Copyright © 2024 HTrip.com Travel Bekasi Pte. Ltd. All rights reserved
          <br /> Site Operator: HTrip.com Travel Bekasi Pte. Ltd.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
