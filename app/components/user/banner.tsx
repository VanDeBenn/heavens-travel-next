"use client";
import { Julee } from "next/font/google";
import { Montserrat } from "next/font/google";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const JuleeNormal = Julee({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Banner() {
  return (
    <div
      className="relative pt-16 pb-32 flex content-center items-center justify-center"
      style={{ minHeight: "115vh" }}
    >
      {/* Background Image */}
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{ backgroundImage: "url('/images/illustration/beach2.png')" }}
      ></div>

      {/* Text Over Main Background */}
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="flex flex-col gap-1 z-10 text-white">
              <span
                className={`${JuleeNormal.className} text-[100px] font-semibold text-center`}
              >
                Travel
              </span>
              <span
                className={`${mediumMontserrat.className} text-xl font-semibold text-center`}
              >
                Tours & Things to do hand-picked
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
