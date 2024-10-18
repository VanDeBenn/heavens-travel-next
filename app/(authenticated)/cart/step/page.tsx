import React from "react";
import NextStep from "#/app/components/user/next-step";
import Header from "#/app/components/user/header";

export default function page() {
  return (
    <div className="bg-Lilac-50">
      <Header />
      <div className=" px-16 2xl:px-48 pb-8 pt-24">
        <NextStep />
      </div>
    </div>
  );
}
