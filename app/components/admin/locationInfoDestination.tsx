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
  setLocationDestination: any;
  submitLocationForm: boolean;
}

type LocationInfo = {
  address: string;
  pathLocation: string;
  district: string;
  cityName: string;
  provinceName?: string;
  countryName?: string;
};

export default function LocationInfoDestination({
  setLocationDestination,
  submitLocationForm,
}: LocationInfoProps) {
  const [form] = useForm();
  const [citiesData, setCitiesData] = useState<[string, string][]>([]);
  const [provincesData, setProvincesData] = useState<[string, string[]][]>([]);
  const [countriesData, setCountriesData] = useState<string[]>([]);
  const [isCityDisabled, setIsCityDisabled] = useState(false);
  const [isProvinceDisabled, setIsProvinceDisabled] = useState(false);
  const [isCountryDisabled, setIsCountryDisabled] = useState(false);

  useEffect(() => {
    if (submitLocationForm) {
      form.submit();
    }
  }, [submitLocationForm, form]);

  const getAllCountries = async () => {
    try {
      const res = await countrieRepository.api.getCountries();
      setCountriesData(res.data.map((item: any) => item.name));
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  };

  const getAllProvinces = async () => {
    try {
      const res = await provinceRepository.api.getProvinces();
      setProvincesData(
        res.data.map((item: any) => [
          item.name,
          item?.cities?.map((city: any) => city.name),
        ])
      );
    } catch (error) {
      console.error("Failed to fetch provinces:", error);
    }
  };

  const getAllCities = async () => {
    try {
      const res = await citieRepository.api.getCities();
      setCitiesData(
        res.data.map((item: any) => [item.name, item?.province?.name])
      );
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  useEffect(() => {
    getAllCountries();
    getAllProvinces();
    getAllCities();
  }, []);

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.cityName) {
      setIsProvinceDisabled(true);
      setIsCountryDisabled(true);

      const selectedCity = citiesData.find(
        (x) => x[0] === changedValues.cityName
      );
      if (selectedCity) {
        const provinceName = selectedCity[1];
        form.setFieldsValue({
          provinceName: provinceName,
          countryName: "Indonesia",
        });
      }
    } else {
      setIsProvinceDisabled(false);
      setIsCountryDisabled(false);
    }

    if (changedValues.provinceName) {
      setIsCountryDisabled(true);

      const selectedProvince = provincesData.find(
        (x) => x[0] === changedValues.provinceName
      );
      if (selectedProvince) {
        const cityList = selectedProvince[1];
        setCitiesData(
          cityList.map((city) => [city, changedValues.provinceName])
        );
      }
    }

    if (
      changedValues.countryName &&
      changedValues.countryName !== "Indonesia"
    ) {
      setIsProvinceDisabled(true);
      setIsCityDisabled(true);
      form.setFieldsValue({ countryName: form.getFieldValue("countryName") });
    } else if (changedValues.countryName === "Indonesia") {
      setIsProvinceDisabled(false);
      setIsCityDisabled(false);
    }
  };

  // reset input
  const resetField = (fieldName: string) => {
    form.setFieldsValue({ [fieldName]: undefined });
    if (fieldName === "cityName") {
      setIsProvinceDisabled(false);
      setIsCountryDisabled(false);
    }
  };

  const onFinish = (values: LocationInfo) => {
    try {
      const dataLocationInfo = {
        address: values.address,
        pathLocation: values.pathLocation,
        district: values.district,
        cityName: values.cityName,
        provinceName: values.provinceName,
        countryName: values.countryName,
      };
      setLocationDestination(dataLocationInfo);
    } catch (error) {
      console.error("Location info submission failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-xl border-solid border-gray-200 border p-9">
      <div className={`${mediumMontserrat.className} pb-6`}>
        <span className="text-lg font-semibold">Location Information</span>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
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
            name="cityName"
            className="w-full"
            rules={[{ required: true, message: "Please select your city!" }]}
          >
            <Select
              placeholder="Select your city"
              disabled={isCityDisabled}
              allowClear
              onClear={() => resetField("cityName")}
            >
              {citiesData.map(([cityName]) => (
                <Option key={cityName} value={cityName}>
                  {cityName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex justify-between gap-5">
          <Form.Item label="Province" name="provinceName" className="w-full">
            <Select
              placeholder="Select your province"
              disabled={isProvinceDisabled}
              allowClear
              onClear={() => resetField("provinceName")}
            >
              {provincesData.map(([provinceName]) => (
                <Option key={provinceName} value={provinceName}>
                  {provinceName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Country" name="countryName" className="w-full">
            <Select
              placeholder="Select your country"
              disabled={isCountryDisabled}
              allowClear
              onClear={() => resetField("countryName")}
            >
              {countriesData.map((countryName) => (
                <Option key={countryName} value={countryName}>
                  {countryName}
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
