// "use client";
// import { Input } from "antd";
// import React, { useState } from "react";
// import {
//   MoreOutlined,
//   InfoCircleOutlined,
//   BlockOutlined,
//   UnlockOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import {
//   largeMontserrat,
//   mediumMontserrat,
//   smallMontserrat,
// } from "#/app/components/user/myBooking";
// import Link from "next/link";
// export default function DestinationList() {
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(e.target.value);
//     setCurrentPage(1); // Reset to first page when search changes
//   };
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchValue, setSearchValue] = useState("");
//   return (
//     <div className="bg-white rounded-xl p-7">
//       <div
//         className={`${mediumMontserrat.className} flex items-center justify-between pb-4`}
//       >
//         <h2 className="text-xl font-bold mb-2">Destination Listing</h2>
//         <div className="flex gap-4">
//           <div>
//             <Input
//               className="w-64"
//               prefix={<SearchOutlined />}
//               placeholder="Search destination"
//               value={searchValue}
//               onChange={handleSearchChange}
//             />
//           </div>

//           <Link
//             href={"/"}
//             className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-RoyalAmethyst-700 text-center font-semibold
//            "
//           >
//             + Create Destination
//           </Link>
//         </div>
//       </div>

//     </div>
//   );
// }

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
import Image from "next/image"; // Import for displaying images
import { mediumMontserrat } from "../user/myBooking";

interface DataType {
  key: string;
  destinationName: string;
  address: string;
  rating: string;
  priceAdult: string;
  maxCapacity: string;
  imageUrl?: string;
}

const handleMenuClick = (e: any) => {
  console.log("Menu item clicked:", e);
};

const columns = [
  {
    title: "Destination Name",
    dataIndex: "destinationName",
    key: "destinationName",
    render: (text: string, record: DataType) => (
      <div className="flex items-center gap-3">
        {record.imageUrl ? (
          <Image
            src={record.imageUrl}
            alt="Destination Image"
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
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Price (Adult)",
    dataIndex: "priceAdult",
    key: "priceAdult",
    render: (price: number) => `$${price}`,
  },
  {
    title: "Max Capacity",
    dataIndex: "maxCapacity",
    key: "maxCapacity",
    render: (maxCapacity: number) => `${maxCapacity} persons`,
  },
  {
    title: "",
    key: "actions",
    render: (record: { id: string }) => (
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<InfoCircleOutlined />}>
              <Link href={`/admin/destinations/detail/${record.id}`}>
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
        <Button className="text-gray-500" icon={<MoreOutlined />} type="text" />
      </Dropdown>
    ),
  },
];

interface ComponentsProps {
  data: any;
}

export default function DestinationList({ data }: ComponentsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  // Mapping backend data into the expected structure
  const dataSource: DataType[] = data.map((item: any, index: number) => ({
    id: item.id || `${index}`,
    destinationName: item.name || `Destination ${index + 1}`,
    address: item.address || "Address not provided",
    rating: item.rating ? item.rating.toString() : "N/A",
    priceAdult: item.priceAdult || "N/A",
    maxCapacity: item.maxCapacity || "Unknown",
    imageUrl:
      item.photodestinations?.[0]?.url || "/images/illustration/hawaii.jpg", // Fallback to default image
  }));
  console.log("datasource:", dataSource);
  console.log("data:", data);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const filteredData = dataSource.filter(
    (item) =>
      item.destinationName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.address.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.rating.toLowerCase().includes(searchValue.toLowerCase())
  );

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
          <h2 className="text-xl font-bold mb-2">Destination Listing</h2>
          <div className="flex gap-4">
            <div>
              <Input
                className="w-64"
                prefix={<SearchOutlined />}
                placeholder="Search destination"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>

            <Link
              href={"/admin/destinations/create"}
              className="border-RoyalAmethyst-700 border-solid no-underline border hover:bg-RoyalAmethyst-700 transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-RoyalAmethyst-700 text-center font-semibold"
            >
              + Create Destination
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
