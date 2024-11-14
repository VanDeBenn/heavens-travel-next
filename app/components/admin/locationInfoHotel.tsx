"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { Montserrat } from "next/font/google";
import { useForm } from "antd/es/form/Form";
import { countrieRepository } from "#/repository/countries";
import { provinceRepository } from "#/repository/provinces";
import { citieRepository } from "#/repository/cities";

const { Option } = Select;

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

interface LocationInfoProps {
  setLocationDestination: (data: LocationInfo) => void;
  submitLocationForm: boolean;
}

type LocationInfo = {
  address: string;
  pathLocation: string;
  district: string;
  city: string;
  province: string;
  country: string;
};

export default function LocationInfoDestination({
  setLocationDestination,
  submitLocationForm,
}: LocationInfoProps) {
  const [form] = useForm();

  useEffect(() => {
    if (submitLocationForm) {
      form.submit();
    }
  }, [submitLocationForm, form]);

  const [countriesData, setCountriesData] = useState<string[]>([]);
  const [provincesData, setProvincesData] = useState<string[]>([]);
  const [citiesData, setCitiesData] = useState<string[]>([]);

  const getAllCountries = async () => {
    try {
      const res = await countrieRepository.api.getCountries();
      setCountriesData(res.data.map((item: { name: string }) => item.name));
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  const getAllProvinces = async () => {
    try {
      const res = await provinceRepository.api.getProvinces();
      setProvincesData(res.data.map((item: { name: string }) => item.name));
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
    }
  };

  const getAllCities = async () => {
    try {
      const res = await citieRepository.api.getCities();
      setCitiesData(res.data.map((item: { name: string }) => item.name));
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  useEffect(() => {
    getAllCountries();
    getAllProvinces();
    getAllCities();
  }, []);

  const onFinish = (values: LocationInfo) => {
    try {
      setLocationDestination(values);
    } catch (error) {
      console.error("Location info submission failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Location Information</span>
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Address"
          name="address"
          className="w-full"
          rules={[{ required: true, message: "Please input address!" }]}
        >
          <Input placeholder="Enter address" />
        </Form.Item>

        <Form.Item
          label="Path Location"
          name="pathLocation"
          className="w-full"
          rules={[{ required: true, message: "Please input path location!" }]}
        >
          <Input.TextArea rows={7} placeholder="Enter path location" />
        </Form.Item>

        <div className="flex justify-between gap-5">
          <Form.Item
            label="District"
            name="district"
            className="w-full"
            rules={[{ required: true, message: "Please input district!" }]}
          >
            <Input placeholder="Enter district" className="w-full" />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            className="w-full"
            rules={[{ required: true, message: "Please select your city!" }]}
          >
            <Select placeholder="Select your city">
              {citiesData.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex justify-between gap-5">
          <Form.Item
            label="Province"
            name="province"
            className="w-full"
            rules={[
              { required: true, message: "Please select your province!" },
            ]}
          >
            <Select placeholder="Select your province">
              {provincesData.map((province) => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            className="w-full"
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select placeholder="Select your country">
              {countriesData.map((country) => (
                <Option key={country} value={country}>
                  {country}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" style={{ display: "none" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
