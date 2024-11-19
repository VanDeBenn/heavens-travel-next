"use client";

import React, { useState } from "react";
import { Table, Dropdown, Menu, Button, Input } from "antd";
import {
  MoreOutlined,
  InfoCircleOutlined,
  BlockOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import Loading from "#/app/loading";
import { Destinations } from "#/app/types/Destinations";

interface ComponentsProps {
  data: Destinations[];
}

const DestinationList: React.FC<ComponentsProps> = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  if (!data) return <Loading />;

  const filteredData = data.filter((item) =>
    [item.name, item.address, item.rating?.toString() || ""].some((field) =>
      field.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  const columns = [
    {
      title: "Destination Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Destinations) => (
        <div className="flex items-center gap-3">
          {record.photodestinations ? (
            <Image
              src={`http://localhost:3222/photo-destinations/${record.photodestinations[0]?.pathPhoto}`}
              alt={`${record.name}`}
              width={60}
              height={75}
              className="object-cover rounded-xl"
            />
          ) : (
            <div className="w-15 h-15 bg-gray-200 rounded-xl flex items-center justify-center">
              No Image
            </div>
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: string) => address || "Address not provided",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number | undefined) =>
        rating ? rating.toFixed(1) : "N/A",
    },
    {
      title: "Price (Adult)",
      dataIndex: "priceAdult",
      key: "priceAdult",
      render: (price: number | undefined) =>
        price !== undefined ? `$${price}` : "N/A",
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
      render: (capacity: number | undefined) =>
        capacity ? `${capacity} persons` : "Unknown",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Destinations) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="detail" icon={<InfoCircleOutlined />}>
                <Link href={`/admin/destinations/detail/${record.id}`}>
                  Detail
                </Link>
              </Menu.Item>
              <Menu.Item key="delete" icon={<BlockOutlined />}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-7">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-xl font-bold">Destination Listing</h2>
          <div className="flex gap-4">
            <Input
              className="w-64"
              prefix={<SearchOutlined />}
              placeholder="Search destination"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Link
              href="/admin/destinations/create"
              className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-RoyalAmethyst-700 text-center font-semibold"
            >
              + Create Destination
            </Link>
          </div>
        </div>
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize }}
        />
      </div>
    </div>
  );
};

export default DestinationList;
