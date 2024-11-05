"use client";
import React, { useEffect, useState } from "react";
import { Table, Input, Form } from "antd";
import Image from "next/image";
import { ColumnsType } from "antd/es/table";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { RefundRepository } from "#/repository/refund";

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
  name: string;
  price: number;
  category: string;
  guest: string;
  qtyRoom: number;
  bookingDate: string;
  orderDate: string;
  total: number;
  imageUrl: string;
}

interface ComponentsProps {
  data: any;
}

export default function RefundDetail({ data }: ComponentsProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useEffect(() => {
    if (data?.booking?.bookingdetails) {
      const generatedData = data.booking.bookingdetails.map((item: any) => {
        const { cart } = item;
        const { destination, roomHotel } = cart;

        const price = Math.random() * 1000000;
        const qtyRoom = Math.floor(Math.random() * 3) + 1;
        const total = price * qtyRoom;

        return {
          key: item.id,
          name: destination?.name || roomHotel?.name,
          price,
          category: destination ? "Destination" : "Hotel",
          guest: "2 adults, 2 children",
          qtyRoom,
          bookingDate: "23/04/2019 - 27/04/2019",
          orderDate: "20/04/2019",
          total,
          imageUrl: "/images/illustration/hawaii.jpg",
        };
      });
      setDataSource(generatedData);
    }
  }, [data]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text: string, record: DataType) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.imageUrl}
            alt="Product Image"
            width={60}
            height={75}
            className="object-cover rounded-xl"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price: number) => `Rp${price.toFixed(0)}`,
    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "qtyRoom",
      key: "qtyRoom",
      align: "center",
    },
    {
      title: "Booking Product Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      align: "center",
    },
    {
      title: "Date of Order",
      dataIndex: "orderDate",
      key: "orderDate",
      align: "center",
    },
    // {
    //   title: "Fullfilment Status",
    //   dataIndex: "fulfillmentStatus",
    //   key: "fulfillmentStatus",
    //   align: "center",
    //   render: (status: string) => {
    //     const bgColor = status === "Cancel" ? "bg-[#f6c1bb]" : "bg-[#f9fac2]";
    //     const textColor =
    //       status === "Cancel" ? "text-[#e95555]" : "text-[#ee931f]";

    //     return (
    //       <span className={`px-3 py-1 rounded-full ${bgColor} ${textColor}`}>
    //         {status}
    //       </span>
    //     );
    //   },
    // },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (total: number) => `Rp${total.toFixed(0)}`,
    },
  ];

  const handleApprove = async (values: any) => {
    const dataRefund = {
      refundId: data?.id,
      status: values.approve,
      bookingId: data?.booking?.id,
    };
    const req = await RefundRepository.api.updateRefund(data?.id, dataRefund);
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border`}
      >
        <div className="p-7 flex flex-col gap-2 pb-4">
          <span className="font-semibold text-lg">Refund ID {data?.id}</span>
          <span className="font-semibold text-xs">
            Booking ID: {data?.booking?.id}
          </span>
          <span className="font-semibold text-xs">
            Customer ID: {data?.booking?.user?.id}
          </span>
          <span className="font-semibold text-xs">
            Customer Name: {data?.booking?.user?.fullName}
          </span>
        </div>
        <div className="h-px bg-gray-300"></div>
        <div className="py-7 px-5">
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </div>

      {/* Guest Details */}
      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border w-full`}
      >
        <div className="py-4 px-7">
          <span className="font-semibold text-sm">Guest Detail</span>
        </div>
        <div className="h-px bg-gray-300"></div>
        <div className="py-7 px-10 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">
              Full Name
            </span>
            <span className="font-semibold text-sm text-black">
              {data?.booking?.user?.fullName}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">Email</span>
            <span className="font-semibold text-sm text-black">
              {data?.booking?.user?.email}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">
              Number Phone
            </span>
            <span className="font-semibold text-sm text-black">
              {data?.booking?.user?.phoneNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Bank Details Form */}
      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border w-full`}
      >
        <div className="py-4 px-7">
          <span className="font-semibold text-sm">Guest Refund Bank</span>
        </div>
        <div className="h-px bg-gray-300"></div>
        {/* <div className="py-7 px-10">
          <Form layout="vertical">
            <div className="flex justify-between items-center gap-3">
              <div className="w-full">
                <Form.Item
                  label="Name of Bank"
                  name="bankName"
                  rules={[
                    { required: true, message: "Please enter the bank name" },
                  ]}
                >
                  <Input placeholder="Enter bank name" />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item
                  label="Bank Account Number"
                  name="accountNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the account number",
                    },
                  ]}
                >
                  <Input placeholder="Enter account number" />
                </Form.Item>
              </div>

              <div className="w-full">
                <Form.Item
                  label="Account Holder"
                  name="accountHolder"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the account holder's name",
                    },
                  ]}
                >
                  <Input placeholder="Enter account holder's name" />
                </Form.Item>
              </div>
            </div>
            <div className="w-full">
              <Form.Item
                label="Refund Reason"
                name="refundreason"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Refund Reason",
                  },
                ]}
              >
                <Input placeholder="Enter Refund Reason" />
              </Form.Item>
            </div>
          </Form>
        </div> */}

        <div className="h-px bg-gray-300"></div>
        <div className="pt-4 px-7">
          <span className="font-semibold text-sm">Refund Details</span>
        </div>
        <div className="py-4  px-10 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">
              Total Atlas Concorde (2 Room)
            </span>
            <span className="font-semibold text-sm text-black">
              {/* Rp{atlasTotal.toFixed(0)} */}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">
              Total Penida Island (2 Ticket)
            </span>
            <span className="font-semibold text-sm text-black">
              {/* Rp{penidaTotal.toFixed(0)} */}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">
              Amounts are subject to change according to refund policies and
              other additionak fees.
            </span>
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold"> Total Refunds</span>
            <span className="text-sm font-semibold text-InfernoEcho-500">
              {/* Rp{totalRefund.toFixed(0)} */}
            </span>
          </div>
        </div>
        <div className="h-px bg-gray-300"></div>
        <div className="flex justify-between items-center px-7 py-6">
          <Link
            href={"/admin/refund/"}
            className="cursor-pointer border-solid border-RoyalAmethyst-700 border px-7 py-2 rounded-xl no-underline"
          >
            <span className="text-xs text-RoyalAmethyst-700">Return</span>
          </Link>

          <div className="flex gap-3 items-center">
            <div className="cursor-pointer  bg-InfernoEcho-600   px-7 py-2 rounded-xl">
              <span className="text-xs text-white">Reject Refund</span>
            </div>
            <div className="cursor-pointer   bg-RoyalAmethyst-700 border px-7 py-2 rounded-xl">
              <span className="text-xs text-white">Approve Refund</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
