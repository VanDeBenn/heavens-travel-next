"use client";
import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button, Input } from "antd";
import { ColumnsType } from "antd/es/table"; // Import the ColumnsType
import { EllipsisOutlined } from "@ant-design/icons"; // Import icon untuk titik tiga
import Link from "next/link";

interface DataType {
  key: string;
  bookingId: string;
  customer: string;
  total: string;
  quantity: string;
  fulfillmentStatus: string;
  dateOfOrder: string;
}

interface ComponentProps {
  data: any;
}

export default function BookingList({ data }: ComponentProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  // console.log("data: ", data);

  useEffect(() => {
    if (Array.isArray(data)) {
      // Pastikan data adalah array
      const generatedData: DataType[] = data.map((item: any) => ({
        key: item.id,
        bookingId: item.id,
        customer: item?.user?.fullName || "Unknown Customer", // Jika user kosong
        total: item?.payment?.amount ? item.payment.amount.toString() : "0", // Jika payment kosong
        quantity: `${Math.random() > 0.5 ? 1 : 2}`, // Random qty room number
        fulfillmentStatus: ["Cancel", "Refund Request", "Refunded"][
          Math.floor(Math.random() * 3)
        ],
        dateOfOrder: `${(Math.floor(Math.random() * 28) + 1)
          .toString()
          .padStart(2, "0")}/02/2023`, // Example date
      }));

      setDataSource(generatedData);
    } else {
      console.error("Data is not an array:", data);
    }
  }, [data]);

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
      item.bookingId.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.total.toLowerCase().includes(searchValue.toLowerCase())
  );

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  // Define the columns with the correct type ColumnsType<DataType>
  const columns: ColumnsType<DataType> = [
    {
      title: "Booking ID",
      dataIndex: "bookingId",
      key: "bookingId",
      align: "center",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      align: "center",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (text: string) => `Rp${Number(text).toLocaleString("id-ID")}`, // Format Rp
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Fulfillment Status",
      dataIndex: "fulfillmentStatus",
      key: "fulfillmentStatus",
      align: "center",
      render: (status: string) => {
        let bgColor = "";
        let textColor = "";

        // Set styles based on the status value
        if (status === "Cancel") {
          bgColor = "bg-[#f6c1bb]";
          textColor = "text-[#e95555]";
        } else if (status === "Refund Request") {
          bgColor = "bg-[#f9fac2]";
          textColor = "text-[#ee931f]";
        } else if (status === "Refunded") {
          bgColor = "bg-[#f6c1bb]";
          textColor = "text-[#e95555]";
        }

        return (
          <span className={`px-3 py-1 rounded-full ${bgColor} ${textColor}`}>
            {status}
          </span>
        );
      },
    },
    {
      title: "", // Kolom kosong tanpa title
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Link href={`/admin/booking/detail/${record.key}`}>Detail</Link>
              </Menu.Item>
              <Menu.Item onClick={() => handleDelete(record.bookingId)}>
                Delete
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button icon={<EllipsisOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const handleDelete = (bookingId: string) => {
    // Logic untuk menghapus booking
    // console.log(`Delete booking ID: ${bookingId}`);
    setDataSource((prevData) =>
      prevData.filter((item) => item.bookingId !== bookingId)
    );
  };

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className="p-7">
        <Input.Search
          placeholder="Search..."
          value={searchValue}
          onChange={handleSearchChange}
          style={{ marginBottom: 16 }}
        />
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
