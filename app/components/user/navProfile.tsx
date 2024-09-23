"use client";

import React, { useState } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  HeartOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation"; // Untuk navigasi
import { useCookies } from "next-client-cookies";
import { TokenUtil } from "#/utils/token";

const menuItems = [
  { key: "profile", icon: <UserOutlined />, label: "Profile" },
  { key: "wishlist", icon: <HeartOutlined />, label: "Wishlist" },
  { key: "booking", icon: <CalendarOutlined />, label: "Booking" },
];

const NavProfile: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>("profile");
  const router = useRouter();
  const cookie = useCookies();

  function logout() {
    TokenUtil.clearAccessToken();
    TokenUtil.clearRefreshToken();
    TokenUtil.clearResetToken();
    TokenUtil.persistToken();
    // router.push("/login");
  }

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      // Logika untuk logout
      console.log("Logging out...");
    } else {
      setSelectedKey(key);
      router.push(`/${key}`); // Navigasi ke halaman sesuai menu key
    }
  };

  return (
    <div className="w-48 h-screen bg-white shadow-md rounded-xl">
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
                  selectedKey === item.key ? "text-[#4F28D9]" : "text-black"
                }`}
              >
                {item.label}
                {selectedKey === item.key && (
                  <span className="ml-7 text-[#4F28D9]">|</span>
                )}
              </Menu.Item>
            ))}
          </Menu>
        </div>

        <div
          className="flex justify-center items-center gap-2 cursor-pointer mt-auto text-[#DC143C]"
          onClick={logout}
        >
          <LogoutOutlined style={{ color: "#DC143C", fontSize: 26 }} />
          <span className="text-base">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default NavProfile;
