"use client";

import React, { useState } from "react";
import { Table, Dropdown, Menu, Button, Input } from "antd";
import {
  MoreOutlined,
  InfoCircleOutlined,
  BlockOutlined,
  UnlockOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image"; // Import untuk menampilkan gambar
import { mediumMontserrat } from "../user/myBooking";

interface DataType {
  key: string;
  hotelName: string;
  address: string;
  rating: string;
  totalRoom: string;
  roomType: string;
  facility: string[];
  imageUrl: string;
}

// Data yang sudah diperbaiki
const dataSource: DataType[] = Array.from({ length: 20 }, (_, index) => ({
  key: `${index + 1}`,
  hotelName: `Hotel ${index + 1}`,
  address: `Jl. Caman Raya No.${index + 1}, RT.013/RW.008, Jatibening Baru`,
  rating: Math.random() > 0.5 ? "4" : "5", // Rating hanya 4 atau 5
  totalRoom: `${Math.floor(Math.random() * 100) + 1}`, // Total Room dalam format angka
  roomType: Math.random() > 0.5 ? "Deluxe" : "Standard", // Room Type berupa Deluxe atau Standard
  facility: ["WiFi", "Pool", "Gym", "Pool", "Gym", "Pool", "Gym"], // Fasilitas di sini dalam bentuk array
  imageUrl: "/images/illustration/hawaii.jpg", // URL dummy untuk semua gambar
}));

const handleMenuClick = (e: any) => {
  console.log("Menu item clicked:", e);
};

const columns = [
  {
    title: "Hotel Name",
    dataIndex: "hotelName",
    key: "hotelName",
    render: (text: string, record: DataType) => (
      <div className="flex items-center gap-3 justify-center"> {/* Menambahkan justify-center */}
        <Image
          src={record.imageUrl}
          alt="Hotel Image"
          width={60}
          height={75}
          className="object-cover rounded-xl"
        />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    className: "text-center", // Menambahkan text-center
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    className: "text-center", // Menambahkan text-center
    render: (text: string) => (
      <div className="w-[240px] whitespace-normal text-center">{text}</div> // Menambahkan text-center pada div juga
    ),
  },
  {
    title: "Total Room",
    dataIndex: "totalRoom",
    key: "totalRoom",
    className: "text-center", // Menambahkan text-center
  },
  {
    title: "Room Type",
    dataIndex: "roomType",
    key: "roomType",
    className: "text-center", // Menambahkan text-center
  },
  {
    title: "Facility",
    dataIndex: "facility",
    key: "facility",
    className: "text-center", // Menambahkan text-center
    render: (facilityList: string[]) => (
      <div className="flex gap-2 flex-wrap justify-center"> {/* Menambahkan justify-center */}
        {facilityList.map((facility, index) => (
          <div
            key={index}
            className="bg-[#cabff4] text-[#4F28D9] py-1 px-2 rounded-xl"
          >
            {facility}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "",
    key: "actions",
    render: () => (
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<InfoCircleOutlined />}>
              <Link href="/admin/destinations/detail">Detail</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<BlockOutlined />}>
              Delete
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Button className="text-gray-500" icon={<MoreOutlined />} type="text" />
      </Dropdown>
    ),
  },
];


const HotelList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  // Filtered data based on the search value
  const filteredData = dataSource.filter(
    (item) =>
      item.hotelName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.address.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.rating.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const showTotalEntries = (total: number, range: [number, number]) => {
    return `Showing ${range[0]} to ${range[1]} of ${total} entries`;
  };

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-7 ">
        <div
          className={`${mediumMontserrat.className} flex items-center justify-between pb-4`}
        >
          <h2 className="text-xl font-bold mb-2">Hotel Listing</h2>
          <div className="flex gap-4">
            <div>
              <Input
                className="w-64"
                prefix={<SearchOutlined />}
                placeholder="Search hotel"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>

            <Link
              href={"/admin/destinations/create"}
              className="border-[#4F28D9] border-solid no-underline border hover:bg-[#4F28D9] transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-[#4F28D9] text-center font-semibold
           "
            >
              + Create Hotel
            </Link>
          </div>
        </div>

        {/* Table and pagination container with justify-between */}
        <Table
          dataSource={filteredData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize,
            total: filteredData.length,
            onChange: handlePageChange,
            showSizeChanger: false,
          }}
        />

        <div className="flex items-center justify-between">
          <div>
            {showTotalEntries(filteredData.length, [startEntry, endEntry])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
