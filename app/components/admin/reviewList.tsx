"use client";

import React, { useState } from "react";
import { Table, Dropdown, Menu, Button, Modal } from "antd";
import {
  MoreOutlined,
  InfoCircleOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { ColumnsType } from "antd/es/table";
import { CgHomeAlt } from "react-icons/cg";
import {
  RiUserLine,
  RiCheckboxCircleLine,
  RiStarFill,
  RiStarHalfFill,
} from "react-icons/ri";
import { FaRegClock, FaUserCircle } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import { FiXCircle } from "react-icons/fi";

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
  reviewTitle: string;
  description: string;
  date: string;
  imageUrls: string[];
  email: string;
  reviewerName: string;
  starRating: number; // Tambahkan properti starRating
}

const reviewListData: DataType[] = [
  {
    key: "1",
    reviewTitle: "Monthly Sales Review",
    description: "Detailed monthly sales analysis for April 2020.",
    date: "20/04/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
    email: "cihuy@gmail.com",
    reviewerName: "Aceng Toyo",
    starRating: 4.5,
  },
  {
    key: "2",
    reviewTitle: "Customer Feedback Analysis",
    description: "Compilation of customer feedback from Q1.",
    date: "18/03/2020",
    imageUrls: ["/images/illustration/hawaii.jpg"],
    email: "example2@gmail.com",
    reviewerName: "Sumanto Susanto",
    starRating: 3.5,
  },
  {
    key: "3",
    reviewTitle: "Market Research",
    description: "Insights into the current market trends.",
    date: "12/02/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
    email: "example3@gmail.com",
    reviewerName: "Shiuun Taro",
    starRating: 5,
  },
  {
    key: "4",
    reviewTitle: "Monthly Sales Review",
    description: "Detailed monthly sales analysis for April 2020.",
    date: "20/04/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
    email: "cihuy@gmail.com",
    reviewerName: "Aceng Toyo",
    starRating: 4.5,
  },
  {
    key: "5",
    reviewTitle: "Customer Feedback Analysis",
    description: "Compilation of customer feedback from Q1.",
    date: "18/03/2020",
    imageUrls: ["/images/illustration/hawaii.jpg"],
    email: "example2@gmail.com",
    reviewerName: "Sumanto Susanto",
    starRating: 3.5,
  },
  {
    key: "6",
    reviewTitle: "Market Research",
    description: "Insights into the current market trends.",
    date: "12/02/2020",
    imageUrls: [
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
      "/images/illustration/hawaii.jpg",
    ],
    email: "example3@gmail.com",
    reviewerName: "Shiuun Taro",
    starRating: 5,
  },
];

const ReviewList: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(reviewListData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<DataType | null>(null);

  const pageSize = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showTotalEntries = (total: number, range: [number, number]) => {
    return `Showing ${range[0]} to ${range[1]} of ${total} entries`;
  };

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, dataSource.length);

  const handleApprove = (review: DataType) => {
    setSelectedReview(review);
    setIsApproveModalVisible(true);
  };

  const handleReject = (review: DataType) => {
    setSelectedReview(review);
    setIsRejectModalVisible(true);
  };

  const confirmApprove = () => {
    // Implementasi logika persetujuan
    setIsApproveModalVisible(false);
    setSelectedReview(null);
  };

  const confirmReject = () => {
    // Menghapus review yang dipilih dari dataSource
    if (selectedReview) {
      setDataSource(
        dataSource.filter((review) => review.key !== selectedReview.key)
      );
      setIsRejectModalVisible(false);
      setSelectedReview(null);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <RiStarFill key={`full-${i}`} className="text-base text-yellow-500" />
      );
    }
    if (halfStar) {
      stars.push(
        <RiStarHalfFill key="half" className="text-base text-yellow-500" />
      );
    }
    return stars;
  };

  return (
    <div
      className="
    flex flex-col gap-5
    "
    >
      <div className="bg-white rounded-xl border-solid border-gray-200 border">
        <div className={`${mediumMontserrat.className} p-7`}>
          <h1 className="text-xl font-bold mb-4">Review Listing</h1>

          <div className="grid grid-cols-2 gap-4">
            {dataSource
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((item) => (
                <div key={item.key} className="no-underline">
                  <div className="border-solid border-gray-200 border rounded-xl">
                    <div className="flex flex-col gap-2 p-3">
                      <Link
                        href={`/admin/review/detail`}
                        className="font-semibold text-lg text-black no-underline hover:text-RoyalAmethyst-700 transition-all duration-300"
                      >
                        {item.reviewTitle}
                      </Link>
                      <p className="text-base text-black">{item.description}</p>
                      <div className="flex justify-end gap-3">
                        {item.imageUrls.slice(0, 3).map((imageUrl, index) => (
                          <Image
                            key={index}
                            src={imageUrl}
                            height={200}
                            width={300}
                            alt="review-image"
                            className="rounded-xl w-36 h-24"
                          />
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-black">
                        <div className="flex items-center gap-2 text-black">
                          <CgHomeAlt className="text-lg" />
                          <span className="text-sm">Booking #{item.key}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="cursor-pointer"
                            onClick={() => handleApprove(item)}
                          >
                            <RiCheckboxCircleLine className="text-2xl text-Emerald-400" />
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => handleReject(item)}
                          >
                            <FiXCircle className="text-2xl text-InfernoEcho-600" />
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-gray-300"></div>

                      <div className="flex justify-between items-center py-2 text-black">
                        <div className="flex items-center gap-2">
                          <FaUserCircle className="text-4xl" />
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-black font-semibold">
                              {item.reviewerName}
                            </span>
                            <div className="flex items-center gap-1">
                              {renderStars(item.starRating)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <RiUserLine className="text-lg" />
                            <span className="text-sm">{item.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaRegClock className="text-lg" />
                            <span className="text-sm">{item.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* Modal Approve */}
          <Modal
            title="Are you sure you want to accept this rating?"
            visible={isApproveModalVisible}
            onCancel={() => setIsApproveModalVisible(false)}
            onOk={confirmApprove}
            okText="Continue"
            cancelText="Cancel"
          >
            <p>Please confirm to accept the rating.</p>
          </Modal>

          {/* Modal Reject */}
          <Modal
            title="Are you sure you want to remove this rating?"
            visible={isRejectModalVisible}
            onCancel={() => setIsRejectModalVisible(false)}
            onOk={confirmReject}
            okText="Continue"
            cancelText="Cancel"
          >
            <p>Please confirm to remove the rating.</p>
          </Modal>
        </div>
      </div>

      {/* table */}
      {/* <div className="bg-white rounded-xl border-solid border-gray-200 border">
        <div className={`${mediumMontserrat.className} p-7`}></div>
      </div> */}
      {/* end table */}
    </div>
  );
};

export default ReviewList;
