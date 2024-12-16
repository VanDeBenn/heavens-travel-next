import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";
import { usersRepository } from "#/repository/users";
import { countrieRepository } from "#/repository/countries";
import { provinceRepository } from "#/repository/provinces";
import { citieRepository } from "#/repository/cities";
import Loading from "#/app/loading";

const { Option } = Select;
interface ComponentsProps {
  id: string;
  data: any;
  role: string;
}

export default function InformationPersonal({
  id,
  data,
  role,
}: ComponentsProps) {
  const router = useRouter();
  const [form] = useForm();
  const [citiesData, setCitiesData] = useState<[string, string][]>([]);
  const [provincesData, setProvincesData] = useState<[string, string[]][]>([]);
  const [countriesData, setCountriesData] = useState<string[]>([]);
  const [isCityDisabled, setIsCityDisabled] = useState(false);
  const [isProvinceDisabled, setIsProvinceDisabled] = useState(false);
  const [isCountryDisabled, setIsCountryDisabled] = useState(false);

  useEffect(() => {
    if (data) {
      const birthDate = data.birthDate
        ? data.birthDate.split("-")
        : [null, null, null];
      const [year, month, day] = birthDate;

      const { fullName, email, phoneNumber, gender, district, address, city } =
        data || {};
      const { name: cityName, province } = city || {};
      const { name: provinceName, country } = province || {};
      const { name: countryName } = country || {};

      // Atur nilai form dengan nilai default jika data tidak tersedia
      form.setFieldsValue({
        fullName: fullName || null,
        email: email || null,
        phoneNumber: phoneNumber || null,
        gender: gender || null,
        day: day || null,
        month: month || null,
        year: year || null,
        countryName: countryName || null,
        provinceName: provinceName || null,
        cityName: cityName || null,
        district: district || null,
        address: address || null,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    try {
      if (!values.year || !values.month || !values.day) {
        throw new Error("Invalid birthdate");
      }

      const birthDate = `${values.year}-${values.month.padStart(
        2,
        "0"
      )}-${values.day.padStart(2, "0")}`;

      const dataUpdateUser = {
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        birthDate: birthDate,
        address: values.address,
        cityName: values.cityName,
        provinceName: values.provinceName,
        countryName: values.countryName,
      };
      // console.log(dataUpdateUser);
      const response = await usersRepository.api.putUser(id, dataUpdateUser);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // // console.log("Failed:", errorInfo);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);

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
    getAllCountries(), getAllProvinces();
    getAllCities();
  }, []);

  useEffect(() => {}, [countriesData, provincesData, countriesData]);

  const districts = ["Cicendo", "Kebayoran", "Serpong"];

  let roleUser: string = "";
  if (role === "73176062-1eda-44ca-9112-57f775f9affd") {
    roleUser = "customer";
  }
  if (role === "6b613253-8a5e-463d-85de-df3a6ad02811") {
    roleUser = "admin";
  }
  if (role === undefined || null) {
    roleUser = "guest";
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    // city
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

    // province
    if (changedValues.provinceName) {
      setIsCountryDisabled(true);

      const selectedProvince = provincesData.find(
        (x) => x[0] === changedValues.provinceName
      );
      if (selectedProvince) {
        const cityList = selectedProvince[1];
        setCitiesData(
          cityList.map((city: any) => [city, changedValues.provinceName])
        );
      }
    } else {
      setIsCountryDisabled(false);
    }

    // country
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

  const resetField = (fieldName: string) => {
    form.setFieldsValue({ [fieldName]: undefined });
    if (fieldName === "cityName") {
      setIsProvinceDisabled(false);
      setIsCountryDisabled(false);
    }
  };

  if (
    !countriesData ||
    countriesData.length === 0 ||
    !provincesData ||
    provincesData.length === 0 ||
    !citiesData ||
    citiesData.length === 0
  ) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-xl w-full">
      {roleUser === "admin" && (
        <p className="text-xl font-semibold my-6 mx-9">
          Setting Account {roleUser}
        </p>
      )}

      {roleUser === "customer" && (
        <p className="text-xl font-semibold my-6 mx-9">
          Setting Account {roleUser}
        </p>
      )}

      <div className="h-px bg-gray-300"></div>
      <div className="px-9 py-6">
        <p className="text-base font-semibold">Profile</p>
        <span className="text-sm text-gray-500">
          This information is confidential, so be careful what you share
        </span>
        <div className="pt-4">
          <Form
            form={form}
            name="personal_info"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            layout="vertical"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Full Name */}
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  {
                    type: "email",
                    message: "Please enter a valid email address!",
                  },
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Email must be in the format name@example.com",
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              {/* Phone Number */}
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number!",
                  },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              {/* Gender */}
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  { required: true, message: "Please select your gender!" },
                ]}
              >
                <Select placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>

              {/* Birthdate */}
              <Form.Item label="Birthdate" required>
                <div className="grid grid-cols-3 gap-2">
                  <Form.Item
                    name="day"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birth day!",
                      },
                    ]}
                    noStyle
                  >
                    <Select placeholder="Day">
                      {days.map((day) => (
                        <Option key={day} value={day.toString()}>
                          {day}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="month"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birth month!",
                      },
                    ]}
                    noStyle
                  >
                    <Select placeholder="Month">
                      {months.map((month, index) => (
                        <Option
                          key={index + 1}
                          value={(index + 1).toString().padStart(2, "0")}
                        >
                          {month}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="year"
                    rules={[
                      {
                        required: true,
                        message: "Please select your birth year!",
                      },
                    ]}
                    noStyle
                  >
                    <Select placeholder="Year">
                      {years.map((year) => (
                        <Option key={year} value={year.toString()}>
                          {year}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Form.Item>

              {/* Country */}
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

              {/* Province */}
              <Form.Item
                label="Province"
                name="provinceName"
                className="w-full"
              >
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

              {/* City */}
              <Form.Item
                label="City"
                name="cityName"
                className="w-full"
                rules={[
                  { required: true, message: "Please select your city!" },
                ]}
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

              {/* District */}
              {/* <Form.Item
                label="District"
                name="district"
                rules={[
                  { required: true, message: "Please select your district!" },
                ]}
              >
                <Select placeholder="Select your district">
                  {districts.map((district) => (
                    <Option key={district} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}

              {/* Street Address */}
              <Form.Item
                label="Street Address"
                name="address"
                className="col-span-1 md:col-span-3"
                rules={[
                  {
                    required: true,
                    message: "Please enter your street address!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="e.g., Jl. Kebon Jeruk No. 123, RT 02 RW 03, Kelurahan Kebon Melati, Kecamatan Tanah Abang, Jakarta Pusat, DKI Jakarta 10230"
                  rows={3}
                />
              </Form.Item>
            </div>

            {/* Save Changes Button */}
            <Form.Item className="flex justify-end">
              <Button type="primary" htmlType="submit" className="w-max mt-6">
                Change Profile
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
