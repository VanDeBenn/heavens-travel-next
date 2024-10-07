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
//             className="border-[#4F28D9] border-solid no-underline border hover:bg-[#4F28D9] transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-[#4F28D9] text-center font-semibold
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
  UnlockOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { mediumMontserrat } from "../user/myBooking";

interface DataType {
  key: string;
  destinationName: string;
  address: string;
  rating: string;
  price: string;
  max: string;
}

// Data yang sudah diperbaiki
const dataSource: DataType[] = Array.from({ length: 20 }, (_, index) => ({
  key: `${index + 1}`,
  destinationName: `Destination ${index + 1}`,
  address: `Address ${index + 1}, City, Country`,
  rating: Math.random() > 0.5 ? "4" : "5", // Rating hanya 4 atau 5
  price: `$${(Math.random() * 500 + 50).toFixed(2)}`, // Price berupa angka dengan format dollar
  max: `${Math.floor(Math.random() * 100) + 1}`, // Max capacity dalam format "X persons"
}));

const handleMenuClick = (e: any) => {
  console.log("Menu item clicked:", e);
};

const columns = [
  {
    title: "Destination Name",
    dataIndex: "destinationName",
    key: "destinationName",
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
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Max Capacity/Book",
    dataIndex: "max",
    key: "max",
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

const DestinationList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  // Filtered data based on the search value
  const filteredData = dataSource.filter(
    (item) =>
      item.destinationName.toLowerCase().includes(searchValue.toLowerCase()) ||
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
              href={"/"}
              className="border-[#4F28D9] border-solid no-underline border hover:bg-[#4F28D9] transition-all duration-300 hover:text-white text-sm rounded-md py-1 px-16 text-[#4F28D9] text-center font-semibold
           "
            >
              + Create Destination
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

export default DestinationList;
