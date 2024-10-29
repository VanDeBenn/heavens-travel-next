"use client";
import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button, Input } from "antd";
import {
  MoreOutlined,
  InfoCircleOutlined,
  BlockOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { ColumnsType } from "antd/es/table"; // Import the ColumnsType
import { mediumMontserrat } from "../user/myBooking";

interface DataType {
  key: string;
  photoRoom: string; // Changed from hotelName to photoRoom
  roomType: string; // Room type (Standard Room, Deluxe Room)
  typeBed: string; // Type of bed (e.g., 1 Single Bed)
  noOfGuest: string; // Number of guests (e.g., 2 Adults and 2 Children)
  numberRoom: string; // Number of rooms
  amenities: string[]; // Amenities available in the room
  imageUrl: string; // Image URL for the room
}

const RoomList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const generatedData: DataType[] = Array.from(
      { length: 20 },
      (_, index) => ({
        key: `${index + 1}`,
        photoRoom: "", // Only image, no text
        roomType: Math.random() > 0.5 ? "Standard Room" : "Deluxe Room", // Random room type
        typeBed: `${Math.floor(Math.random() * 3) + 1} Single Bed`, // Random type bed
        noOfGuest: `${
          Math.floor(Math.random() * 3) + 1
        } Adults and ${Math.floor(Math.random() * 3)} Children`, // Random guest numbers
        numberRoom: `${Math.floor(Math.random() * 10) + 1}`, // Random number of rooms
        amenities: ["WiFi", "Pool", "Gym"], // Example amenities
        imageUrl: "/images/illustration/hawaii.jpg", // Placeholder image URL
      })
    );

    setDataSource(generatedData);
  }, []);

  const handleMenuClick = (e: any) => {
    // console.log("Menu item clicked:", e);
  };

  // Define the columns with the correct type ColumnsType<DataType>
  const columns: ColumnsType<DataType> = [
    {
      title: "Photo Room",
      dataIndex: "photoRoom",
      key: "photoRoom",
      align: "center",
      render: (text: string, record: DataType) => (
        <div className="flex items-center gap-3 justify-center">
          <Image
            src={record.imageUrl}
            alt="Room Image"
            width={135}
            height={75}
            className="object-cover rounded-xl"
          />
        </div>
      ),
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
      align: "center",
      className: "text-center",
    },
    {
      title: "Type Bed",
      dataIndex: "typeBed",
      key: "typeBed",
      align: "center",
      render: (text: string) => (
        <div className="w-full flex justify-center items-center">
          <div className="w-40 whitespace-normal text-center">{text}</div>
        </div>
      ),
    },
    {
      title: "No Of Guest",
      dataIndex: "noOfGuest",
      key: "noOfGuest",
      align: "center",
      className: "text-center",
    },
    {
      title: "Number Room",
      dataIndex: "numberRoom",
      key: "numberRoom",
      align: "center",
      className: "text-center",
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      key: "amenities",
      align: "center",
      className: "text-center",
      render: (amenitiesList: string[]) => (
        <div className="flex justify-center ">
          <div className="flex gap-2 flex-wrap justify-center w-52">
            {amenitiesList.map((amenity, index) => (
              <div
                key={index}
                className="bg-perfume-300 text-RoyalAmethyst-700 py-1 px-2 rounded-xl "
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "",
      key: "actions",
      align: "center",
      render: () => (
        <Dropdown
          overlay={
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1" icon={<InfoCircleOutlined />}>
                <Link href={"/admin/hotels/detail/room-list/detail"}>
                  Detail
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<BlockOutlined />}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button
            className="text-gray-500"
            icon={<MoreOutlined />}
            type="text"
          />
        </Dropdown>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const showTotalEntries = (total: number, range: [number, number]) => {
    return `Showing ${range[0]} to ${range[1]} of ${total} entries`;
  };

  const filteredData = dataSource.filter((item) =>
    item.roomType.toLowerCase().includes(searchValue.toLowerCase())
  );

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  return (
    <>
      <div
        className={`${mediumMontserrat.className} flex items-center gap-2 mb-5`}
      >
        <Link
          href={"/admin/hotels/"}
          className="no-underline text-black text-sm"
        >
          Hotel
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/"}
          className="no-underline text-black text-sm"
        >
          Detail
        </Link>
        <span>/</span>
        <Link
          href={"/admin/hotels/detail/room-list"}
          className="no-underline text-black text-sm"
        >
          Room Listing
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-md">
        <div className="p-7">
          <div
            className={`${mediumMontserrat.className} flex items-center justify-between pb-4`}
          >
            <span className="text-xl font-bold mb-2">Room Listing</span>
            <div className="flex gap-4">
              <div>
                <Input
                  className="w-64"
                  prefix={<SearchOutlined />}
                  placeholder="Search Room Type"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>

              <Link
                href={"/admin/hotels/detail/room-list/create"}
                className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-RoyalAmethyst-700 text-center font-semibold"
              >
                + Create Listing
              </Link>
            </div>
          </div>

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
      </div>{" "}
    </>
  );
};

export default RoomList;
