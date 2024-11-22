"use client";
import React, { useEffect, useState } from "react";
import { Table, Dropdown, Menu, Button, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { EllipsisOutlined } from "@ant-design/icons";
import Link from "next/link";
import { RefundRepository } from "#/repository/refund";

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
  const [dataRefund, setDataRefund] = useState<any[]>([]);

  // Fungsi untuk mengambil semua refund
  const getAllRefund = async () => {
    const res = await RefundRepository.api.getRefunds();
    setDataRefund(res.data || []); // simpan data
  };

  useEffect(() => {
    getAllRefund();
  }, []);

  useEffect(() => {
    // Periksa jika dataRefund tidak kosong
    if (dataRefund.length > 0) {
      const generatedData: DataType[] = dataRefund.map((item: any) => ({
        key: item.id,
        refundId: item.id, // Generate refund ID
        bookingId: item.booking?.id || "N/A",
        customer: item.booking?.customerName || "N/A",
        total: item?.booking?.payment?.amount,
        qtyRoom: item.quantity ? item.quantity.toString() : 0,
        fulfillmentStatus: item.status,
        dateOfOrder: new Date(item.createdAt || Date.now()).toLocaleDateString(
          "id-ID",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        ),
      }));
      setDataSource(generatedData);
    }
  }, [dataRefund]);
  // console.log(dataRefund[0]?.booking?.payment?.amount);

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
    // {
    //   title: "Qty",
    //   dataIndex: "qtyRoom",
    //   key: "qtyRoom",
    //   align: "center",
    // },
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
                <Link href={`/admin/refund/detail/${record.refundId}`}>
                  Detail
                </Link>
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
};

export default RefundList;
