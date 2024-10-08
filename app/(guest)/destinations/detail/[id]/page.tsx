"use client";

import { cartRepository } from "#/repository/carts";
import { destinationRepository } from "#/repository/destinations";
import { wishlistRepository } from "#/repository/wishlists";
import React, { useEffect, useState } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import type { Dayjs } from "dayjs";

export default function Page({ params }: { params: { id: string } }) {
  const [dataDestinations, setDataDestinations] = useState<any[]>([]);
  const [count, setCount] = useState({ adult: 1, children: 0 });
  const [destinationId, setDestinationId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchDestinations = async () => {
    try {
      const res = await destinationRepository.api.getDestination(params.id);
      setDataDestinations([res.data]);
      setDestinationId(res.data.id);
    } catch (error) {
      console.error("Failed to fetch destination", error);
    }
  };

  const handleDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDate(dateString);
  };

  const handleRangeDate = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  const { RangePicker } = DatePicker;

  const handleCountChange = (
    type: "adult" | "children",
    operation: "increment" | "decrement"
  ) => {
    setCount((prevCount) => ({
      ...prevCount,
      [type]:
        operation === "increment"
          ? Math.min(prevCount[type] + 1, 20)
          : Math.max(prevCount[type] - 1, type === "adult" ? 1 : 0),
    }));
  };

  const handleWishlist = async () => {
    try {
      const data = {
        userId: localStorage.getItem("_id"),
        destinationId: destinationId,
      };
      await wishlistRepository.api.create(data);
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

  const handleCart = async (values: any) => {
    try {
      const data = {
        userId: localStorage.getItem("_id"),
        destinationId: destinationId,
        quantityAdult: count.adult,
        quantityChildren: count.children,
        startDate: startDate,
        endDate: endDate,
      };
      await cartRepository.api.create(data);
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  console.log(startDate);
  console.log(endDate);

  return (
    <div>
      {dataDestinations.map((item) => (
        <div key={item.id}>
          <div>{item.name}</div>
          <div>{item.address}</div>
          <div>{item.description}</div>
          <div>Max Capacity: {item.maxCapacity}</div>
          <div>Price (Adult): {item.priceAdult}</div>
          <div>Price (Children): {item.priceChildren}</div>

          <div>
            <br />
            <div>
              Adult:
              <button onClick={() => handleCountChange("adult", "decrement")}>
                -
              </button>
              {count.adult}
              <button onClick={() => handleCountChange("adult", "increment")}>
                +
              </button>
            </div>
            <br />
            <div>
              Children:
              <button
                onClick={() => handleCountChange("children", "decrement")}
              >
                -
              </button>
              {count.children}
              <button
                onClick={() => handleCountChange("children", "increment")}
              >
                +
              </button>
            </div>
            <br />
            <button onClick={handleCart}>Add to Cart</button>
            <button onClick={handleWishlist}>Add to Wishlist</button>
            <br />
            <br />
            <Space>
              <div>
                Date: <DatePicker onChange={handleDate} />
              </div>
              <div>
                Date Range: <RangePicker onChange={handleRangeDate} />
              </div>
            </Space>
          </div>
        </div>
      ))}
    </div>
  );
}
