"use client";
import { Button, Spin, Steps, message } from "antd";
import { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { RiInformation2Line, RiMapPinLine, RiCameraLine } from "react-icons/ri";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import BasicInfoDestination from "./basicInfoDestination";
import LocationInfoDestination from "./locationInfoDestination";
import PhotoDestination from "./photoDestination";
import { destinationRepository } from "#/repository/destinations";
import { useRouter } from "next/navigation";

// Define the types for BasicInfo and LocationInfo
interface BasicInfo {
  nameDestination: string;
  adultPrice: number;
  childrenPrice: number;
  description: string;
  maxCapacity: number;
  rating: number;
}

interface LocationInfo {
  pathLocation: string;
  district: string;
  city: string;
  province: string;
  country: string;
  address: string;
}

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
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [destinationId, setDestinationId] = useState<string>("");

  // Use state with defined types for basicInfo and locationInfo
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    nameDestination: "",
    adultPrice: 0,
    childrenPrice: 0,
    description: "",
    maxCapacity: 0,
    rating: 0,
  });

  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    pathLocation: "",
    district: "",
    city: "",
    province: "",
    country: "",
    address: "",
  });

  const [photoInfo, setPhotoInfo] = useState();

  const next = () => {
    setLoading(true);
    setTimeout(() => {
      setCompletedSteps([...completedSteps, current]); // Add current step to completed steps
      setCurrent(current + 1);
      setLoading(false);
    }, 2000);
  };

  const prev = () => {
    setLoading(true);
    setTimeout(() => {
      setCompletedSteps(completedSteps.filter((step) => step !== current - 1)); // Remove the reverted step from completed steps
      setCurrent(current - 1);
      setLoading(false);
    }, 1200);
  };

  const finalData = {
    name: basicInfo.nameDestination,
    priceAdult: basicInfo.adultPrice,
    priceChildren: basicInfo.childrenPrice,
    // district: locationInfo.district,
    // city: locationInfo.city,
    // province: locationInfo.province,
    // country: locationInfo.country,
    address: locationInfo.address,
    description: basicInfo.description,
    maxCapacity: basicInfo.maxCapacity,
    rating: basicInfo.rating,
    pathLocation: locationInfo.pathLocation,
    // photos: photoInfo, // Uncomment if needed to include photos
  };

  const finish = async () => {
    setLoading(true);
    try {
      const finalData = {
        name: basicInfo.nameDestination,
        priceAdult: basicInfo.adultPrice,
        priceChildren: basicInfo.childrenPrice,
        // district: locationInfo.district,
        // city: locationInfo.city,
        // province: locationInfo.province,
        // country: locationInfo.country,
        address: locationInfo.address,
        description: basicInfo.description,
        maxCapacity: basicInfo.maxCapacity,
        rating: basicInfo.rating,
        pathLocation: locationInfo.pathLocation,
        // photos: photoInfo,
      };

      // console.log("Final Data:", finalData);
      const res = await destinationRepository.api.create(finalData);
      const idDestination = res.body.data.id;
      if (idDestination) {
        localStorage.setItem("_destination", idDestination);
        setDestinationId(idDestination);
        // router.push("/admin/destinations/create/result");
      }
      // console.log("return:", res.body.data.id);
      // console.log("id desti", idDestination);
      message.success("Destination created successfully!");
    } catch (error) {
      console.error("Error while creating destination:", error);
      message.error("Failed to create destination.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      content: (
        <BasicInfoDestination
          setBasicInfo={setBasicInfo}
          next={next}
          data={basicInfo}
        />
      ),
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
      content: (
        <LocationInfoDestination
          setLocationInfo={setLocationInfo}
          next={next}
          data={locationInfo}
        />
      ),
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
      content: (
        <PhotoDestination finish={finish} destinationId={destinationId} />
      ),
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
            {/* Display step content */}
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
                {current < steps.length - 1 && current !== 0 && (
                  <div
                    onClick={next}
                    className="w-full bg-RoyalAmethyst-700 text-center py-2 text-white text-sm rounded-xl cursor-pointer"
                  >
                    <span>Next</span>
                  </div>
                )}
              </div>
              <div>
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    className="w-full rounded-xl"
                    disabled={loading}
                    onClick={finish}
                  >
                    Done
                  </Button>
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
