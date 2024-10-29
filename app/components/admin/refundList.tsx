"use client";
import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import Link from "next/link";

interface DataType {
  key: string;
  refundId: string;
  bookingId: string;
  customer: string;
  total: string;
  qtyRoom: string;
  fulfillmentStatus: string;
  dateOfOrder: string;
}

const RefundList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  useEffect(() => {
    const generatedData: DataType[] = Array.from(
      { length: 20 },
      (_, index) => ({
        key: `${index + 1}`,
        refundId: `RFD${index + 1}`, // Generate refund ID
        bookingId: `#${index + 1}`,
        customer: `Sumanto Susanto Shiuun ${index + 1}`,
        total: `Rp${(Math.random() * 1000000 + 100000).toFixed(0)}`,
        qtyRoom: `${Math.random() > 0.5 ? 1 : 2}`,
        fulfillmentStatus: ["Cancel", "Refund Request", "Refunded"][
          Math.floor(Math.random() * 3)
        ],
        dateOfOrder: `${(Math.floor(Math.random() * 28) + 1)
          .toString()
          .padStart(2, "0")}/02/2023`, // Example date
      })
    );

    setDataSource(generatedData);
  }, []);

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
      item.refundId.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.bookingId.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.total.toLowerCase().includes(searchValue.toLowerCase())
  );

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, filteredData.length);

  const columns: ColumnsType<DataType> = [
    {
      title: "Refund ID",
      dataIndex: "refundId",
      key: "refundId",
      align: "center",
    },
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
      render: (text: string) => `Rp${Number(text).toLocaleString("id-ID")}`,
    },
    {
      title: "Qty Room",
      dataIndex: "qtyRoom",
      key: "qtyRoom",
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
      title: "Date of Order",
      dataIndex: "dateOfOrder",
      key: "dateOfOrder",
      align: "center",
    },
    {
      title: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Link href={"/admin/refund/detail"}>Detail</Link>
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
    console.log(`Delete booking ID: ${bookingId}`);
    setDataSource((prevData) =>
      prevData.filter((item) => item.bookingId !== bookingId)
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
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
};

export default RefundList;






