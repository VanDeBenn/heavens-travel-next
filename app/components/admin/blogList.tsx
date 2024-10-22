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

import { Montserrat } from "next/font/google";

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

interface DataType {
  key: string;
  blogTitle: string;
  description: string;
  date: string;
  imageUrl: string;
}

const BlogList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const generatedData: DataType[] = Array.from(
      { length: 20 },
      (_, index) => ({
        key: `${index + 1}`,
        blogTitle: `Blog Title ${index + 1}`,
        description: `This is a sample description for blog number ${
          index + 1
        }.`,
        date: `20/12/${2019 + (index % 3)}`, // Random dates between 2019-2021
        imageUrl: "/images/illustration/hawaii.jpg", // Placeholder image URL
      })
    );

    setDataSource(generatedData);
  }, []);

  const handleMenuClick = (e: any) => {
    console.log("Menu item clicked:", e);
  };

  // Define the columns with the correct type ColumnsType<DataType>
  const columns: ColumnsType<DataType> = [
    {
      title: "Blog Title",
      dataIndex: "blogTitle",
      key: "blogTitle",
      align: "center",
      render: (text: string, record: DataType) => (
        <div className="flex items-center gap-3 justify-center">
          <Image
            src={record.imageUrl}
            alt="Blog Image"
            width={60} // Image width 50px
            height={75} // Image height 75px
            className="object-cover rounded-xl"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      render: (text: string) => (
        <div className="w-full flex justify-center items-center">
          <div className="w-[500px] whitespace-normal text-left">{text}</div>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      className: "text-center",
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
                <Link href="/admin/blog/detail">Detail</Link>
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
      item.blogTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.date.toLowerCase().includes(searchValue.toLowerCase())
  );

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className={`${mediumMontserrat.className} p-7 `}>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-bold mb-2">Blog Listing</h2>
          <div className="flex gap-4">
            <div>
              <Input
                className="w-64"
                prefix={<SearchOutlined />}
                placeholder="Search blog"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>

            <Link
              href={"/admin/blog/create"}
              className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-RoyalAmethyst-700 text-center font-semibold"
            >
              + Create Blog
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
};

export default BlogList;
