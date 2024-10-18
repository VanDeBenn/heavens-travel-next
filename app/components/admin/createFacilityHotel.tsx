"use client";

import { useState } from "react";
import { Montserrat } from "next/font/google";
import { GB, ID, MY } from "country-flag-icons/react/3x2";
import Link from "next/link";
import { RiArrowDownSLine, RiSpeakLine, RiWifiFill } from "react-icons/ri";
import { Disclosure, Transition } from "@headlessui/react";
import { GiKnifeFork } from "react-icons/gi";
import { TbHeadset } from "react-icons/tb";
import { Modal, Input } from "antd";
import { FaTrash } from "react-icons/fa";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface Section {
  title: string;
  icon: JSX.Element;
  content: { country: React.FC<any>; name: string }[];
}

const initialLanguages = [
  { country: GB, name: "English" },
  { country: ID, name: "Indonesian" },
  { country: MY, name: "Malaysia" },
];

const initialSections: Section[] = [
  {
    title: "Language Spoken",
    icon: <RiSpeakLine className="text-2xl text-RoyalAmethyst-700" />,
    content: initialLanguages,
  },
  {
    title: "Internet",
    icon: <RiWifiFill className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { country: GB, name: "Free Wi-Fi" },
      { country: ID, name: "High-speed Internet" },
      { country: MY, name: "Internet Kiosk" },
    ],
  },
  {
    title: "Facility",
    icon: <GiKnifeFork className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { country: GB, name: "Restaurant" },
      { country: ID, name: "Gym" },
      { country: MY, name: "Swimming Pool" },
    ],
  },
  {
    title: "Service and Convenience",
    icon: <TbHeadset className="text-2xl text-RoyalAmethyst-700" />,
    content: [
      { country: GB, name: "24-hour Front Desk" },
      { country: ID, name: "Room Service" },
      { country: MY, name: "Concierge" },
    ],
  },
];

export default function CreateFacilityHotel() {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null
  );
  const [newFacilityName, setNewFacilityName] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState<{
    sectionIndex: number;
    facilityIndex: number;
  } | null>(null);

  const handleAddFacility = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);
    setIsModalVisible(true);
  };

  const handleSaveFacility = () => {
    if (currentSectionIndex !== null && newFacilityName) {
      const updatedSections = [...sections];
      updatedSections[currentSectionIndex].content.push({
        country: GB,
        name: newFacilityName,
      });
      setSections(updatedSections);
      setNewFacilityName("");
      setIsModalVisible(false);
    }
  };

  const handleDeleteFacility = () => {
    if (facilityToDelete) {
      const { sectionIndex, facilityIndex } = facilityToDelete;
      const updatedSections = [...sections];
      updatedSections[sectionIndex].content.splice(facilityIndex, 1);
      setSections(updatedSections);
      setFacilityToDelete(null);
      setIsDeleteModalVisible(false);
    }
  };

  const handleCancelChanges = () => {
    setSections(initialSections);
  };

  const handleSaveChanges = () => {
    // Implement save logic here
    console.log("Changes saved");
  };

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9 ">
      <div
        className={`${mediumMontserrat.className} pb-6 flex justify-between items-center `}
      >
        <span className="text-lg font-semibold">Facility Information</span>
        <div className="flex gap-3">
          <div
            className={`${mediumMontserrat.className}  bg-RoyalAmethyst-700 px-9 py-2 cursor-pointer rounded-xl text-white `}
            onClick={handleCancelChanges}
          >
            Cancel
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-300"></div>
      <div className="flex flex-col gap-5 pt-5">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
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
                        <div className="flex items-center gap-4">
                          {section.title !== "Language Spoken" && (
                            <div
                              className="font-semibold text-lg cursor-pointer"
                              onClick={() => handleAddFacility(sectionIndex)}
                            >
                              + Add Facility
                            </div>
                          )}
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
                    enterFrom="opacity -0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Disclosure.Panel
                      className={`${mediumMontserrat.className} text-gray-500 mt-3 ml-16 flex flex-col gap-3`}
                    >
                      {section.content.map((item, facilityIndex) => (
                        <div
                          key={facilityIndex}
                          className="px-3 py-3 border-solid border rounded-lg border-gray-300 flex justify-between items-center"
                        >
                          <div className="flex flex-col gap-2 ">
                            <div className="flex items-center ">
                              <item.country
                                title="Country"
                                className="w-5 h-5"
                              />
                              <span className="pl-2 text-xs sm:text-sm text-black font-semibold">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <div>
                            <FaTrash
                              className="text-InfernoEcho-600 cursor-pointer"
                              onClick={() => {
                                setIsDeleteModalVisible(true);
                                setFacilityToDelete({
                                  sectionIndex,
                                  facilityIndex,
                                });
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      {section.title === "Language Spoken" &&
                        section.content.length < initialLanguages.length && (
                          <div
                            className="font-semibold text-lg cursor-pointer"
                            onClick={() => handleAddFacility(sectionIndex)}
                          >
                            + Add Facility
                          </div>
                        )}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>

      <Modal
        title="Add Facility"
        visible={isModalVisible}
        onOk={handleSaveFacility}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={newFacilityName}
          onChange={(e) => setNewFacilityName(e.target.value)}
          placeholder="Enter facility name"
        />
      </Modal>

      <Modal
        title="Delete Facility"
        visible={isDeleteModalVisible}
        onOk={handleDeleteFacility}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        Are you sure you want to delete this facility?
      </Modal>

      <div className="flex justify-end pt-7">
        <div
          className={`${mediumMontserrat.className}  bg-RoyalAmethyst-700 px-9 py-2 cursor-pointer rounded-xl text-white `}
          onClick={handleSaveChanges}
        >
          save change
        </div>
      </div>
    </div>
  );
}
