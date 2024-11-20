"use client";
import { Montserrat } from "next/font/google";
import { Select, InputNumber, Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";

const mediumMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const { Option } = Select;

interface BasicInfoProps {
  setBasicInfoRoomHotel: any;
  submitBasicInfoForm: any;
  // next: () => void;
  // data: any;
}

export default function CreateInfoRoom({
  setBasicInfoRoomHotel,
  submitBasicInfoForm,
}: BasicInfoProps) {
  const [form] = useForm();
  const [adult, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [singleBeds, setSingleBeds] = useState(0);
  const [doubleBeds, setDoubleBeds] = useState(0);
  const [queenBeds, setQueenBeds] = useState(0);
  const [kingBeds, setKingBeds] = useState(0);

  const roomTypes = [
    "Superior",
    "Superior Twin",
    "Superior King",
    "Superior Queen",
    "Deluxe",
    "Deluxe Twin",
    "Deluxe King",
    "Deluxe Queen",
  ];

  const handleChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
    min: number = 0
  ) => {
    if (value >= min) {
      setter(value);
    }
  };

  const onFinish = (values: any) => {
    try {
      const basicInfoData = {
        roomType: values.roomType,
        price: values.price,
        adult: adult,
        children: children,
        numberRoom: numberOfRooms,
        singleBed: singleBeds,
        doubleBed: doubleBeds,
        queenBed: queenBeds,
        kingBed: kingBeds,
      };
      setBasicInfoRoomHotel(basicInfoData);
    } catch (error) {}
  };

  useEffect(() => {
    if (submitBasicInfoForm) {
      form.submit();
    }
  }, [submitBasicInfoForm]);

  return (
    <div
      className={`${mediumMontserrat.className} bg-white rounded-xl border-solid border-gray-200 border p-9 flex flex-col`}
    >
      <div
        className={`${mediumMontserrat.className} pb-4 flex justify-between items-center`}
      >
        <span className="font-semibold text-lg">Create Room</span>
      </div>

      <span className="font-semibold text-sm">Share your room details</span>
      <span className="pt-2 text-gray-400 text-sm">
        Enjoy a comfortable stay in our well-appointed rooms with a variety of
        options to choose from
      </span>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex justify-between gap-3 items-center pt-5">
          {/* Room Type Dropdown */}
          <div className="flex-1">
            <Form.Item
              name="roomType"
              label="Room Type"
              rules={[{ required: true, message: "Please select a room type" }]}
            >
              <Select
                showSearch
                placeholder="Select room type"
                className="w-full"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {roomTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          {/* Price Input */}
          <div className="flex-1">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please enter a price" }]}
            >
              <InputNumber
                className="w-full"
                formatter={(value) =>
                  `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value?.replace(/\Rp\s?|(\,*)/g, "") as any}
                min={0}
                placeholder="Enter price"
              />
            </Form.Item>
          </div>

          {/* Adults */}
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Adults</label>
            <div className="flex items-center justify-between border-solid border-gray-200 border">
              <Button
                onClick={() => handleChange(setAdults, adult - 1)}
                disabled={adult <= 0}
              >
                -
              </Button>
              <span className="mx-3">{adult}</span>
              <Button onClick={() => handleChange(setAdults, adult + 1)}>
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Children and Number of Rooms */}
        <div className="pt-5 flex items-center gap-3">
          <div className="w-[399px]">
            <label className="block text-sm font-semibold mb-1">
              Children Allowed
            </label>
            <div className="flex items-center justify-between border-solid border-gray-200 border">
              <Button
                onClick={() => handleChange(setChildren, children - 1)}
                disabled={children <= 0}
              >
                -
              </Button>
              <span className="mx-3">{children}</span>
              <Button onClick={() => handleChange(setChildren, children + 1)}>
                +
              </Button>
            </div>
          </div>

          <div className="w-[399px]">
            <label className="block text-sm font-semibold mb-1">
              Number of Rooms
            </label>
            <div className="flex items-center justify-between border-solid border-gray-200 border">
              <Button
                onClick={() =>
                  handleChange(setNumberOfRooms, numberOfRooms - 1, 1)
                }
                disabled={numberOfRooms <= 1}
              >
                -
              </Button>
              <span className="mx-3">{numberOfRooms}</span>
              <Button
                onClick={() =>
                  handleChange(setNumberOfRooms, numberOfRooms + 1)
                }
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Bed Types */}
        <div className="mt-9">
          <span className="font-semibold text-sm">Type of Bed</span>
          <span className="pt-2 text-gray-400 text-sm">
            Sleep well in our comfortable rooms with modern amenities.
          </span>
          <div className="pt-5 flex flex-wrap gap-3">
            {[
              { label: "Single Bed", setter: setSingleBeds, value: singleBeds },
              { label: "Double Bed", setter: setDoubleBeds, value: doubleBeds },
              { label: "Queen Bed", setter: setQueenBeds, value: queenBeds },
              { label: "King Bed", setter: setKingBeds, value: kingBeds },
            ].map((bed, idx) => (
              <div key={idx} className="flex-1">
                <label className="block text-sm font-semibold mb-1">
                  {bed.label}
                </label>
                <div className="flex items-center justify-between border-solid border-gray-200 border">
                  <Button
                    onClick={() => handleChange(bed.setter, bed.value - 1)}
                    disabled={bed.value <= 0}
                  >
                    -
                  </Button>
                  <span className="mx-3">{bed.value}</span>
                  <Button
                    onClick={() => handleChange(bed.setter, bed.value + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Form.Item className="pt-5">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            style={{ display: "none" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
