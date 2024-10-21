"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { FaTrash } from "react-icons/fa";
import { Modal, Input } from "antd";

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

const PoliciesHotel: React.FC = () => {
  const [policies, setPolicies] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [policyToRemove, setPolicyToRemove] = useState<number | null>(null);
  const [newPolicy, setNewPolicy] = useState("");

  const handleAddPolicy = () => {
    if (newPolicy.trim() !== "") {
      setPolicies([...policies, newPolicy]);
      setNewPolicy("");
    }
  };

  const handleRemovePolicy = (index: number) => {
    setPolicyToRemove(index);
    setIsModalVisible(true);
  };

  const confirmRemovePolicy = () => {
    if (policyToRemove !== null) {
      setPolicies(policies.filter((_, index) => index !== policyToRemove));
      setPolicyToRemove(null);
      setIsModalVisible(false);
    }
  };

  const cancelRemovePolicy = () => {
    setPolicyToRemove(null);
    setIsModalVisible(false);
  };

  return (
    <>
      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border p-9`}
      >
        <div className={`${mediumMontserrat.className} pb-2`}>
          <span className="text-lg font-semibold">Property Policies</span>
        </div>

        <div
          className={`${mediumMontserrat.className} text-sm font-semibold pb-3`}
        >
          <span className="cursor-pointer " onClick={handleAddPolicy}>
            + Add Policies
          </span>
        </div>

        {policies.map((policy, index) => (
          <div
            key={index}
            className={`${mediumMontserrat.className} rounded-lg border-solid border-gray-200 border mb-2`}
          >
            <div className="flex justify-between items-center py-2 px-2">
              <span className="text-sm text-black">{policy}</span>
              <FaTrash
                className="text-InfernoEcho-600 text-base cursor-pointer"
                onClick={() => handleRemovePolicy(index)}
              />
            </div>
          </div>
        ))}

        <Input
          value={newPolicy}
          onChange={(e) => setNewPolicy(e.target.value)}
          placeholder="Enter policy description"
          className="mb-2"
        />
      </div>

      <Modal
        title="Confirm Removal"
        visible={isModalVisible}
        onOk={confirmRemovePolicy}
        onCancel={cancelRemovePolicy}
        okText="Remove"
        cancelText="Cancel"
        closable={false} // Disable the close button
      >
        <p>Are you sure you want to remove this policy?</p>
      </Modal>
    </>
  );
};

export default PoliciesHotel;
