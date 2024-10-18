import React, { useEffect, useState } from "react";
import { Tabs, Card, Typography, Row, Col, Rate } from "antd";
import { StarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import "antd/dist/reset.css"; // Ant Design reset styles
import "tailwindcss/tailwind.css"; // Tailwind CSS styles

const { TabPane } = Tabs;
const { Paragraph } = Typography;

interface ComponentProps {
  data: any;
  dataCity: any;
}

const PopularHotelsIn = ({ data, dataCity }: ComponentProps) => {
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    if (dataCity.length > 0) {
      setActiveTab(dataCity[0].name);
    }
  }, [dataCity]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const filteredHotels = data.filter(
    (hotel: any) => hotel.district.city.name === activeTab
  );

  return (
    <div className="">
      <div className="flex items-center mb-6">
        <div className="text-RoyalAmethyst-700 text-3xl mr-3">
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
        {dataCity.map((city: any) => (
          <TabPane tab={city.name} key={city.name} />
        ))}
      </Tabs>

      <Row gutter={16}>
        {filteredHotels.map((hotel: any) => (
          <Col span={6} key={hotel.id}>
            <Card
              cover={
                <Link href={`/hotel/detail/${hotel.id}`}>
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
                Start from <span className="text-InfernoEcho-600">{hotel.price}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PopularHotelsIn;
