"use client";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Switch as AntSwitch } from "antd";
import { Disclosure, Transition } from "@headlessui/react";
import { RiArrowDownSLine, RiSpeakLine, RiWifiFill } from "react-icons/ri";
import { GiKnifeFork } from "react-icons/gi";
import { TbHeadset, TbAirConditioning } from "react-icons/tb";
import GBFlagIcon from "country-flag-icons/react/3x2/GB";
import IDFlagIcon from "country-flag-icons/react/3x2/ID";
import MYFlagIcon from "country-flag-icons/react/3x2/MY";
import {
  MdOutlineSettingsInputAntenna,
  MdOutlineMicrowave,
  MdOutlineBathtub,
  MdDeck,
  MdCleaningServices,
  MdRouter,
} from "react-icons/md";
import { IoIosCellular } from "react-icons/io";
import {
  FaHeadset,
  FaSwimmingPool,
  FaDumbbell,
  FaSpa,
  FaUserTie,
} from "react-icons/fa";
import { PiCigarette } from "react-icons/pi";
import { BsCurrencyExchange } from "react-icons/bs";
import { facilitieRepository } from "#/repository/facilities";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface ComponentProps {
  data: any;
  hotelId: any;
}

export default function FacilityInfoHotel({ data, hotelId }: ComponentProps) {
  if (!data) {
    return;
  }

  const sections = [
    {
      title: data[0]?.title,
      icon: <RiSpeakLine className="text-2xl text-RoyalAmethyst-700" />,
      content: [
        {
          id: data[0]?.serviceamenities[0]?.id,
          icons: GBFlagIcon,
          name: data[0]?.serviceamenities[0]?.title,
        },
        {
          id: data[0]?.serviceamenities[1]?.id,
          icons: IDFlagIcon,
          name: data[0]?.serviceamenities[1]?.title,
        },
        {
          id: data[0]?.serviceamenities[2]?.id,
          icons: MYFlagIcon,
          name: data[0]?.serviceamenities[2]?.title,
        },
      ],
    },
    {
      title: data[1]?.title,
      icon: <RiWifiFill className="text-2xl text-RoyalAmethyst-700" />,
      content: [
        {
          id: data[1]?.serviceamenities[0]?.id,
          icons: RiWifiFill,
          name: data[1]?.serviceamenities[0]?.title,
        },
        {
          id: data[1]?.serviceamenities[1]?.id,
          icons: MdOutlineSettingsInputAntenna,
          name: data[1]?.serviceamenities[1]?.title,
        },
        {
          id: data[1]?.serviceamenities[2]?.id,
          icons: IoIosCellular,
          name: data[1]?.serviceamenities[2]?.title,
        },
      ],
    },
    {
      title: data[2]?.title,
      icon: <GiKnifeFork className="text-2xl text-RoyalAmethyst-700" />,
      content: [
        {
          id: data[2]?.serviceamenities[0]?.id,
          icons: FaHeadset,
          name: data[2]?.serviceamenities[0]?.title,
        },
        {
          id: data[2]?.serviceamenities[1]?.id,
          icons: MdOutlineMicrowave,
          name: data[2]?.serviceamenities[1]?.title,
        },
        {
          id: data[2]?.serviceamenities[2]?.id,
          icons: FaSwimmingPool,
          name: data[2]?.serviceamenities[2]?.title,
        },
        {
          id: data[2]?.serviceamenities[3]?.id,
          icons: FaDumbbell,
          name: data[2]?.serviceamenities[3]?.title,
        },
        {
          id: data[2]?.serviceamenities[4]?.id,
          icons: MdOutlineBathtub,
          name: data[2]?.serviceamenities[4]?.title,
        },
        {
          id: data[2]?.serviceamenities[5]?.id,
          icons: PiCigarette,
          name: data[2]?.serviceamenities[5]?.title,
        },
        {
          id: data[2]?.serviceamenities[6]?.id,
          icons: FaSpa,
          name: data[2]?.serviceamenities[6]?.title,
        },
      ],
    },
    {
      title: data[3]?.title,
      icon: <TbHeadset className="text-2xl text-RoyalAmethyst-700" />,
      content: [
        {
          id: data[3]?.serviceamenities[0]?.id,
          icons: TbAirConditioning,
          name: data[3]?.serviceamenities[0]?.title,
        },
        {
          id: data[3]?.serviceamenities[1]?.id,
          icons: FaUserTie,
          name: data[3]?.serviceamenities[1]?.title,
        },
        {
          id: data[3]?.serviceamenities[2]?.id,
          icons: MdDeck,
          name: data[3]?.serviceamenities[2]?.title,
        },
        {
          id: data[3]?.serviceamenities[3]?.id,
          icons: MdCleaningServices,
          name: data[3]?.serviceamenities[3]?.title,
        },
        {
          id: data[3]?.serviceamenities[4]?.id,
          icons: BsCurrencyExchange,
          name: data[3]?.serviceamenities[4]?.title,
        },
        {
          id: data[3]?.serviceamenities[5]?.id,
          icons: MdRouter,
          name: data[3]?.serviceamenities[5]?.title,
        },
      ],
    },
  ];

  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({});

  const toggleSwitch = (id: string) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const addFacilities = async () => {
    try {
      // Iterasi melalui entries dari switchStates
      for (const [id, status] of Object.entries(switchStates)) {
        const data = {
          serviceAmenitiesId: id,
          status,
          hotelId, // Asumsikan hotelId sudah tersedia
        };

        console.log("Mengirim data:", data);

        const req = await facilitieRepository.api.create(data);
      }
      console.log("Semua fasilitas berhasil ditambahkan!");
    } catch (error) {
      console.error("Error saat menambah fasilitas:", error);
    }
  };

  useEffect(() => {
    if (hotelId) {
      addFacilities();
    }
  }, [hotelId]);

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Facility Information</span>
      </div>
      <div className="h-px bg-gray-300"></div>
      <div className="flex flex-col gap-5 pt-5">
        {sections.map((section, index) => (
          <div key={index}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="bg-white border-none cursor-pointer px-0 w-full">
                    <div>
                      <div className="flex justify-between items-center pb-5">
                        <div className="flex gap-3 items-center">
                          <div className="border-solid rounded-full border border-RoyalAmethyst-700 flex items-center justify-center w-14 h-14">
                            {section.icon}
                          </div>
                          <div>
                            <span className="text-lg font-semibold text-black">
                              {section.title}
                            </span>
                          </div>
                        </div>
                        <div>
                          <RiArrowDownSLine
                            className={`text-2xl ${
                              open ? "rotate-180 duration-300" : "duration-300"
                            } `}
                          />
                        </div>
                      </div>
                      <div className="h-px bg-gray-300"></div>
                    </div>
                  </Disclosure.Button>
                  <Transition
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel
                      className={`${mediumMontserrat.className} text-gray-500 mt-3 ml-16 flex flex-col gap-3`}
                    >
                      {section.content.map((item) => (
                        <div
                          key={item.id}
                          className="px-3 py-3 border-solid border rounded-lg border-gray-300 flex justify-between items-center"
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center">
                              {item.icons && (
                                <item.icons className="text-RoyalAmethyst-700 w-5 h-5" />
                              )}
                              <span className="pl-2 text-xs sm:text-sm text-black font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <div>
                            <AntSwitch
                              checked={switchStates[item.id] || false}
                              onChange={() => toggleSwitch(item.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
