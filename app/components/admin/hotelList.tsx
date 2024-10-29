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

const HotelList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const generatedData: DataType[] = Array.from(
      { length: 20 },
      (_, index) => ({
        key: `${index + 1}`,
        hotelName: `Hotel ${index + 1}`,
        address: `Jl. Caman Raya No.${
          index + 1
        }, RT.013/RW.008, Jatibening Baru`,
        rating: Math.random() > 0.5 ? "4" : "5", // Random rating between 4 or 5
        totalRoom: `${Math.floor(Math.random() * 100) + 1}`, // Random total room number
        roomType: Math.random() > 0.5 ? "Deluxe" : "Standard", // Room type as Deluxe or Standard
        facility: ["WiFi", "Pool", "Gym"], // Example facilities
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
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "hotelName",
      align: "center",
      render: (text: string, record: DataType) => (
        <div className="flex items-center gap-3 justify-center">
          <Image
            src={record.imageUrl}
            alt="Hotel Image"
            width={60} // Image width 50px
            height={75} // Image height 75px
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
      align: "center",
      className: "text-center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (text: string) => (
        <div className="w-full flex justify-center items-center">
          <div className="w-[240px] whitespace-normal text-left	">{text}</div>
        </div>
      ),
    },
    {
      title: "Total Room",
      dataIndex: "totalRoom",
      key: "totalRoom",
      align: "center",
      className: "text-center",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
      align: "center",
      className: "text-center",
    },
    {
      title: "Facility",
      dataIndex: "facility",
      key: "facility",
      align: "center",
      className: "text-center",
      render: (facilityList: string[]) => (
        <div className="flex gap-2 flex-wrap justify-center">
          {facilityList.map((facility, index) => (
            <div
              key={index}
              className="bg-perfume-300 text-RoyalAmethyst-700 py-1 px-2 rounded-xl"
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
      align: "center",
      render: () => (
        <Dropdown
          overlay={
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1" icon={<InfoCircleOutlined />}>
                <Link href="/admin/hotels/detail">Detail</Link>
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

  const filteredData = dataSource.filter(
    (item) =>
      item.hotelName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.address.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.rating.toLowerCase().includes(searchValue.toLowerCase())
  );

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-7 ">
        <div className="flex items-center justify-between pb-4">
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
              href={"/admin/hotels/create"}
              className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-RoyalAmethyst-700 text-center font-semibold"
            >
              + Create Hotel
            </Link>
          </div>
        </div>

        <Table
          dataSource={filteredData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={columns} // no error here now
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
