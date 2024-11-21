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
import { Users } from "#/app/types/Users";
import Loading from "#/app/loading";

const handleMenuClick = (e: any) => {
  // console.log("Menu item clicked:", e);
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
    title: "Birth Date",
    dataIndex: "birthDate",
    key: "birthDate",
    render: (birthDate: string | null) => (birthDate ? birthDate : "N/A"),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: { name: string }) => role.name,
  },
  {
    title: "Joined",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
  },
  {
    title: "",
    key: "actions",
    render: (record: { id: string }) => (
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<InfoCircleOutlined />}>
              <Link href={`/admin/users/detail/${record.id}`}>Detail User</Link>
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

interface ComponentProps {
  data: Users[];
}

export default function UserList({ data }: ComponentProps) {
  if (!data.length) {
    return <Loading />;
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  // Filtered data based on the search value
  const filteredData = data.filter(
    (item: any) =>
      (item.fullName?.toLowerCase() || "").includes(
        searchValue.toLowerCase()
      ) ||
      (item.email?.toLowerCase() || "").includes(searchValue.toLowerCase()) ||
      (item.phoneNumber?.toLowerCase() || "").includes(
        searchValue.toLowerCase()
      )
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
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
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
}
