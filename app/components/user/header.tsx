"use client";

import Link from "next/link";
import { Layout, Menu } from "antd";
// Import dari next/router
import { useRouter } from "next/navigation";
import {
  HomeOutlined,
  InfoCircleOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
  const { pathname } = useRouter();

  // Determine the active menu item based on the current path
  const getMenuKey = () => {
    switch (pathname) {
      case "/":
        return "home";
      case "/hotel":
        return "hotel";
      case "/destination":
        return "destination";
      case "/blog":
        return "blog";
      default:
        return "";
    }
  };

  const activeMenuKey = getMenuKey();

  return (
    <Header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between container mx-auto">
        {/* Logo or App Name */}
        <Link href={"/"} className=" w-32">
              <Image
                src="/images/icon/icon-lanscape-black.png"
                alt="logo"
                width={100}
                height={80}
                className="w-full h-9"
          />
        </Link>
        {/* Menu Items */}
        <Menu
          mode="horizontal"
          selectedKeys={[activeMenuKey]}
          className="flex space-x-4"
        >
          <Menu.Item key="home">
            <Link href="/" className="text-black font-semibold">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="hotel">
            <Link href="/hotel" className="text-black font-semibold">Hotel</Link>
          </Menu.Item>
          <Menu.Item key="destination">
            <Link href="/destination" className="text-black font-semibold">Destination</Link>
          </Menu.Item>
          <Menu.Item key="blog">
            <Link href="/blog" className="text-black font-semibold">Blog</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default HeaderComponent;
