import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  RiTelegramLine,
  RiWhatsappFill,
  RiInstagramLine,
  RiFacebookLine,
  RiTiktokLine,
  RiMailFill,
} from "react-icons/ri";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const Footer = () => {
  return (
    <footer
      className={`${poppins.className} w-full sticky z-50 bottom-0 lg:relative`}
    >
      <div className="">
        <div className="">
          <div className="block">
            <div className="w-36">
              <div className="flex gap-2 items-center justify-start w-full">

                <Image
                  src="/images/Logo.png"
                  alt="logo"
                  width={100}
                  height={100}
                />

                <h1 className="text-xl md:text-2xl uppercase font-semibold dark:text-white">
                  Logo
                </h1>
              </div>
            </div>

            <p className="pt-5 text-sm sm:text-base text-cloudBurst-900  dark:text-white">
              We are ready to assist you in your travel and hospitality needs
            </p>
          </div>

          <div className="flex xl:flex-row flex-col xl:gap-48 bg-[#F5F7FA] mt-8 lg:mt-12 rounded-xl">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-32 p-7 justify-between  w-full">
              <div className="flex flex-col gap-5 order-3 lg:order-1">
                <h1
                  className={`text-xl md:text-2xl text-cloudBurst-900 font-semibold dark:text-white`}
                >
                  Services
                </h1>
                <div className="flex flex-col gap-2">
                  <p className="text-cloudBurst-900 dark:text-athensGray-300">
                    <Link href={"/"}>Solo travel</Link>
                  </p>

                  <p className="text-cloudBurst-900 dark:text-athensGray-300">
                    <Link href={"/"}> Family Trip </Link>
                  </p>
                  <p className="text-cloudBurst-900 dark:text-athensGray-300">
                    <Link href={"/"}> Airplane tickets </Link>
                  </p>
                  <p className="text-cloudBurst-900 dark:text-athensGray-300">
                    <Link href={"/"}> Hotel reservations </Link>
                  </p>
                </div>
              </div>

              <div className="flex gap-5 flex-col order-2">
                <h1
                  className={`text-xl md:text-2xl text-cloudBurst-900 font-semibold dark:text-white`}
                >
                  Social media
                </h1>
                <div className="flex flex-col gap-2">
                  <p className="text-cloudBurst-900  dark:text-athensGray-300">
                    <Link href={"/"}>Instagram</Link>
                  </p>

                  <p className="text-cloudBurst-900  dark:text-athensGray-300">
                    <Link href={"/"}>Facebook </Link>
                  </p>

                  <p className="text-cloudBurst-900  dark:text-athensGray-300">
                    <Link href={"/"}>Twitter/X </Link>
                  </p>
                  <p className="text-cloudBurst-900  dark:text-athensGray-300">
                    <Link href={"/"}>Tiktok </Link>
                  </p>
                </div>
              </div>

              <div className="flex gap-2 dark:text-azure-700 text-royalblue-600 lg:hidden">
                <a
                  target="_blank"
                  href="https://t.me/TripSAFU"
                  className="rounded bg-selago-100 dark:bg-[#1e293b] p-2 text-xl sm:text-2xl sm:p-3"
                >
                  <RiTelegramLine />
                </a>
                <a
                  target="_blank"
                  href="https://api.whatsapp.com/send/?phone=%2B6287777111155&text=Halo+Admin%2C+Saya+ingin+trip+di+tripsafu+berikan+informasi+lebih+lanjut&type=phone_number&app_absent=0"
                  className="rounded bg-selago-100 dark:bg-[#1e293b] p-2 text-xl sm:text-2xl sm:p-3"
                >
                  <RiWhatsappFill />
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/tripsafu/"
                  className="rounded bg-selago-100 dark:bg-[#1e293b] p-2 text-xl sm:text-2xl sm:p-3"
                >
                  <RiInstagramLine />
                </a>
                <a
                  target="_blank"
                  href="https://www.facebook.com"
                  className="rounded bg-selago-100 dark:bg-[#1e293b] p-2 text-xl sm:text-2xl sm:p-3"
                >
                  <RiFacebookLine />
                </a>
                <a
                  target="_blank"
                  href="https://www.tiktok.com/@tripsafu?_t=8naptU7snrd&_r=1"
                  className="rounded bg-selago-100 dark:bg-[#1e293b] p-2 text-xl sm:text-2xl sm:p-3"
                >
                  <RiTiktokLine />
                </a>
              </div>

              <div className="lg:flex flex-col order-3 gap-5 hidden">
                <h1
                  className={`text-xl md:text-2xl text-cloudBurst-900 dark:text-white font-semibold`}
                >
                  Network
                </h1>
                <div className="lg:flex lg:flex-col hidden gap-2">
                  <p className="text-cloudBurst-900 dark:text-athensGray-300">
                    <Link href={""}>Google Email </Link>
                  </p>

                  <p className="text-cloudBurst-900  dark:text-athensGray-300">
                    <Link href={""}>example@gmail.com</Link>
                  </p>

                  <p className="text-cloudBurst-900  dark:text-athensGray-300">
                    <Link href={""}>WhatsApp Business </Link>
                  </p>

                  <p className="text-cloudBurst-900  dark:text-athensGray-300">
                    <Link href={""}>+628123456789 </Link>
                  </p>
                </div>
              </div>

              <div className="lg:flex flex-col order-3 gap-5 hidden">
                <h1
                  className={`text-xl md:text-2xl text-cloudBurst-900 dark:text-white font-semibold`}
                >
                  Payment methods
                </h1>
                <div className="flex gap-5">
                  <div className="lg:flex lg:flex-col hidden gap-2">
                    <Image
                      src="/images/payment/Logo_dana.png"
                      alt="payment"
                      width={110}
                      height={100}
                    />
                    <Image
                      src="/images/payment/Apple-Pay-logo.png"
                      alt="payment"
                      width={80}
                      height={100}
                    />
                    <Image
                      src="/images/payment/visa-logo-.png"
                      alt="payment"
                      width={70}
                      height={100}
                    />
                  </div>

                  <div className="lg:flex lg:flex-col hidden gap-2">
                    <Image
                      src="/images/payment/bca-bank-logo.webp"
                      alt="payment"
                      width={100}
                      height={100}
                    />
                    <Image
                      src="/images/payment/logo-ovo.png"
                      alt="payment"
                      width={80}
                      height={100}
                    />
                    <Image
                      src="/images/payment/shopee-pay-logo.webp"
                      alt="payment"
                      width={80}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border border-t-1 border-[#DBDBDB] w-full mt-16"></div> */}

        <h1 className="text-cloudBurst-900 dark:text-white md:text-sm pt-20 text-center">
          Copyright © 2024 HTrip.com Travel Bekasi Pte. Ltd. All rights reserved{" "}
          <br /> Site Operator: HTrip.com Travel Bekasi Pte. Ltd.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
