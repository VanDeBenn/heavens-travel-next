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

interface DataType {
  key: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthdate: string;
  country: string;
  joined: string;
  blockDate?: string;
}

// Example data coy
const dataSource: DataType[] = Array.from({ length: 20 }, (_, index) => ({
  key: `${index + 1}`,
  fullName: `User ${index + 1}`,
  email: `user${index + 1}@example.com`,
  phoneNumber: `+1 123 456 ${String(index + 1).padStart(3, "0")}`,
  gender: index % 2 === 0 ? "Male" : "Female",
  birthdate: `199${index % 10}-01-01`,
  country: index % 2 === 0 ? "USA" : "UK",
  joined: `202${index % 10}-05-15`,
  blockDate:
    index % 2 === 0
      ? `2024-07-${String(index + 1).padStart(2, "0")}`
      : undefined,
}));

const handleMenuClick = (e: any) => {
  console.log("Menu item clicked:", e);
};

const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Birthdate",
    dataIndex: "birthdate",
    key: "birthdate",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Joined",
    dataIndex: "joined",
    key: "joined",
  },
  {
    title: "Block Date",
    dataIndex: "blockDate",
    key: "blockDate",
    render: (blockDate: string) => (blockDate ? blockDate : "N/A"),
  },
  {
    title: "",
    key: "actions",
    render: () => (
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<InfoCircleOutlined />}>
              <Link href="/admin/users/detail">Detail User</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<BlockOutlined />}>
              Block User
            </Menu.Item>
            <Menu.Item key="3" icon={<UnlockOutlined />}>
              Unblock User
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

const UserList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  // Filtered data based on the search value
  const filteredData = dataSource.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phoneNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.country.toLowerCase().includes(searchValue.toLowerCase())
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
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-bold mb-2">User Listing</h2>
          <Input
            className="w-64"
            prefix={<SearchOutlined />}
            placeholder="Search user"
            value={searchValue}
            onChange={handleSearchChange}
          />
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

export default UserList;
