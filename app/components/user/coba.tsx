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
  Progress,
  Steps
} from "antd";

import { UserOutlined } from "@ant-design/icons";
import { TIMEOUT } from "dns";

export default function Coba() {
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
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: 'Step 1',
      content: 'First Step Content',
    },
    {
      title: 'Step 2',
      content: 'Second Step Content',
    },
    {
      title: 'Step 3',
      content: 'Third Step Content',
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const finish = () => {
    message.success('All steps completed!');
  };
  return (
<div className="w-full p-8">
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="my-8 p-4 bg-gray-100 rounded shadow">
        {steps[current].content}
      </div>
      <div className="flex justify-between">
        {current > 0 && (
          <Button onClick={() => prev()} className="bg-gray-200">
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => next()}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Next Step
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={finish}
            className="bg-green-500 hover:bg-green-600"
          >
            Done
          </Button>
        )}
      </div>
    </div>

 
  );
}
