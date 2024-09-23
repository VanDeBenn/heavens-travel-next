"use client";
import React, { useState } from "react";
import { Tabs, Card, Typography, Row, Col, Rate } from "antd";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import "antd/dist/reset.css"; // Ant Design reset styles
import "tailwindcss/tailwind.css"; // Tailwind CSS styles

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const PopularHotelsIn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Jakarta");

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="">
      <div className="flex items-center mb-6">
        <div className="text-[#4F28D9] text-3xl mr-3">
          <StarOutlined style={{ fontSize: "27px", color: "#4F28D9" }} />
        </div>
        <span className="text-xl font-semibold">
          Popular Hotels In Indonesia
        </span>
      </div>

      <Tabs defaultActiveKey="1" onChange={handleTabChange} className="mb-6">
        <TabPane tab="Jakarta" key="Jakarta" />
        <TabPane tab="Bekasi" key="Bekasi" />
        <TabPane tab="Bali" key="Bali" />
      </Tabs>

      <Row gutter={16}>
        {hotelData[activeTab as keyof typeof hotelData].map((hotel) => (
          <Col span={6} key={hotel.id}>
            <Card
              cover={
                <Link href={`/hotel-detail/${hotel.id}`}>
                  <Image
                    alt={hotel.title}
                    src={hotel.image}
                    layout="responsive"
                    width={500}
                    height={300}
                    className="object-cover"
                  />
                </Link>
              }
              className="shadow-lg rounded-md"
            >
              {/* Title and Rating */}

              <div className="flex items-center justify-between mb-2 gap-2">
                <h1 className="text-xl font-semibold">{hotel.title}</h1>
                <Rate
                  disabled
                  defaultValue={hotel.rating}
                  className="text-yellow-500 text-xl"
                />
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-500 mb-2">
                <EnvironmentOutlined className="mr-1" /> {activeTab}
              </div>

              {/* Description */}
              <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
                {hotel.description}
              </Paragraph>

              {/* Price */}
              <div className="text-right text-base font-medium text-gray-700">
                Start from <span className="text-[#DC143C]">{hotel.price}</span>
              </div>

              <div className="">wishlist</div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularHotelsIn;

const hotelData = {
  Jakarta: [
    {
      id: 1,
      title: "Grand Indonesia Hotel",
      description: "Hotel modern dengan pemandangan kota Jakarta.",
      image: "/images/illustration/hawaii-beach.jpg",
      rating: 5,
      price: "Rp750.000",
    },
    {
      id: 2,
      title: "Jakarta Central Inn",
      description: "Penginapan nyaman dekat pusat kota Jakarta.",
      image: "/images/illustration/hawaii-beach.jpg",
      rating: 4,
      price: "Rp500.000",
    },
  ],
  Bekasi: [
    {
      id: 3,
      title: "Bekasi Luxury Hotel",
      description: "Penginapan mewah di pusat kota Bekasi.",
      image: "/images/illustration/hawaii-beach.jpg",
      rating: 4.5,
      price: "Rp600.000",
    },
  ],
  Bali: [
    {
      id: 4,
      title: "Bali Beach Resort",
      description: "Resort indah di tepi pantai Bali.",
      image: "/images/illustration/hawaii-beach.jpg",
      rating: 5,
      price: "Rp1.200.000",
    },
    {
      id: 5,
      title: "Ubud Serenity Hotel",
      description: "Hotel dengan suasana tenang di Ubud.",
      image: "/images/illustration/hawaii-beach.jpg",
      rating: 4.7,
      price: "Rp850.000",
    },
    {
      id: 6,
      title: "Kuta Sunrise Inn",
      description: "Penginapan murah dan nyaman di Kuta.",
      image: "/images/illustration/hawaii-beach.jpg",
      rating: 4,
      price: "Rp450.000",
    },
  ],
};
