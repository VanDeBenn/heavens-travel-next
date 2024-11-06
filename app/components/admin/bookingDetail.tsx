"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import Image from "next/image";
import { ColumnsType } from "antd/es/table";
import { Montserrat } from "next/font/google";
import Link from "next/link";

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
  quantity: number;
  bookingDate: string;
  orderDate: string;
  total: number;
  imageUrl: string;
}

interface ComponentProps {
  data: any;
}

export default function BookingDetail({ data }: ComponentProps) {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    if (data?.bookingdetails) {
      const generatedData: DataType[] = data.bookingdetails.map((item: any) => {
        const { cart } = item;
        const { destination } = cart;

        const price =
          (destination?.priceAdult ?? 0) * cart.quantityAdult +
          (destination?.priceChildren ?? 0) * cart.quantityChildren;
        const quantity = 1;
        const total = price * quantity;

        return {
          key: item.id,
          name: destination?.name || "Unknown",
          price: price,
          category: destination ? "Destination" : "Hotel",
          guest: `${cart.quantityAdult} adults, ${cart.quantityChildren} children`,
          quantity: quantity,
          bookingDate: `${new Date(
            cart.startDate
          ).toLocaleDateString()} - ${new Date(
            cart.endDate
          ).toLocaleDateString()}`,
          orderDate: new Date(item.createdAt).toLocaleDateString(),
          total: total,
          imageUrl: "/images/illustration/hawaii.jpg",
        };
      });

      setDataSource(generatedData);
      const calculatedSubtotal = generatedData.reduce(
        (acc, item) => acc + item.total,
        0
      );
      setSubtotal(calculatedSubtotal);
    }
  }, [data]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Hotel Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text: string, record: DataType) => (
        <div className="flex items-center gap-3">
          <Image
            src={record.imageUrl}
            alt="Hotel Image"
            width={60}
            height={75}
            className="object-cover rounded-xl"
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Room Type",
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
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Booking Hotel Date",
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
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (total: number) => `Rp${total.toFixed(0)}`,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border`}
      >
        <div className="p-7 flex flex-col gap-2 pb-4 ">
          <span className="font-semibold text-lg">Booking #{data?.id}</span>
          <span className="font-semibold text-xs">
            Customer ID : {data?.user?.id}
          </span>
          <span className="font-semibold text-xs">
            Customer Name : {data?.user?.fullName}
          </span>
        </div>
        <div className="h-px bg-gray-300"></div>
        <div className="flex flex-col">
          <div className="py-7 px-5">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
          <div className="h-px bg-gray-300"></div>
          <div className="flex justify-between p-7">
            <span className="font-semibold text-sm">Subtotal</span>
            <span className="font-semibold text-sm">
              Rp{subtotal.toFixed(0)}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border w-2/3`}
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
              {data?.user?.fullName || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">Email</span>
            <span className="font-semibold text-sm text-black">
              {data?.user?.email || "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">
              Number Phone
            </span>
            <span className="font-semibold text-sm text-black">
              {data?.user?.phoneNumber || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border w-2/3`}
      >
        <div className="py-4 px-7">
          <span className="font-semibold text-sm">Booking Status</span>
        </div>
        <div className="h-px bg-gray-300"></div>

        <div className="py-4 px-7 flex flex-col gap-2">
          <span className="font-semibold text-sm">Fullfilment Status</span>
          <div className="bg-[#f9fac2] w-max px-5 py-2 rounded-xl">
            <span className="text-[#ee931f] text-sm">
              {data?.refund?.status || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-2/3">
        <Link
          href={"/admin/booking"}
          className="w-max bg-RoyalAmethyst-700 px-9 py-2 rounded-xl cursor-pointer"
        >
          <span className="text-white font-semibold">Back</span>
        </Link>
      </div>
    </div>
  );
}
