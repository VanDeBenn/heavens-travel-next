"use client";
import { useState } from "react";
import { Montserrat } from "next/font/google";
import { Switch as AntSwitch, Input, Form, Modal, Button } from "antd";
import { Disclosure, Transition } from "@headlessui/react";
import { RiArrowDownSLine, RiBus2Line, RiStore2Line } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

import { CiHospital1 } from "react-icons/ci";

const sections = [
  {
    title: "Public Transportation",
    icon: <RiBus2Line className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ id: 1, locationTransport: "", distance: "" }],
    dropdownLabel: "Location Transport",
  },
  {
    title: "Hospital or Clinic",
    icon: <CiHospital1 className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ id: 2 }],
    dropdownLabel: "Location Hospital/Clinic",
  },
  {
    title: "Convenience Store",
    icon: <RiStore2Line className="text-2xl text-RoyalAmethyst-700" />,
    content: [{ id: 3, locationTransport: "", distance: "" }],
    dropdownLabel: "Location Store",
  },
];

export default function NearbyLocationHotel() {
  const [switchStates, setSwitchStates] = useState<Record<number, boolean>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [form] = Form.useForm();

  const toggleSwitch = (id: number) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleDelete = (id: number) => {
    setItemToDelete(id);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (itemToDelete !== null) {
      // Find section and remove the item with itemToDelete
      sections.forEach((section) => {
        section.content = section.content.filter(
          (item) => item.id !== itemToDelete
        );
      });
      setModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
  };

  const handleAdd = (sectionIndex: number) => {
    const newId =
      Math.max(...sections[sectionIndex].content.map((item) => item.id)) + 1;
    sections[sectionIndex].content.push({
      id: newId,
      locationTransport: "",
      distance: "",
    });

    setSwitchStates({ ...switchStates });
  };

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div
        className={`${mediumMontserrat.className} pb-6 flex justify-between items-center`}
      >
        <span className="text-lg font-semibold">
          Nearby Location Information
        </span>
      </div>

      {/* Form for Location */}
      <div className="h-px bg-gray-300"></div>
      <div className="mt-4">
        <Form layout="vertical" className="space-y-4">
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input
              className="w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-RoyalAmethyst-700 focus:border-RoyalAmethyst-700"
              placeholder="Enter the location"
            />
          </Form.Item>
        </Form>
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
                            onClick={() => handleAdd(index)}
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
                            <Form layout="vertical" className="w-full">
                              <Form.Item
                                label={section.dropdownLabel} // Use dynamic label
                                name="locationTransport"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input the location!",
                                  },
                                ]}
                              >
                                <Input
                                  className="w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-RoyalAmethyst-700 focus:border-RoyalAmethyst-700"
                                  placeholder={`Enter the ${section.dropdownLabel}`}
                                />
                              </Form.Item>
                            </Form>
                            <Form layout="vertical" className="">
                              <Form.Item
                                label="Distance"
                                name="distance"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input the distance!",
                                  },
                                ]}
                              >
                                <Input
                                  className="w-full border-gray-300 rounded-lg py-2 px-4 focus:ring-RoyalAmethyst-700 focus:border-RoyalAmethyst-700"
                                  placeholder="Enter the distance"
                                />
                              </Form.Item>
                            </Form>
                          </div>

                          <div className="flex items-center gap-3">
                            <AntSwitch
                              checked={switchStates[item.id] || false}
                              onChange={() => toggleSwitch(item.id)}
                            />
                            <FaRegTrashAlt
                              className="text-xl text-InfernoEcho-600 cursor-pointer"
                              onClick={() => handleDelete(item.id)}
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

      {/* Modal for Delete Confirmation */}
      <Modal
        title="Delete Confirmation"
        visible={modalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        footer={[
          <Button key="cancel" onClick={cancelDelete}>
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
