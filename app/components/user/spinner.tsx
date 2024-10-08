"use client";

import { HashLoader } from "react-spinners";

export default function spinner() {
  return (
    <div className=" justify-center flex items-center h-screen">
      <HashLoader color="#4F28D9" />
    </div>
  );
}
