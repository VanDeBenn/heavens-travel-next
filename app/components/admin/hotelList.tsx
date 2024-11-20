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
import { ColumnsType } from "antd/es/table";
import Loading from "#/app/loading";

interface ComponentProps {
  data: any;
}

export default function HotelList({ data }: ComponentProps) {
  if (!data) {
    return <Loading />;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  const handleMenuClick = (e: any) => {};

  const columns: ColumnsType<Hotels> = [
    {
      title: "Hotel Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text: string, record: Hotels) => (
        <div className="flex items-center gap-3">
          <Image
            src={`http://localhost:3222/photo-hotels/${record.photohotels[0]?.pathPhoto}`}
            alt={record.name}
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
          <div className="w-[240px] whitespace-normal text-left">{text}</div>
        </div>
      ),
    },
    {
      title: "Total Room",
      dataIndex: "roomhotels",
      key: "totalRoom",
      align: "center",
      className: "text-center",
      render: (roomhotels: any[]) => roomhotels.length,
    },
    // {
    //   title: "Room Type",
    //   dataIndex: "roomType",
    //   key: "roomType",
    //   align: "center",
    //   className: "text-center",
    // },
    {
      title: "Facility",
      dataIndex: "facility",
      key: "facility",
      align: "center",
      className: "text-center",
      render: (facilityList: string[]) => (
        <div className="flex gap-2 flex-wrap justify-center">
          {/* {facilityList.map((facility, index) => (
            <div
              key={index}
              className="bg-Perfume-300 text-RoyalAmethyst-700 py-1 px-2 rounded-xl"
            >
              {facility}
            </div>
          ))} */}
        </div>
      ),
    },
    {
      title: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="1" icon={<InfoCircleOutlined />}>
                <Link href={`/admin/hotels/detail/${record.id}`}>Detail</Link>
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

  const filteredData = data.filter(
    (item: Hotels) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.address.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.rating.toString().includes(searchValue.toLowerCase())
  );

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
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
}
