"use client";
import { Button, Spin, Steps, message } from "antd";
import { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import {
  RiInformation2Line,
  RiMapPinLine,
  RiCameraLine,
} from "react-icons/ri";

import Link from "next/link";
import { Montserrat } from "next/font/google";
import BasicInfoDestination from "./basicInfoDestination";
import LocationInfoDestination from "./locationInfoDestination";
import PhotoDestination from "./photoDestination";

const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});
const smallMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
});

const { Step } = Steps;

const NextStepDestination: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      content: <BasicInfoDestination />,
      icon:
        loading && current === 0 ? (
          <Spin size="small" />
        ) : (
          <RiInformation2Line
            size={24}
            color={
              completedSteps.includes(0) || current === 0 ? "#4F28D9" : "#000"
            }
          />
        ),
    },
    {
      content: <LocationInfoDestination />,
      icon:
        loading && current === 1 ? (
          <Spin size="small" />
        ) : (
          <RiMapPinLine
            size={24}
            color={
              completedSteps.includes(1) || current === 1 ? "#4F28D9" : "#000"
            }
          />
        ),
    },
    {
      content: <PhotoDestination />,
      icon:
        loading && current === 2 ? (
          <Spin size="small" />
        ) : (
          <RiCameraLine
            size={24}
            color={
              completedSteps.includes(2) || current === 2 ? "#4F28D9" : "#000"
            }
          />
        ),
    },
  ];

  const next = () => {
    setLoading(true);
    setTimeout(() => {
      setCompletedSteps([...completedSteps, current]); // Tambahkan langkah saat ini ke daftar langkah yang selesai
      setCurrent(current + 1);
      setLoading(false);
    }, 2000);
  };

  const prev = () => {
    setLoading(true);
    setTimeout(() => {
      setCompletedSteps(completedSteps.filter((step) => step !== current - 1)); // Hapus langkah yang dikembalikan dari daftar yang selesai
      setCurrent(current - 1);
      setLoading(false);
    }, 1200);
  };

  const finish = () => {
    message.success("All steps completed!");
  };

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="flex justify-center">
          <Steps current={current} className="w-1/3">
            {steps.map((item, index) => (
              <Step key={index} icon={item.icon} />
            ))}
          </Steps>
        </div>

        <div className="w-full flex flex-col gap-5 pt-5">
          <div className="w-full">
            {/* Tampilkan konten langkah tanpa loading */}
            <div>{steps[current].content}</div>
          </div>

          <div className="pt-4 flex justify-end">
            <div className="w-72 flex justify-between gap-4 items-center">
              <div className="flex items-center justify-between w-full gap-3">
                {current > 0 && (
                  <Button
                    onClick={prev}
                    className="w-full rounded-xl"
                    disabled={loading}
                  >
                    Previous
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <div
                    onClick={next}
                    className="w-full bg-[#4F28D9] text-center py-2 text-white text-sm rounded-xl cursor-pointer"
                  >
                    <span>Next</span>
                  </div>
                )}
              </div>
              <div>
                {current === steps.length - 1 && (
                  <Link href="/admin/destinations/create/result">
                    <Button
                      type="primary"
                      className="w-full rounded-xl"
                      disabled={loading}
                    >
                      Done
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextStepDestination;
