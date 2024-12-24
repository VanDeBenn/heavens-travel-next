import Link from "next/link";

import { Montserrat } from "next/font/google";
import Image from "next/image";
export const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: "600",
});
import { BiLeftArrow } from "react-icons/bi";

export const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
export const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

export default function NotFound() {
  return (
    <div
      className={`${mediumMontserrat.className}  h-screen w-screen flex flex-col items-center justify-center `}
    >
      <Image
        src="/images/illustration/404.webp"
        alt="Not Found"
        height={350}
        width={600}
      />
      <span className="text-xl font-semibold text-[#5E5E5E]">
        Sorry, the page you are looking for could not be found
      </span>
      <Link
        href="/home"
        className="flex items-center gap-1 bg-RoyalAmethyst-700 rounded-lg px-5 py-2 mt-3"
      >
        <BiLeftArrow className="text-lg text-white" />
        <span className="text-lg text-white no-underline">Return Home</span>
      </Link>
    </div>
  );
}
