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
import Loading from "#/app/loading";

const largeMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
});
const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

interface DataType {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  user: {
    email: string;
  };
  photoreports: { url: string }[];
}

interface ComponentProps {
  data: any;
}

export default function ReportList({ data }: ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showTotalEntries = (total: number, range: [number, number]) => {
    return `Showing ${range[0]} to ${range[1]} of ${total} entries`;
  };

  if (!data) {
    return <Loading />;
  }

  const reports = data;
  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, reports.length);

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border">
      <div className={`${mediumMontserrat.className} p-7`}>
        <div className="pb-4">
          <h1 className="text-xl font-bold mb-2">Report Listing</h1>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {reports
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item: DataType) => (
              <Link
                href={`/admin/report/detail/${item?.id}`}
                key={item.id}
                className="no-underline"
              >
                <div className="border-solid border-gray-200 border rounded-xl cursor-pointer">
                  <div className="flex flex-col gap-2 p-3">
                    <span className="font-semibold text-lg text-black no-underline hover:text-RoyalAmethyst-700 transition-all duration-300">
                      {item.title}
                    </span>
                    <p className="text-base text-black">{item.description}</p>
                    <div className="flex justify-end gap-3">
                      {item.photoreports.length > 0 ? (
                        item.photoreports
                          .slice(0, 3)
                          .map((photo, index) => (
                            <Image
                              key={index}
                              src={photo.url}
                              height={200}
                              width={300}
                              alt="report-image"
                              className="rounded-xl w-36 h-24"
                            />
                          ))
                      ) : (
                        <Image
                          src="/images/illustration/hawaii.jpg"
                          height={200}
                          width={300}
                          alt="default-image"
                          className="rounded-xl w-36 h-24"
                        />
                      )}
                    </div>
                    <div className="h-px bg-gray-300 "></div>
                    <div className="flex justify-between items-center py-2 text-black">
                      <div className="flex items-center gap-2">
                        <CgHomeAlt className="text-lg" />
                        <span className="text-sm">Booking #{item.id}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <RiUserLine className="text-lg" />
                          <span className="text-sm">{item.user.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaRegClock className="text-lg" />
                          <span className="text-sm">
                            {new Date(
                              item.createdAt || Date.now()
                            ).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className="flex items-center justify-between pt-5">
          <div>{showTotalEntries(data.count, [startEntry, endEntry])}</div>
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
              disabled={currentPage * pageSize >= data.count}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
