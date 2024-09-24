"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Card, Typography, Row, Col, Rate } from "antd";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import "antd/dist/reset.css"; // Ant Design reset styles
import "tailwindcss/tailwind.css"; // Tailwind CSS styles
import { wishlistRepository } from "#/repository/wishlists";
import { hotelRepository } from "#/repository/hotels";
import { cityRepository } from "#/repository/cities";

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const PopularHotelsIn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [dataHotels, setDataHotels] = useState<any[]>([]);
  const [dataCities, setDataCities] = useState<any[]>([]);

  const fetchCities = async () => {
    try {
      const res = await cityRepository.api.getCitys();
      setDataCities(res.data);
      setActiveTab(res.data[0]?.name || "");
    } catch (error) {}
  };

  const fetchHotels = async () => {
    try {
      const res = await hotelRepository.api.getHotels();
      setDataHotels(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchHotels();
    fetchCities();
  }, []);

  const handleWishlist = async (values: any) => {
    try {
      const data = {
        userId: values.userId,
        hotelId: values.hotelId,
        destinationId: values.destinationId,
      };
      const req = await wishlistRepository.api.create(data);
    } catch (error) {}
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const filteredHotels = dataHotels.filter(
    (hotel) => hotel.district.city.name === activeTab
  );

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

      <Tabs
        defaultActiveKey={activeTab}
        onChange={handleTabChange}
        className="mb-6"
      >
        {dataCities.map((city) => (
          <TabPane tab={city.name} key={city.name} />
        ))}
      </Tabs>

      <Row gutter={16}>
        {filteredHotels.map((hotel) => (
          <Col span={6} key={hotel.id}>
            <Card
              cover={
                <Link href={`/hotel-detail/${hotel.id}`}>
                  <Image
                    alt={hotel.name}
                    src={hotel.pathLocation}
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
                <h1 className="text-xl font-semibold">{hotel.name}</h1>
                <Rate
                  disabled
                  defaultValue={hotel.rating}
                  className="text-yellow-500 text-xl"
                />
              </div>

              {/* Location */}
              <div className="flex items-center text-gray-500 mb-2">
                <EnvironmentOutlined className="mr-1" />{" "}
                {hotel.district.city.name}
              </div>

              {/* Description */}
              <Paragraph ellipsis={{ rows: 2 }} className="text-gray-600">
                {hotel.description}
              </Paragraph>

              {/* Price */}
              <div className="text-right text-base font-medium text-gray-700">
                Start from <span className="text-[#DC143C]">{hotel.price}</span>
              </div>

              <button onClick={() => handleWishlist(hotel)} className="">
                wishlist
              </button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularHotelsIn;
