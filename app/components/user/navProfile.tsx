"use client";

import React, { useState } from "react";
import { Menu, Modal } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { TokenUtil } from "#/utils/token";

const menuItems = [
  { key: "profile", icon: <UserOutlined />, label: "Profile" },
  { key: "profile/wishlists", icon: <HeartOutlined />, label: "Wishlists" },
  { key: "profile/bookings", icon: <CalendarOutlined />, label: "Bookings" },
];

const NavProfile: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("profile");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const cookie = useCookies();

  function logout() {
    TokenUtil.clearAccessToken();
    TokenUtil.clearRefreshToken();
    TokenUtil.persistToken();
    localStorage.clear();
    router.push("/login");
  }

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      setIsModalVisible(true); // Show the modal when logout is clicked
    } else {
      setSelectedKey(key);
      router.push(`/${key}`);
    }
  };

  const handleOk = () => {
    logout(); // Proceed with logout if confirmed
    setIsModalVisible(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal if canceled
  };

  return (
    <div className="w-48 h-screen bg-white border-solid border-gray-200 border rounded-xl">
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={({ key }) => handleMenuClick(key)}
          >
            {menuItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                className={`flex ${
                  selectedKey === item.key
                    ? "text-RoyalAmethyst-700"
                    : "text-black"
                }`}
              >
                {item.label}
                {selectedKey === item.key && (
                  <span className="ml-7 text-RoyalAmethyst-700">|</span>
                )}
              </Menu.Item>
            ))}
          </Menu>
        </div>

        <div
          className="flex justify-center items-center gap-2 cursor-pointer mt-auto text-InfernoEcho-600"
          onClick={() => setIsModalVisible(true)} // Show the modal when logout is clicked
        >
          <LogoutOutlined style={{ color: "#DC143C", fontSize: 26 }} />
          <span className="text-base">Log out</span>
        </div>
      </div>

      {/* Modal for confirmation */}
      <Modal
        title="Are you sure?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Continue"
        cancelText="Cancel"
        className="text-black"
      >
        <p>Do you really want to log out?</p>
      </Modal>
    </div>
  );
};

export default NavProfile;
