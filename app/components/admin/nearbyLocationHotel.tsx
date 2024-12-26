"use client";
import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { Switch as AntSwitch, Input, Form, Modal, Button, message } from "antd";
import { Disclosure, Transition } from "@headlessui/react";
import { RiArrowDownSLine, RiBus2Line, RiStore2Line } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiHospital1 } from "react-icons/ci";
import { nearbyLocationRepository } from "#/repository/nearbyLocations";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface LocationItem {
  id: number;
  location: string;
  distance: string;
}

interface SectionData {
  [key: string]: LocationItem[];
}

const initialSections = [
  {
    id: "publicTransport",
    title: "Public Transportation",
    icon: <RiBus2Line className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ id: 1, location: "", distance: "" }],
    dropdownLabel: "Location Transport",
  },
  {
    id: "hospital",
    title: "Hospital or Clinic",
    icon: <CiHospital1 className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ id: 2, location: "", distance: "" }],
    dropdownLabel: "Location Hospital/Clinic",
  },
  {
    id: "convenience",
    title: "Convenience Store",
    icon: <RiStore2Line className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ id: 3, location: "", distance: "" }],
    dropdownLabel: "Location Store",
  },
];

interface ComponentProps {
  hotelId: any;
}

export default function NearbyLocationHotel({ hotelId }: ComponentProps) {
  const [sections, setSections] = useState(initialSections);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    sectionIndex: number;
    itemId: number;
  } | null>(null);
  const [formData, setFormData] = useState<SectionData>({
    publicTransport: [],
    hospital: [],
    convenience: [],
  });

  const handleDelete = (sectionIndex: number, id: number) => {
    setItemToDelete({ sectionIndex, itemId: id });
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const newSections = [...sections];
      newSections[itemToDelete.sectionIndex].content = newSections[
        itemToDelete.sectionIndex
      ].content.filter((item) => item.id !== itemToDelete.itemId);
      setSections(newSections);
      setModalVisible(false);
    }
  };

  const handleAdd = (sectionIndex: number) => {
    const newSections = [...sections];
    const newId =
      Math.max(...newSections[sectionIndex].content.map((item) => item.id), 0) +
      1;
    newSections[sectionIndex].content.push({
      id: newId,
      location: "",
      distance: "",
    });
    setSections(newSections);
  };

  const handleInputChange = (
    sectionIndex: number,
    itemId: number,
    field: "location" | "distance",
    value: string
  ) => {
    const newSections = [...sections];
    const itemIndex = newSections[sectionIndex].content.findIndex(
      (item) => item.id === itemId
    );
    if (itemIndex !== -1) {
      newSections[sectionIndex].content[itemIndex][field] = value;
      setSections(newSections);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const section of sections) {
        for (const item of section.content) {
          if (!item.location || !item.distance) continue;

          let categoriesNearbyLocationId;

          switch (section.id) {
            case "publicTransport":
              categoriesNearbyLocationId =
                "c004f1de-c280-4527-9702-ddb51181d652";
              break;
            case "hospital":
              categoriesNearbyLocationId =
                "5320cdb0-7f45-4ca4-bb3f-919bfb572976";
              break;
            case "convenience":
              categoriesNearbyLocationId =
                "06ffef57-2bd7-4a43-9b17-8867f09afa4c";
              break;
          }

          const data = {
            location: item.location,
            distance: item.distance,
            categoriesNearbyLocationId,
            hotelId,
          };

          console.log("near: ", data);

          const req = await nearbyLocationRepository.api.create(data);
        }
      }

      message.success("All nearby locations have been saved successfully");
    } catch (error) {
      console.error("Error saving nearby locations:", error);
      message.error("Failed to save some nearby locations");
    }
  };

  useEffect(() => {
    if (hotelId) {
      handleSubmit();
    }
  }, [hotelId]);

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div
        className={`${mediumMontserrat.className} pb-6 flex justify-between items-center`}
      >
        <span className="text-lg font-semibold">
          Nearby Location Information
        </span>
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
                        <div className="flex items-center gap-3">
                          <div
                            className={`${mediumMontserrat.className} px-5 py-2 border-solid border border-gray-300 rounded-xl cursor-pointer transition-all duration-300 text-black hover:text-RoyalAmethyst-700 hover:border-RoyalAmethyst-700 text-sm font-semibold`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAdd(index);
                            }}
                          >
                            + Add
                          </div>
                          <RiArrowDownSLine
                            className={`text-2xl ${
                              open ? "rotate-180 duration-300" : "duration-300"
                            }`}
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
                          className="px-3 py-3 border-solid border rounded-lg border-gray-300 flex justify-between items-center gap-6"
                        >
                          <div
                            className={`${mediumMontserrat.className} flex items-center gap-4 w-full`}
                          >
                            <div className="w-full">
                              <label className="block text-sm font-medium text-gray-700">
                                {section.dropdownLabel}
                              </label>
                              <Input
                                className="mt-1 w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-RoyalAmethyst-700 focus:border-RoyalAmethyst-700"
                                placeholder={`Enter the ${section.dropdownLabel}`}
                                value={item.location}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    item.id,
                                    "location",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="w-full">
                              <label className="block text-sm font-medium text-gray-700">
                                Distance
                              </label>
                              <Input
                                className="mt-1 w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-RoyalAmethyst-700 focus:border-RoyalAmethyst-700"
                                placeholder="Enter the distance"
                                value={item.distance}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    item.id,
                                    "distance",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <FaRegTrashAlt
                              className="text-xl text-InfernoEcho-600 cursor-pointer"
                              onClick={() => handleDelete(index, item.id)}
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

      <Modal
        title="Delete Confirmation"
        open={modalVisible}
        onOk={confirmDelete}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="continue" type="primary" onClick={confirmDelete}>
            Continue
          </Button>,
        ]}
      >
        <p>Are you sure you want to remove this item?</p>
      </Modal>
    </div>
  );
}
