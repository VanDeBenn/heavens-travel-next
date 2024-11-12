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

interface ComponentsProps {
  data: any;
}

export default function BlogList({ data }: ComponentsProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  useEffect(() => {
    if (data) {
      const generatedData: DataType[] = data.map((item: any) => ({
        key: item.id, // gunakan 'key' untuk antd table
        blogTitle: item.title,
        description: item.description,
        date: item.createdAt,
        imageUrl: "/images/illustration/hawaii.jpg",
      }));
      setDataSource(generatedData);
    }
  }, [data]);

  const handleMenuClick = (e: any, id: string) => {
    if (e.key === "1") {
      // console.log(`View details of blog ID: ${id}`);
    } else if (e.key === "2") {
      // console.log(`Delete blog ID: ${id}`);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Blog Title",
      dataIndex: "blogTitle",
      key: "blogTitle",
      align: "center",
      render: (text: string, record: DataType) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.imageUrl}
            alt="Blog Image"
            width={60}
            height={75}
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
    },
    {
      title: "",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleMenuClick(e, record.key)}>
              <Menu.Item key="1" icon={<InfoCircleOutlined />}>
                <Link href={`/admin/blog/detail/${record.key}`}>Detail</Link>
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
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-7 `}>
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-bold mb-2">Blog Listing</h2>
          <div className="flex gap-4">
            <Input
              className="w-64"
              prefix={<SearchOutlined />}
              placeholder="Search blog"
              value={searchValue}
              onChange={handleSearchChange}
            />

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

        <div className="flex items-center justify-between mt-4">
          <div>
            {showTotalEntries(filteredData.length, [startEntry, endEntry])}
          </div>
        </div>
      </div>
    </div>
  );
}
