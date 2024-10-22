"use client";

// sidebar test

// import React, { useState } from "react";
// import { Link, useLocation } from 'react-router-dom';
// import { Layout } from 'antd';
// import {
//   RiUserSettingsLine,
//   RiNewsLine,
//   RiGlassesLine,
//   RiFileUserLine,
//   RiLogoutCircleLine,
//   RiArrowLeftSLine,
//   RiArrowRightSLine,
// } from 'react-icons/ri';
// import Image from "next/image";
// import { Tooltip, Modal, Button } from "antd";

// import { useRouter } from "next/navigation";
// const { Sider } = Layout;
// import { CgHomeAlt } from "react-icons/cg";
// import { MdOutlineRoomService } from "react-icons/md";
// import { BiBuildingHouse } from "react-icons/bi";
// const Sidebar: React.FC = () => {
//   const location = useLocation();

//   return (
//     <Sider width={250} className="border-r border-gray-300">
//       <div className="logo p-4 flex items-center">
//         <RiGlassesLine size={32} className="mr-2" />
//         <h2 className="text-xl font-semibold">My App</h2>
//       </div>
//       <ul className="p-4">
//         <li className={`mb-2 ${location.pathname === '/admin/destination' ? 'font-bold' : ''}`}>
//           <Link to="/admin/destination" className="flex items-center text-blue-600 hover:underline">
//             <RiUserSettingsLine className="mr-2" /> Destination List
//           </Link>
//         </li>
//         <li className={`mb-2 ${location.pathname === '/admin/information' ? 'font-bold' : ''}`}>
//           <Link to="/admin/information" className="flex items-center text-blue-600 hover:underline">
//             <RiNewsLine className="mr-2" /> Information Admin
//           </Link>
//         </li>
//         <li className={`mb-2 ${location.pathname === '/admin/settings' ? 'font-bold' : ''}`}>
//           <Link to="/admin/settings" className="flex items-center text-blue-600 hover:underline">
//             <RiFileUserLine className="mr-2" /> Settings
//           </Link>
//         </li>
//         <li className={`mb-2 ${location.pathname === '/admin/logout' ? 'font-bold' : ''}`}>
//           <Link to="/admin/logout" className="flex items-center text-blue-600 hover:underline">
//             <RiLogoutCircleLine className="mr-2" /> Logout
//           </Link>
//         </li>
//       </ul>
//     </Sider>
//   );
// };

// export default Sidebar;

// sidebar sesuai sigma
import React, { useState } from "react";
import {
  RiUserSettingsLine,
  RiNewsLine,
  RiGlassesLine,
  RiFileUserLine,
  RiLogoutCircleLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { CgHomeAlt } from "react-icons/cg";
import { MdOutlineRoomService } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";

import Image from "next/image";
import { Tooltip, Modal, Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const showLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogout = () => {
    setIsLogoutModalVisible(false);
    // Add actual logout logic here, e.g., clearing session data or token
    router.push("/login"); // Redirect to login after logout
  };

  const handleCancel = () => {
    setIsLogoutModalVisible(false);
  };

  return (
    <div className="relative">
      <div
        className={`${
          expanded ? "w-48" : "w-16"
        } h-screen p-3 bg-white flex flex-col items-center py-4 transition-all duration-300`}
      >
        {/* Logo */}
        <div className="mb-5">
          <Image
            src={
              expanded
                ? "/images/icon/icon-lanscape-black.png"
                : "/images/icon/logo-circle.png"
            }
            alt="Logo"
            className={`${expanded ? "w-32 h-10" : "w-10 h-10"}`}
            width={expanded ? 80 : 40}
            height={expanded ? 40 : 40}
          />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col justify-between items-center h-full w-full">
          <div className="flex flex-col gap-4 text-black w-full">
            {/* Arrow icon with dynamic change and rotation animation */}
            <Tooltip placement="right">
              <div
                className={`flex items-center w-full cursor-pointer transition-all duration-300 ${
                  expanded
                    ? "rotate-180 justify-start pl-3"
                    : "rotate-0 justify-center"
                }`}
                onClick={toggleSidebar}
              >
                {expanded ? (
                  <RiArrowLeftSLine className="text-3xl transition-transform duration-300" />
                ) : (
                  <RiArrowRightSLine className="text-3xl transition-transform duration-300" />
                )}
              </div>
            </Tooltip>
            {/* Menu list */}
            {menuItems.map((item) => (
              <Tooltip
                title={expanded ? "" : item.title}
                placement="right"
                key={item.id}
              >
                <Link href={item.href} passHref className="no-underline">
                  <div
                    onClick={() => setActiveItem(item.href)}
                    className={`flex items-center gap-2 ${
                      expanded ? "justify-start pl-4" : "justify-center"
                    } w-full cursor-pointer transition-all duration-300 ${
                      activeItem === item.href ? "text-RoyalAmethyst-700" : "text-black"
                    }`}
                  >
                    {item.icon}
                    {expanded && <span className="text-sm">{item.title}</span>}
                  </div>
                </Link>
              </Tooltip>
            ))}
          </div>

          {/* Logout */}
          <Tooltip title={expanded ? "" : ""} placement="right">
            <div
              className={`flex items-center gap-2 p-2 ${
                expanded ? "justify-start pl-4" : "justify-center"
              } w-full cursor-pointer transition-all duration-300`}
              onClick={showLogoutModal}
            >
              <RiLogoutCircleLine className="text-2xl text-InfernoEcho-600" />
              {expanded && <span className="text-InfernoEcho-600">Logout</span>}
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        title={null}
        open={isLogoutModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" danger onClick={handleLogout}>
            Continue
          </Button>,
        ]}
        closable={false} // Remove the 'X' button
        centered
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </div>
  );
}

const menuItems = [
  {
    id: 1,
    icon: <RiFileUserLine className="text-2xl" />,
    title: "User",
    href: "/admin/users",
  },
  {
    id: 2,
    icon: <RiGlassesLine className="text-2xl" />,
    title: "Destination",
    href: "/admin/destinations",
  },
  {
    id: 3,
    icon: <BiBuildingHouse className="text-2xl" />,
    title: "Hotel",
    href: "/admin/hotels",
  },
  {
    id: 4,
    icon: <RiNewsLine className="text-2xl" />,
    title: "Blog",
    href: "/admin/blog",
  },
  {
    id: 5,
    icon: <CgHomeAlt className="text-2xl" />,
    title: "Home",
    href: "/admin/",
  },
  {
    id: 6,
    icon: <MdOutlineRoomService className="text-2xl" />,
    title: "Services",
    href: "/admin/",
  },
  {
    id: 7,
    icon: <RiUserSettingsLine className="text-2xl" />,
    title: "Profile",
    href: "/admin",
  },
];
