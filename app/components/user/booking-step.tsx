import React from "react";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";

<Steps
  items={[
    {
      title: "Login",
      status: "finish",
      icon: <UserOutlined />,
    },
    {
      title: "Verification",
      status: "finish",
      icon: <SolutionOutlined />,
    },
    {
      title: "Pay",
      status: "process",
      icon: <LoadingOutlined />,
    },
    {
      title: "Done",
      status: "wait",
      icon: <SmileOutlined />,
    },
  ]}
/>;
const BookingSteps: React.FC = () => {
  return <h1>hhh</h1>;
};

export default BookingSteps;
