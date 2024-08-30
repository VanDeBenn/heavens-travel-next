"use client";

import Image from "next/image";
import { useState } from "react";
import { RiNewspaperLine, RiFireLine } from "react-icons/ri"; //
import { cardData, popularNewsData } from "./news";
import {
  Button,
  Input,
  Select,
  Form,
  Table,
  message,
  Alert,
  DatePicker,
  TimePicker,
  Spin,
  Progress
} from "antd";

import { UserOutlined } from "@ant-design/icons";
import { TIMEOUT } from "dns";

export default function coba() {
  // const [isLoading, setIsLoading] = useState(false);

  // const onBtnClick = (e: any) => {
  //   console.log("ajg");
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // };

  // const [ShowAlert, setShowAlert] = useState(false);

  // const onSelesai = (e: any) => {
  //   console.log(e);
  //   setTimeout(() => {
  //     setShowAlert(true);
  //   }, 1000);
  // };

  // const Prot = ["bonono", "Nonono", "kokn"];

  // const data = [
  //   {
  //     nama: "woi",
  //     age: 4,
  //     address: "Jl Pahlawak",
  //     key: "1",
  //   },
  //   {
  //     nama: "woeei",
  //     age: 2,
  //     address: "Jl Pahlawak",
  //     key: "2",
  //   },
  //   {
  //     nama: "wuuuoi",
  //     age: 3,
  //     address: "Jl Pahlawak",
  //     key: "3",
  //   },
  // ];

  // const columns = [
  //   {
  //     title: "Nama",
  //     dataIndex: "nama",
  //     key: "key",
  //     render: (nama: string) => {
  //       return <a>{nama}</a>;
  //     },
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "key",
  //     sorter: (a: { age: number }, b: { age: number }) => a.age - b.age
  //   },
  //   {
  //     title: "Address",
  //     key: "key",
  //     render: (payload: { age: number; }) => {
  //       return <p>{payload.age > 2 ? "true" : "false"}</p>;
  //     },
  //   },
  // ];

  // const columns = [
  //   {
  //     title: "Nama",
  //     dataIndex: "nama",
  //     key: "key",
  //     render: (nama) => {
  //       return <a>{nama}</a>;
  //     },
  //   },
  //   {
  //     title: "Age",
  //     dataIndex: "age",
  //     key: "key",
  //     sorter: (A,b) => a.b - b.age
  //   },
  //   {
  //     title: "Address",
  //     key: "key",
  //     render: payload => {
  //       return <p>{payload.age > 2 ? "true" : "false"}</p>;
  //     },
  //   },
  // ];

  // const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col justify-center p-24">
      {/* <Progress percent={22} type="line"/>
      <Progress percent={22} type="circle" status="active"/> */}

      {/* <Spin spinning={loading}></Spin>
      <Button
        onClick={() => {
          setLoading((prevValue) => !prevValue);
        }}
      >
        Tugel
      </Button>
      <Spin spinning={loading}>
        <p>Lorem</p>
        <p>Lorem 2</p>
        <p>Lorem 3</p>
      </Spin> */}

      {/* mengatur jadwal */}
      {/* <DatePicker />
      <DatePicker.RangePicker />
      <TimePicker /> */}

      {/* <Table dataSource={data} columns={columns}></Table> */}

      {/* {ShowAlert && <Alert type="error" message='Error' description="gagalllll" closable />}
      <Form onFinish={onSelesai}>
        <Form.Item label="User bau" name="username">
          <Input placeholder="Username" allowClear required></Input>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" required></Input.Password>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Masuk
          </Button>
        </Form.Item>
      </Form> */}

      {/* <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
        itaque repudiandae iusto.
      </p> */}

      {/* <Select
        mode="multiple"
        placeholder="Select Bool"
        style={{ width: "605" }}
        maxTagCount={2}
        allowClear
      >
        {Prot.map((Prots, index) => {
          return (
            <Select.Option key={index} value={Prots}>
              {Prots}
            </Select.Option>
          );
        })}
      </Select> */}

      {/* <Input.Search
        placeholder="Nama bool"
        maxLength={7}
        prefix={<UserOutlined />}
        allowClear
        
      ></Input.Search> */}

      {/* <Button
        type="primary"
        block
        onClick={onBtnClick}
        loading={isLoading}
        className="bg-[#01e4b3]"
        icon={<UserOutlined />}
      >
        Silit Button
      </Button> */}
    </div>
  );
}
