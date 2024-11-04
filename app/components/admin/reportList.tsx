"use client";

import React, { useState } from "react";
import { Table, Dropdown, Menu, Button } from "antd";
import {
  MoreOutlined,
  InfoCircleOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { ColumnsType } from "antd/es/table";
import { CgHomeAlt } from "react-icons/cg";
import { RiUserLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import { Montserrat } from "next/font/google";

const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface DataType {
  key: string;
  reportTitle: string;
  description: string;
  date: string;
  imageUrls: string[];
}

const reportListData: DataType[] = [
  {
    key: "1",
    reportTitle: "Monthly Sales Report",
    description: "Detailed monthly sales analysis for April 2020.",
    date: "20/04/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
  },
  {
    key: "2",
    reportTitle: "Customer Feedback Analysis",
    description: "Compilation of customer feedback from Q1.",
    date: "18/03/2020",
    imageUrls: ["/images/illustration/hawaii.jpg"],
  },
  {
    key: "3",
    reportTitle: "Market Research",
    description: "Insights into the current market trends.",
    date: "12/02/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
  },
  {
    key: "4",
    reportTitle: "Monthly Sales Report",
    description: "Detailed monthly sales analysis for April 2020.",
    date: "20/04/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
  },
  {
    key: "5",
    reportTitle: "Customer Feedback Analysis",
    description: "Compilation of customer feedback from Q1.",
    date: "18/03/2020",
    imageUrls: ["/images/illustration/hawaii.jpg"],
  },
  {
    key: "6",
    reportTitle: "Market Research",
    description: "Insights into the current market trends.",
    date: "12/02/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
  },
];

const ReportList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(reportListData);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showTotalEntries = (total: number, range: [number, number]) => {
    return `Showing ${range[0]} to ${range[1]} of ${total} entries`;
  };

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, dataSource.length);

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-7`}>
        <div className="pb-4">
          <h1 className="text-xl font-bold mb-2">Report Listing</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {dataSource
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item) => (
              <Link
                href={`/admin/report/detail`}
                // mungkin yang bener bawah ini
                // href={`/admin/report/${item.key}`}
                key={item.key}
                className="no-underline"
              >
                <div className="border-solid border-gray-200 border rounded-xl cursor-pointer">
                  <div className="flex flex-col gap-2 p-3">
                    <span className="font-semibold text-lg text-black no-underline hover:text-RoyalAmethyst-700 transition-all duration-300">
                      {item.reportTitle}
                    </span>
                    <p className="text-base text-black">{item.description}</p>
                    <div className="flex justify-end gap-3">
                      {item.imageUrls.slice(0, 3).map((imageUrl, index) => (
                        <Image
                          key={index}
                          src={imageUrl}
                          height={200}
                          width={300}
                          alt="report-image"
                          className="rounded-xl w-36 h-24"
                        />
                      ))}
                    </div>
                    <div className="h-px bg-gray-300 "></div>
                    <div className="flex justify-between items-center py-2 text-black">
                      <div className="flex items-center gap-2">
                        <CgHomeAlt className="text-lg" />
                        <span className="text-sm">Booking #1</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <RiUserLine className="text-lg" />
                          <span className="text-sm">cihuy@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaRegClock className="text-lg" />
                          <span className="text-sm">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className="flex items-center justify-between pt-5">
          <div>
            {showTotalEntries(dataSource.length, [startEntry, endEntry])}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              type="primary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * pageSize >= dataSource.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportList;
