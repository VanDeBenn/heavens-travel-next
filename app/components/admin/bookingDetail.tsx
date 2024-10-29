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
  hotelName: string;
  price: number; // Change to number for calculation
  roomType: string;
  guest: string;
  qtyRoom: number; // Change to number for calculation
  bookingDate: string;
  orderDate: string;
  fulfillmentStatus: string;
  total: number; // Change to number for calculation
  imageUrl: string;
}

const BookingDetail: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0); // State for subtotal

  useEffect(() => {
    const generatedData: DataType[] = Array.from(
      { length: 2 }, // Limit data generation to 2 items
      (_, index) => {
        const price = Math.random() * 1000000; // Random price
        const qtyRoom = Math.floor(Math.random() * 3) + 1; // Random quantity of rooms
        const total = price * qtyRoom; // Calculate total

        return {
          key: `${index + 1}`,
          hotelName: `Hotel ${index + 1}`,
          price: price, // Store as number
          roomType: Math.random() > 0.5 ? "Superior King" : "Deluxe Twin",
          guest: "2 adults, 2 children",
          qtyRoom: qtyRoom, // Store as number
          bookingDate: "23/04/2019 - 27/04/2019",
          orderDate: "20/04/2019",
          fulfillmentStatus: Math.random() > 0.5 ? "Refund Request" : "Cancel",
          total: total, // Store as number
          imageUrl: "/images/illustration/hawaii.jpg",
        };
      }
    );

    setDataSource(generatedData);
    // Calculate subtotal
    const calculatedSubtotal = generatedData.reduce(
      (acc, item) => acc + item.total,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Hotel Name",
      dataIndex: "hotelName",
      key: "hotelName",
      align: "center",
      render: (text: string, record: DataType) => (
        <div className="flex items-center gap-3 justify-center">
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
      dataIndex: "roomType",
      key: "roomType",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price: number) => `Rp${price.toFixed(0)}`, // Format price
    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
      align: "center",
    },
    {
      title: "Qty Room",
      dataIndex: "qtyRoom",
      key: "qtyRoom",
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
      title: "Fullfilment Status",
      dataIndex: "fulfillmentStatus",
      key: "fulfillmentStatus ",
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
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (total: number) => `Rp${total.toFixed(0)}`, // Format total
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border`}
      >
        <div className="p-7 flex flex-col gap-2 pb-4 ">
          <span className="font-semibold text-lg">Booking #3</span>
          <span className="font-semibold text-xs">Customer ID : 1</span>
          <span className="font-semibold text-xs">
            Customer Name : Suanto sumanto
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
              ucuss sayur asem
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">Email</span>
            <span className="font-semibold text-sm text-black">
              ucussayurasem@gmail.com
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm text-gray-500">
              Number Phone
            </span>
            <span className="font-semibold text-sm text-black">
              08123456789
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
            <span className="text-[#ee931f] text-sm">Refund Request</span>
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
      {/* Other components */}
    </div>
  );
};

export default BookingDetail;
// <div className="flex flex-col gap-4">
//       <div
//         className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border`}
//       >
//         <div className="p-7 flex flex-col gap-2 pb-4 ">
//           <span className="font-semibold text-lg">Booking #3</span>
//           <span className="font-semibold text-xs">Customer ID : 1</span>
//           <span className="font-semibold text-xs">
//             Customer Name : Suanto sumanto
//           </span>
//         </div>
//         <div className="h-px bg-gray-300"></div>
//         <div className="flex flex-col">
//           <div className="py-7 px-5">
//             <Table
//               dataSource={dataSource}
//               columns={columns}
//               pagination={false}
//             />
//           </div>
//           <div className="h-px bg-gray-300"></div>
//           <div className="flex justify-between p-7">
//             <span className="font-semibold text-sm">Subtotal</span>
//             <span className="font-semibold text-sm">Rp400.000</span>
//           </div>
//         </div>
//       </div>

//       <div
//         className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border w-2/3`}
//       >
//         <div className="py-4 px-7">
//           <span className="font-semibold text-sm">Guest Detail</span>
//         </div>
//         <div className="h-px bg-gray-300"></div>

//         <div className="py-7 px-10 flex flex-col gap-3">
//           <div className="flex justify-between items-center">
//             <span className="font-semibold text-sm text-gray-500">
//               Full Name
//             </span>
//             <span className="font-semibold text-sm text-black">
//               ucuss sayur asem
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="font-semibold text-sm text-gray-500">Email</span>
//             <span className="font-semibold text-sm text-black">
//               ucussayurasem@gmail.com
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="font-semibold text-sm text-gray-500">
//               Number Phone
//             </span>
//             <span className="font-semibold text-sm text-black">
//               08123456789
//             </span>
//           </div>
//         </div>
//       </div>

//       <div
//         className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border w-2/3`}
//       >
//         <div className="py-4 px-7">
//           <span className="font-semibold text-sm">Booking Status</span>
//         </div>
//         <div className="h-px bg-gray-300"></div>

//         <div className="py-4 px-7 flex flex-col gap-2">
//           <span className="font-semibold text-sm">Fullfilment Status</span>
//           <div className="bg-[#f9fac2] w-max px-5 py-2 rounded-xl">
//             <span className="text-[#ee931f] text-sm">Refund Request</span>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end w-2/3">
//         <Link
//           href={"/admin/"}
//           className="w-max bg-RoyalAmethyst-700 px-9 py-2 rounded-xl cursor-pointer"
//         >
//           <span className="text-white font-semibold">Back</span>
//         </Link>
//       </div>
//     </div>
