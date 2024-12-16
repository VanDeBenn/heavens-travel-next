"use client";

import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Button, DatePicker, message } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/home");
  return <div></div>;
}
